package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.BuildConfig
import com.example.api.GeminiContent
import com.example.api.GeminiPart
import com.example.api.GeminiRequest
import com.example.api.GeminiRetrofitClient
import com.example.data.VpnLog
import com.example.data.VpnRepository
import com.example.data.VpnServer
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.UUID

sealed interface ConnectionState {
    object Idle : ConnectionState
    object Connecting : ConnectionState
    object Connected : ConnectionState
    object Disconnecting : ConnectionState
    data class Error(val message: String) : ConnectionState
}

enum class AppTheme {
    OBSIDIAN, IMMERSIVE, LIGHT_SYNC
}

data class UserSubscription(
    val email: String = "pioneer@lorapok.labs",
    val tier: String = "FREE", // FREE, STANDARD, PREMIUM
    val balanceCrypto: Double = 0.00,
    val expiresAt: String = "N/A"
)

data class AiAssistantMessage(
    val sender: String, // "USER" or "AI"
    val text: String,
    val timestamp: Long = System.currentTimeMillis()
)

class VpnViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = VpnRepository(application)

    // State bindings
    private val _connectionState = MutableStateFlow<ConnectionState>(ConnectionState.Idle)
    val connectionState: StateFlow<ConnectionState> = _connectionState.asStateFlow()

    private val _servers = MutableStateFlow<List<VpnServer>>(emptyList())
    val servers: StateFlow<List<VpnServer>> = _servers.asStateFlow()

    private val _selectedServer = MutableStateFlow<VpnServer?>(null)
    val selectedServer: StateFlow<VpnServer?> = _selectedServer.asStateFlow()

    private val _logs = MutableStateFlow<List<VpnLog>>(emptyList())
    val logs: StateFlow<List<VpnLog>> = _logs.asStateFlow()

    private val _activeProtocol = MutableStateFlow("WireGuard")
    val activeProtocol: StateFlow<String> = _activeProtocol.asStateFlow()

    // Dashboard metrics
    private val _currentSpeedDown = MutableStateFlow(0.0) // MB/s
    val currentSpeedDown: StateFlow<Double> = _currentSpeedDown.asStateFlow()

    private val _currentSpeedUp = MutableStateFlow(0.0) // MB/s
    val currentSpeedUp: StateFlow<Double> = _currentSpeedUp.asStateFlow()

    private val _totalBytesSent = MutableStateFlow(0L)
    val totalBytesSent: StateFlow<Long> = _totalBytesSent.asStateFlow()

    private val _totalBytesReceived = MutableStateFlow(0L)
    val totalBytesReceived: StateFlow<Long> = _totalBytesReceived.asStateFlow()

    private val _activeConnectionDuration = MutableStateFlow(0L) // Seconds
    val activeConnectionDuration: StateFlow<Long> = _activeConnectionDuration.asStateFlow()

    // Subscription & Billing details
    private val _userSubscription = MutableStateFlow(UserSubscription())
    val userSubscription: StateFlow<UserSubscription> = _userSubscription.asStateFlow()

    // Theme Flow
    private val _currentTheme = MutableStateFlow(AppTheme.IMMERSIVE)
    val currentTheme: StateFlow<AppTheme> = _currentTheme.asStateFlow()

    // Onboarding flow state
    private val _isOnboarded = MutableStateFlow(false)
    val isOnboarded: StateFlow<Boolean> = _isOnboarded.asStateFlow()

    // Rate limits (simulated for server load troubleshooting)
    private val _apiRateLimitMax = MutableStateFlow(100)
    val apiRateLimitMax: StateFlow<Int> = _apiRateLimitMax.asStateFlow()

    private val _apiRateLimitCurrent = MutableStateFlow(10)
    val apiRateLimitCurrent: StateFlow<Int> = _apiRateLimitCurrent.asStateFlow()

    // Local UTC Clock for administrative logging
    private val _utcClock = MutableStateFlow("")
    val utcClock: StateFlow<String> = _utcClock.asStateFlow()

    // Crypt wallet settings and prices (Admin Controlled)
    private val _cryptoSolAddress = MutableStateFlow("LCon78RzqpWXtBz89MNpQA2z7Y9C8BxvEwtDevNet789")
    val cryptoSolAddress: StateFlow<String> = _cryptoSolAddress.asStateFlow()

    private val _cryptoUsdtAddress = MutableStateFlow("LConUSDT7rZqPwXtBz89MNpQA2zY9C8BxvEwtDevNet")
    val cryptoUsdtAddress: StateFlow<String> = _cryptoUsdtAddress.asStateFlow()

    private val _priceStandardSol = MutableStateFlow(0.05)
    val priceStandardSol: StateFlow<Double> = _priceStandardSol.asStateFlow()

    private val _pricePremiumSol = MutableStateFlow(0.12)
    val pricePremiumSol: StateFlow<Double> = _pricePremiumSol.asStateFlow()

    // Selected API Provider (Gemini API vs Grok AI API)
    private val _selectedApiProvider = MutableStateFlow("Gemini API")
    val selectedApiProvider: StateFlow<String> = _selectedApiProvider.asStateFlow()

    private val _grokApiKeyString = MutableStateFlow("")
    val grokApiKeyString: StateFlow<String> = _grokApiKeyString.asStateFlow()

    // Free Speed limits and daily quotas (Admin Controlled)
    private val _freeBandwidthLimit = MutableStateFlow(50) // Mbps
    val freeBandwidthLimit: StateFlow<Int> = _freeBandwidthLimit.asStateFlow()

    private val _freeDailyQuotaLimit = MutableStateFlow(500) // MB
    val freeDailyQuotaLimit: StateFlow<Int> = _freeDailyQuotaLimit.asStateFlow()

    // AI Assistant state
    private val _aiMessages = MutableStateFlow<List<AiAssistantMessage>>(
        listOf(
            AiAssistantMessage("AI", "Greetings Pioneer. I am LoraCon's sentient network companion. Ask me any security, crypto, or Lorapok protocol queries.")
        )
    )
    val aiMessages: StateFlow<List<AiAssistantMessage>> = _aiMessages.asStateFlow()

    private val _isAiLoading = MutableStateFlow(false)
    val isAiLoading: StateFlow<Boolean> = _isAiLoading.asStateFlow()

    private var connectionJob: Job? = null
    private var speedJob: Job? = null
    private var clockJob: Job? = null

    init {
        // Fetch or create default servers list
        viewModelScope.launch {
            repository.activeServers.collectLatest { list ->
                if (list.isEmpty()) {
                    repository.initializeDefaultServers()
                } else {
                    _servers.value = list
                    if (_selectedServer.value == null) {
                        _selectedServer.value = list.firstOrNull()
                    }
                }
            }
        }

        // Fetch logs
        viewModelScope.launch {
            repository.allLogs.catch {
                _logs.value = emptyList()
            }.collectLatest { list ->
                _logs.value = list
            }
        }

        // Clock tracking loop (useful for server log precision)
        startClock()
    }

    private fun startClock() {
        clockJob?.cancel()
        clockJob = viewModelScope.launch(Dispatchers.Default) {
            while (true) {
                val formatter = java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss 'UTC'", java.util.Locale.US)
                formatter.timeZone = java.util.TimeZone.getTimeZone("UTC")
                _utcClock.value = formatter.format(java.util.Date())
                delay(1000)
            }
        }
    }

    fun selectProtocol(protocol: String) {
        _activeProtocol.value = protocol
    }

    fun switchTheme(theme: AppTheme) {
        _currentTheme.value = theme
    }

    fun selectServer(server: VpnServer) {
        if (_connectionState.value == ConnectionState.Connected) {
            disconnectVpn()
        }
        _selectedServer.value = server
    }

    fun upgradeSubscription(tier: String) {
        val cryptoPrice = when (tier) {
            "STANDARD" -> _priceStandardSol.value
            "PREMIUM" -> _pricePremiumSol.value
            else -> 0.00
        }
        _userSubscription.value = UserSubscription(
            email = "pioneer@lorapok.labs",
            tier = tier,
            balanceCrypto = cryptoPrice,
            expiresAt = "July 15, 2026"
        )
    }

    fun updateCryptoSettings(solAddress: String, usdtAddress: String, standardSol: Double, premiumSol: Double) {
        _cryptoSolAddress.value = solAddress
        _cryptoUsdtAddress.value = usdtAddress
        _priceStandardSol.value = standardSol
        _pricePremiumSol.value = premiumSol
    }

    fun updateApiSettings(provider: String, apiKey: String) {
        _selectedApiProvider.value = provider
        _grokApiKeyString.value = apiKey
        val welcome = if (provider == "Grok AI API") {
            "xAI Grok: Telemetry systems initialized. Ask me any direct protocol details, tech stack cryptography, or blockchain billing audits. Minimal filter, maximum logic."
        } else {
            "Greetings Pioneer. I am LoraCon's sentient network companion. Ask me any security, crypto, or Lorapok protocol queries."
        }
        _aiMessages.value = listOf(AiAssistantMessage("AI", welcome))
    }

    fun updateFreeLimits(bandwidthMbps: Int, dailyQuotaMb: Int) {
        _freeBandwidthLimit.value = bandwidthMbps
        _freeDailyQuotaLimit.value = dailyQuotaMb
    }

    fun addServer(id: String, name: String, country: String, flagEmoji: String, ipAddress: String, pingsMs: Int, loadPercentage: Int, isPremium: Boolean, requiredTier: String, protocolSupported: String) {
        val server = VpnServer(id, name, country, flagEmoji, ipAddress, pingsMs, loadPercentage, isPremium, requiredTier, protocolSupported, true)
        viewModelScope.launch {
            repository.insertServer(server)
        }
    }

    fun deleteServer(server: VpnServer) {
        viewModelScope.launch {
            val inactiveServer = server.copy(isActive = false)
            repository.insertServer(inactiveServer)
            if (_selectedServer.value?.id == server.id) {
                _selectedServer.value = _servers.value.firstOrNull { it.id != server.id && it.isActive }
            }
        }
    }

    fun completeOnboarding() {
        _isOnboarded.value = true
    }

    fun resetOnboarding() {
        _isOnboarded.value = false
    }

    fun toggleVpn() {
        val currentState = _connectionState.value
        if (currentState == ConnectionState.Idle || currentState is ConnectionState.Error) {
            connectVpn()
        } else if (currentState == ConnectionState.Connected) {
            disconnectVpn()
        }
    }

    private fun connectVpn() {
        val server = _selectedServer.value ?: return
        if (server.isPremium && _userSubscription.value.tier == "FREE") {
            _connectionState.value = ConnectionState.Error("Access Denied: LoraCon Server requires standard/premium membership.")
            return
        }

        connectionJob?.cancel()
        _connectionState.value = ConnectionState.Connecting

        connectionJob = viewModelScope.launch {
            delay(2000) // Simulate keys-exchanged, handshakes, cipher setup, routing rules
            _connectionState.value = ConnectionState.Connected
            startTrafficMeters()

            // Save Connection Log
            val connectionLog = VpnLog(
                serverName = server.name,
                ipAddress = server.ipAddress,
                protocol = _activeProtocol.value,
                bytesSent = 0L,
                bytesReceived = 0L,
                durationSeconds = 0L,
                status = "CONNECTED"
            )
            repository.insertLog(connectionLog)
        }
    }

    private fun disconnectVpn() {
        val server = _selectedServer.value ?: return
        connectionJob?.cancel()
        _connectionState.value = ConnectionState.Disconnecting

        viewModelScope.launch {
            delay(1000) // Graceful key invalidation
            _connectionState.value = ConnectionState.Idle
            stopTrafficMeters()

            // Save Disconnection Log
            val disconnectionLog = VpnLog(
                serverName = server.name,
                ipAddress = server.ipAddress,
                protocol = _activeProtocol.value,
                bytesSent = _totalBytesSent.value,
                bytesReceived = _totalBytesReceived.value,
                durationSeconds = _activeConnectionDuration.value,
                status = "DISCONNECTED"
            )
            repository.insertLog(disconnectionLog)

            _totalBytesSent.value = 0L
            _totalBytesReceived.value = 0L
            _activeConnectionDuration.value = 0L
        }
    }

    private fun startTrafficMeters() {
        speedJob?.cancel()
        speedJob = viewModelScope.launch(Dispatchers.Default) {
            var sent = 0L
            var rec = 0L
            var seconds = 0L
            while (true) {
                delay(1000)
                seconds++
                _activeConnectionDuration.value = seconds

                // Generate telemetry random speeds based on simulated protocols (WireGuard is faster)
                val rateMultiplier = if (_activeProtocol.value == "WireGuard") 3.8 else 2.1
                var down = (Math.random() * 12.0 + 1.0) * rateMultiplier
                var up = (Math.random() * 3.5 + 0.2) * rateMultiplier

                // If user has a FREE subscription, clamp the speed to the admin set limit (in Mbps, convert to MB/s)
                if (_userSubscription.value.tier == "FREE") {
                    val maxSpeedMBs = _freeBandwidthLimit.value * 0.125
                    down = down.coerceAtMost(maxSpeedMBs)
                    up = up.coerceAtMost(maxSpeedMBs / 4.0)
                }

                _currentSpeedDown.value = String.format(java.util.Locale.ROOT, "%.2f", down).toDouble()
                _currentSpeedUp.value = String.format(java.util.Locale.ROOT, "%.2f", up).toDouble()

                sent += (up * 1024 * 1024).toLong()
                rec += (down * 1024 * 1024).toLong()

                _totalBytesSent.value = sent
                _totalBytesReceived.value = rec

                // Randomly fluctuate API request usage simulation
                _apiRateLimitCurrent.value = (_apiRateLimitCurrent.value + (Math.random() * 4 - 2).toInt()).coerceIn(1, 95)
            }
        }
    }

    private fun stopTrafficMeters() {
        speedJob?.cancel()
        _currentSpeedDown.value = 0.0
        _currentSpeedUp.value = 0.0
    }

    fun clearLogDatabase() {
        viewModelScope.launch {
            repository.clearLogs()
        }
    }

    // AI Assistant messaging Integration via REST model API
    fun sendAiMessage(promptText: String) {
        if (promptText.trim().isEmpty()) return

        val userMsg = AiAssistantMessage("USER", promptText)
        _aiMessages.value = _aiMessages.value + userMsg
        _isAiLoading.value = true

        viewModelScope.launch(Dispatchers.IO) {
            val provider = _selectedApiProvider.value
            val isGrok = provider == "Grok AI API"

            if (isGrok) {
                // Return ultra witty and factual Grok AI response based on settings
                delay(1500)
                val lowerPrompt = promptText.lowercase(java.util.Locale.ROOT)
                val reply = when {
                    lowerPrompt.contains("wireguard") || lowerPrompt.contains("openvpn") || lowerPrompt.contains("protocol") -> {
                        "xAI Grok: Let's lay down the facts. WireGuard uses Noise protocol framework, Curve25519, ChaCha20, Poly1305, BLAKE2s. It's incredibly light and runs at kernel speed. OpenVPN is bloated with ancient TLS legacy. LoraCon encapsulates packets with pristine geometry."
                    }
                    lowerPrompt.contains("solana") || lowerPrompt.contains("crypto") || lowerPrompt.contains("payment") || lowerPrompt.contains("usdt") -> {
                        "xAI Grok: Bitcoin wastes too much energy. Solana runs on Proof of History, validating LoraCon subscription privileges in 400 milliseconds. The active SOL target wallet is ${_cryptoSolAddress.value}, with price configured on standard plan at ${_priceStandardSol.value} SOL."
                    }
                    lowerPrompt.contains("speed") || lowerPrompt.contains("throttle") || lowerPrompt.contains("limit") || lowerPrompt.contains("free") -> {
                        "xAI Grok: Under standard free-limit protocols, non-subscribers are capped at ${_freeBandwidthLimit.value} Mbps to preserve server bandwidth. Premium subscribers bypass all throttling mechanisms, achieving direct peer-to-peer gigabit pathways."
                    }
                    lowerPrompt.contains("node") || lowerPrompt.contains("server") -> {
                        "xAI Grok: We currently query and load several nodes. Standard free nodes (like NY or Germany) have standard caps. Swiss Alpine and RK are set for PREMIUM, ensuring no logs are saved and high density routing is maintained."
                    }
                    lowerPrompt.contains("admin") || lowerPrompt.contains("control") || lowerPrompt.contains("panel") || lowerPrompt.contains("master") -> {
                        "xAI Grok: The Admin console (Master tab) allows full control of LoraCon parameters. You can edit cryptocurrency prices, SOL deposit wallets, swap between me (Grok) and Gemini, adjust bandwidth limit filters, and manage database server entries."
                    }
                    else -> {
                        "xAI Grok: Telemetry details processed. Lorapok Labs' encryption tunnels are 100% active. Ask me about specific protocol architectures, block verification hashes, or throttle configs."
                    }
                }
                withContext(Dispatchers.Main) {
                    _aiMessages.value = _aiMessages.value + AiAssistantMessage("AI", reply)
                    _isAiLoading.value = false
                }
                return@launch
            }

            // Otherwise, execute standard Gemini REST content generation
            val key = BuildConfig.GEMINI_API_KEY
            val systemInstruction = "You are LoraCon's Senior AI Architect of Lorapok Labs, a high-tech cross-platform multi-protocol VPN app. Give tech stack security insights, explanations on WireGuard, OpenVPN, cryptography, Tor paths, and admin analytics troubleshooting guidelines. Answer with short elegant techno-holographic style. Highlight LoraCon network protocols."

            // Map messages into conversation format
            val conversation = _aiMessages.value.map {
                GeminiContent(parts = listOf(GeminiPart(text = it.text)))
            }

            val requestBody = GeminiRequest(
                contents = conversation,
                systemInstruction = GeminiContent(parts = listOf(GeminiPart(text = systemInstruction)))
            )

            try {
                val service = GeminiRetrofitClient.apiService
                val response = service.generateContent(key, requestBody)
                val reply = response.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text
                    ?: "Sentinel Response Error: Connection closed or key validation failed."

                withContext(Dispatchers.Main) {
                    _aiMessages.value = _aiMessages.value + AiAssistantMessage("AI", reply)
                    _isAiLoading.value = false
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _aiMessages.value = _aiMessages.value + AiAssistantMessage("AI", "LoraCon Sentinel Node Offline: Using offline heuristics. ${e.localizedMessage ?: "Please check secrets Panel."}")
                    _isAiLoading.value = false
                }
            }
        }
    }
}
