package com.example.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.VpnLog
import com.example.data.VpnServer
import com.example.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

// Screen Navigation Representation
enum class NavigationTab {
    DASHBOARD, SERVERS, ACCOUNT, LOGS, ADMIN, RESEARCH
}

// Class representation for Bottom Menu avoids Triple parameter inference conflicts
data class VpnMenuItem(
    val tab: NavigationTab,
    val icon: ImageVector,
    val label: String
)

@OptIn(ExperimentalAnimationApi::class)
@Composable
fun LoraConApp(viewModel: VpnViewModel) {
    val context = LocalContext.current
    val isOnboarded by viewModel.isOnboarded.collectAsState()
    val connState by viewModel.connectionState.collectAsState()
    val selectedServer by viewModel.selectedServer.collectAsState()
    val activeProtocol by viewModel.activeProtocol.collectAsState()
    val servers by viewModel.servers.collectAsState()
    val logs by viewModel.logs.collectAsState()

    var currentTab by remember { mutableStateOf(NavigationTab.DASHBOARD) }
    var showAiAssistantExpanded by remember { mutableStateOf(false) }

    // Multi-Language state mapping
    var selectedLanguage by remember { mutableStateOf("English") }
    val languages = listOf("English", "Español", "Deutsch", "日本語", "中文")

    fun getLocalizedText(en: String, es: String, de: String, ja: String, zh: String): String {
        return when (selectedLanguage) {
            "Español" -> es
            "Deutsch" -> de
            "日本語" -> ja
            "中文" -> zh
            else -> en
        }
    }

    if (!isOnboarded) {
        OnboardingTutorialScreen(
            selectedLanguage = selectedLanguage,
            languages = languages,
            onLanguageChange = { selectedLanguage = it },
            onGetStarted = { viewModel.completeOnboarding() },
            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
        )
    } else {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            containerColor = ObsidianBlack,
            bottomBar = {
                VpnBottomBar(
                    currentTab = currentTab,
                    onTabSelected = { currentTab = it },
                    localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                )
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .windowInsetsPadding(WindowInsets.statusBars)
                    .drawBehind {
                        // Matrix style Lorapok background coordinate alignments mesh
                        val cols = (size.width / 40.dp.toPx()).toInt()
                        val rows = (size.height / 40.dp.toPx()).toInt()
                        for (i in 0..cols) {
                            drawLine(
                                color = Color(0x06FFFFFF),
                                start = Offset(i * 40.dp.toPx(), 0f),
                                end = Offset(i * 40.dp.toPx(), size.height),
                                strokeWidth = 1f
                            )
                        }
                        for (j in 0..rows) {
                            drawLine(
                                color = Color(0x06FFFFFF),
                                start = Offset(0f, j * 40.dp.toPx()),
                                end = Offset(size.width, j * 40.dp.toPx()),
                                strokeWidth = 1f
                            )
                        }
                    }
            ) {
                // Fluent Tab Switch Content
                AnimatedContent(
                    targetState = currentTab,
                    transitionSpec = {
                        slideInHorizontally { width -> width } + fadeIn() togetherWith
                                slideOutHorizontally { width -> -width } + fadeOut()
                    },
                    label = "tabTransition"
                ) { targetTab ->
                    when (targetTab) {
                        NavigationTab.DASHBOARD -> DashboardScreen(
                            viewModel = viewModel,
                            selectedLanguage = selectedLanguage,
                            languages = languages,
                            onLanguageSelect = { selectedLanguage = it },
                            onOpenServersTab = { currentTab = NavigationTab.SERVERS },
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                        NavigationTab.SERVERS -> ServerListScreen(
                            viewModel = viewModel,
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                        NavigationTab.ACCOUNT -> AccountSubscriptionScreen(
                            viewModel = viewModel,
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                        NavigationTab.LOGS -> ConnectionLogsScreen(
                            viewModel = viewModel,
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                        NavigationTab.ADMIN -> AdminDashboardScreen(
                            viewModel = viewModel,
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                        NavigationTab.RESEARCH -> ResearchHubScreen(
                            localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) }
                        )
                    }
                }

                // AI Sentient Assistant bottom right floating circle overlay
                FloatingSentientAiAssistant(
                    viewModel = viewModel,
                    isExpanded = showAiAssistantExpanded,
                    onToggle = { showAiAssistantExpanded = !showAiAssistantExpanded },
                    localizer = { en, es, de, ja, zh -> getLocalizedText(en, es, de, ja, zh) },
                    modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
                )
            }
        }
    }
}

// ======================== SCREEN SUB COMPONENTS ========================

@Composable
fun OnboardingTutorialScreen(
    selectedLanguage: String,
    languages: List<String>,
    onLanguageChange: (String) -> Unit,
    onGetStarted: () -> Unit,
    localizer: (String, String, String, String, String) -> String
) {
    var stepIndex by remember { mutableStateOf(0) }
    val stepCount = 4

    val bgGradient = Brush.verticalGradient(
        colors = listOf(
            ObsidianBlack,
            DarkSteel,
            if (LocalAppTheme.current == AppTheme.LIGHT_SYNC) DarkSteel else Color(0xFF0F1E24)
        )
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(bgGradient)
            .padding(24.dp)
            .windowInsetsPadding(WindowInsets.systemBars)
    ) {
        // Multi-Language bar on onboarding header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Emojis and Basic certified icons are fully compatible across all devices
                Text("🌍", fontSize = 16.sp)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = selectedLanguage,
                    color = TextPrimary,
                    fontSize = 14.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
            }

            Row {
                languages.filter { it != selectedLanguage }.take(3).forEach { lang ->
                    Box(
                        modifier = Modifier
                            .padding(horizontal = 4.dp)
                            .minimumInteractiveComponentSize()
                            .border(1.dp, BorderColorHigh, RoundedCornerShape(4.dp))
                            .clickable { onLanguageChange(lang) }
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Text(lang, color = TextSecondary, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                    }
                }
            }
        }

        val transition = rememberInfiniteTransition(label = "concentricRings")
        val ringScaleAnim by transition.animateFloat(
            initialValue = 0.8f,
            targetValue = 1.3f,
            animationSpec = infiniteRepeatable(
                animation = tween(4000, easing = LinearEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "ringScale"
        )

        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier.size(160.dp),
                contentAlignment = Alignment.Center
            ) {
                LorapokLarvaLogo(
                    isConnecting = false,
                    isConnected = true,
                    modifier = Modifier.fillMaxSize()
                )
            }

            Spacer(modifier = Modifier.height(30.dp))

            // Step texts switcher
            AnimatedContent(
                targetState = stepIndex,
                transitionSpec = {
                    slideInVertically { h -> h } + fadeIn() togetherWith
                            slideOutVertically { h -> -h } + fadeOut()
                },
                label = "stepAnim"
            ) { idx ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = when(idx) {
                            0 -> localizer("LORA-CON INCEPTION", "INTEGRACIÓN LORACON", "LORACON EINLEITUNG", "LoraCon へようこそ", "LoraCon 创始通道")
                            1 -> localizer("DUAL-PROTOCOL SECURE ENGINE", "MOTOR SEGURO DE DOBLE PROTOCOLO", "DUAL-PROTOKOLL SICHERHEITSMOTOR", "デュアルセキュアプロトコル", "双协议安全通道")
                            2 -> localizer("THE FRIENDLY HELPER", "EL AYUDANTE AMIGABLE", "DER FREUNDLICHE HELFER", "頼れる相棒：サイバー幼虫", "友好助手：赛博黑水虻幼虫")
                            else -> localizer("TRANSACTION BILLING & LOCAL METRICS", "SISTEMA DE FACTURACIÓN Y ANALÍTICA", "ABRECHNUNGS- & ANALYSE-TELEMETRIE", "暗号取引請求 & システム分析", "加密账单与本地遥测")
                        },
                        color = CyberEmerald,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = when(idx) {
                            0 -> localizer(
                                "Designed directly from the Lorapok Labs brand philosophy. A secure multi-hop communication client bridging quantum connectivity and cyber-obsidian stealth.",
                                "Diseñado a partir de los principios de Lorapok Labs. Puente de conectividad cuántica y de navegación ultra-protegida.",
                                "Basierend auf der Lorapok Labs Philosophie. Eine Brücke zwischen Quanten-Verbindung und Cyber-Obsidian-Tunnels.",
                                "Lorapok Labsの設計哲学から直接誕生。量子接続接続とサイバーオブシディアンのステルスを統合する通信クライアント。",
                                "源自 Lorapok Labs 科学设计圣经。打造桥接量子安全链接与深邃暗曜石般的超强隐蔽数据隧道。"
                            )
                            1 -> localizer(
                                "Featuring custom native implementations of WireGuard and OpenVPN protocols. Adapt securely with dynamic keys and military-grade encryption cycles.",
                                "Incorporando configuraciones de WireGuard y OpenVPN. Máxima protección adaptable con claves de rotación dinámica militares.",
                                "Enthält native Implementierungen von WireGuard und OpenVPN. Schutz durch dynamische Verschlüsselungsschlüssel.",
                                "WireGuard と OpenVPN プロトコルの高性能な内蔵実装。ダイナミックキーと軍事用暗号化マトリクスで安全に自動調整。",
                                "深度内建 WireGuard 超高速与 OpenVPN 经典安全协议体系。搭载动态密钥流和极高规格密码防护。"
                            )
                            2 -> localizer(
                                "Meet your Cybernetic Black Soldier Fly Larva. This friendly, plump system optimizer silently consumes bottlenecks and protects your data in the background.",
                                "Conoce a la Larva Cibernética. Un optimizador amigable que consume cuellos de botella y protege tus datos en segundo plano.",
                                "Lerne die Cyber-Larve kennen. Dieser freundliche Helfer beseitigt heimlich Netzwerk-Engpässe und optimiert deine Verbindung.",
                                "サイバネティックブラックソルジャーフライの幼虫。ボトルネックを静かに食べ尽くし、システムを最適化する究極のヘルパー。",
                                "你的极客数字生命：赛博黑水虻幼虫。看似呆萌，但在暗中静默吞噬网络拥堵、极速优化加密并死守你的隐私堡垒。"
                            )
                            else -> localizer(
                                "Compare globally competitive connection packages and execute decentralized subscription payments via major Crypto Gateways for absolute identity privacy.",
                                "Accede a tarifas súper convenientes con portales de pago crypto descentralizados y tarjetas internacionales de alta seguridad.",
                                "Kostengünstige VPN-Angebote mit dezentralisierter Krypto-Abrechnung für absolute Privatsphäre und verifizierte Logs.",
                                "業界最高水準の低価格に抑えた利用コスト。分散型仮想通貨支払ゲートウェイの完備で、アイデンティティと安全性を究極保護。",
                                "对比全球高性价比套餐。完美接入去中心化加密支付网关与多币种接口，不留一丝隐私痕迹迹象。"
                            )
                        },
                        color = TextSecondary,
                        fontSize = 13.sp,
                        textAlign = TextAlign.Center,
                        lineHeight = 20.sp,
                        fontFamily = FontFamily.SansSerif
                    )
                }
            }
        }

        // Onboarding navigation controls
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row {
                repeat(stepCount) { i ->
                    Box(
                        modifier = Modifier
                            .padding(4.dp)
                            .size(if (stepIndex == i) 10.dp else 6.dp)
                            .clip(CircleShape)
                            .background(if (stepIndex == i) CyberEmerald else TextMuted)
                    )
                }
            }

            Button(
                onClick = {
                    if (stepIndex < stepCount - 1) {
                        stepIndex++
                    } else {
                        onGetStarted()
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = CyberEmerald),
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.testTag("onboarding_next_button")
            ) {
                Text(
                    text = if (stepIndex == stepCount - 1) {
                        localizer("LAUNCH SYSTEM", "INICIAR SISTEMA", "SYSTEM STARTEN", "起動する", "启动 LoraCon")
                    } else {
                        localizer("NEXT", "SIGUIENTE", "WEITER", "次へ", "下一步")
                    },
                    color = Color(0xFF090D14),
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }
        }
    }
}

// 1. MAIN SYSTEM PANEL CARD - CONNECTOR SWITCH
@Composable
fun DashboardScreen(
    viewModel: VpnViewModel,
    selectedLanguage: String,
    languages: List<String>,
    onLanguageSelect: (String) -> Unit,
    onOpenServersTab: () -> Unit,
    localizer: (String, String, String, String, String) -> String
) {
    val connState by viewModel.connectionState.collectAsState()
    val server by viewModel.selectedServer.collectAsState()
    val activeProtocol by viewModel.activeProtocol.collectAsState()
    val currentSpeedDown by viewModel.currentSpeedDown.collectAsState()
    val currentSpeedUp by viewModel.currentSpeedUp.collectAsState()
    val totalBytesSent by viewModel.totalBytesSent.collectAsState()
    val totalBytesReceived by viewModel.totalBytesReceived.collectAsState()
    val durationSeconds by viewModel.activeConnectionDuration.collectAsState()
    val sub by viewModel.userSubscription.collectAsState()
    val freeBandwidthLimit by viewModel.freeBandwidthLimit.collectAsState()

    var isLanguageMenuExpanded by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "L O R A C O N",
                        color = CyberEmerald,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.ExtraBold,
                        fontFamily = FontFamily.Monospace
                    )
                    Text(
                        text = "LORAPOK CONNECTIVITY NODE - v1.0",
                        color = TextMuted,
                        fontSize = 10.sp,
                        fontFamily = FontFamily.Monospace
                    )
                }

                Row {
                    // Theme Selector
                    var isThemeMenuExpanded by remember { mutableStateOf(false) }
                    val currentTheme by viewModel.currentTheme.collectAsState()

                    Box {
                        IconButton(
                            onClick = { isThemeMenuExpanded = true },
                            modifier = Modifier
                                .background(DarkSteel, RoundedCornerShape(8.dp))
                                .border(1.dp, BorderColorMedium, RoundedCornerShape(8.dp))
                        ) {
                            Text("🎨", fontSize = 16.sp)
                        }

                        DropdownMenu(
                            expanded = isThemeMenuExpanded,
                            onDismissRequest = { isThemeMenuExpanded = false },
                            modifier = Modifier.background(DarkSteel).border(1.dp, CyberEmerald)
                        ) {
                            AppTheme.values().forEach { theme ->
                                DropdownMenuItem(
                                    text = { Text(theme.name, color = TextPrimary, fontFamily = FontFamily.Monospace) },
                                    onClick = {
                                        viewModel.switchTheme(theme)
                                        isThemeMenuExpanded = false
                                    }
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    // Language Selector
                    Box {
                        IconButton(
                            onClick = { isLanguageMenuExpanded = true },
                            modifier = Modifier
                                .background(DarkSteel, RoundedCornerShape(8.dp))
                                .border(1.dp, BorderColorMedium, RoundedCornerShape(8.dp))
                        ) {
                            Text("🌍", fontSize = 16.sp)
                        }

                        DropdownMenu(
                            expanded = isLanguageMenuExpanded,
                            onDismissRequest = { isLanguageMenuExpanded = false },
                            modifier = Modifier.background(DarkSteel).border(1.dp, CyberEmerald)
                        ) {
                            languages.forEach { lang ->
                                DropdownMenuItem(
                                    text = { Text(lang, color = TextPrimary, fontFamily = FontFamily.Monospace) },
                                    onClick = {
                                        onLanguageSelect(lang)
                                        isLanguageMenuExpanded = false
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }

        // Connection Trigger Concentric Circles
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                Spacer(modifier = Modifier.height(260.dp))

                LorapokLarvaLogo(
                    isConnecting = connState == ConnectionState.Connecting || connState == ConnectionState.Disconnecting,
                    isConnected = connState == ConnectionState.Connected,
                    modifier = Modifier.size(240.dp)
                )

                // Interactive Switch Node (Placed at bottom of Larva)
                Box(modifier = Modifier.align(Alignment.BottomCenter).offset(y = 40.dp)) {
                    Card(
                        modifier = Modifier
                            .size(140.dp)
                            .clickable(
                                interactionSource = remember { MutableInteractionSource() },
                                indication = null
                            ) {
                                viewModel.toggleVpn()
                            }
                            .testTag("vpn_toggle_button"),
                        shape = CircleShape,
                        colors = CardDefaults.cardColors(
                            containerColor = when(connState) {
                                ConnectionState.Connected -> DarkSteel
                                ConnectionState.Connecting -> if (LocalAppTheme.current == AppTheme.LIGHT_SYNC) Color(0xFFFFEDD5) else Color(0xFF151111)
                                else -> DarkSteel
                            }
                        ),
                        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
                    ) {
                        Column(
                            modifier = Modifier.fillMaxSize(),
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(
                                text = when(connState) {
                                    ConnectionState.Connected -> "⚡"
                                    ConnectionState.Connecting -> "🌀"
                                    else -> "🔒"
                                },
                                fontSize = 44.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = when(connState) {
                                    ConnectionState.Connected -> localizer("CONNECTED", "CONECTADO", "VERBUNDEN", "接続完了", "已安全连接")
                                    ConnectionState.Connecting -> localizer("HANDSHAKE", "NEGOCIANDO", "VERBINDUNG", "接続中...", "握手协商中")
                                    ConnectionState.Disconnecting -> localizer("CLEANING", "DESCONECTANDO", "TRENNUNG", "切断中", "安全注销中")
                                    else -> localizer("TAP TO TUNNEL", "INICIAR CONEXIÓN", "VERBINDEN", "接続開始", "点击启动盾口")
                                },
                                color = when(connState) {
                                    ConnectionState.Connected -> CyberEmerald
                                    ConnectionState.Connecting -> SignalOrange
                                    else -> TextSecondary
                                },
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                }
            }
        }

        // Active state card banner
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkSteel),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(8.dp)
                                    .clip(CircleShape)
                                    .background(if (connState == ConnectionState.Connected) CyberEmerald else WarningRed)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (connState == ConnectionState.Connected) localizer("TUNNEL ENCRYPTION ACTIVE", "TÚNEL DE DATOS ACTIVO", "VERSCHLÜSSELUNG AKTIV", "セキュアリンク稼働中", "最高等级信道加密") else localizer("TOWARDS PLAIN CONNECTIVITY", "RED SIN PROTECCIÓN", "UNVERSCHLÜSSELT", "未接続 - 危険度：高", "传输暴露风险"),
                                color = if (connState == ConnectionState.Connected) CyberEmerald else WarningRed,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace
                            )
                        }

                        Row(
                            modifier = Modifier
                                .background(if (LocalAppTheme.current == AppTheme.LIGHT_SYNC) Color(0x10000000) else ObsidianBlack, RoundedCornerShape(6.dp))
                                .padding(2.dp)
                        ) {
                            listOf("WireGuard", "OpenVPN").forEach { proto ->
                                TextButton(
                                    onClick = { viewModel.selectProtocol(proto) },
                                    modifier = Modifier
                                        .minimumInteractiveComponentSize()
                                        .height(32.dp),
                                    shape = RoundedCornerShape(4.dp),
                                    colors = ButtonDefaults.textButtonColors(
                                        containerColor = if (activeProtocol == proto) CyberEmerald else Color.Transparent,
                                        contentColor = if (activeProtocol == proto) Color(0xFF090D14) else TextSecondary
                                    ),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                                ) {
                                    Text(
                                        text = proto,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        fontFamily = FontFamily.Monospace
                                    )
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                    HorizontalDivider(color = BorderColor)
                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier
                            .minimumInteractiveComponentSize()
                            .fillMaxWidth()
                            .clickable { onOpenServersTab() },
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            modifier = Modifier.weight(1f),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = server?.flagEmoji ?: "🌍",
                                fontSize = 28.sp
                            )
                            Spacer(modifier = Modifier.width(14.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = server?.name ?: "No server selected",
                                    color = TextPrimary,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.SansSerif,
                                    maxLines = 1,
                                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                                )
                                Text(
                                    text = server?.country ?: "Select Endpoint",
                                    color = TextSecondary,
                                    fontSize = 11.sp,
                                    fontFamily = FontFamily.SansSerif,
                                    maxLines = 1,
                                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                                )
                            }
                        }

                        Spacer(modifier = Modifier.width(8.dp))

                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.widthIn(min = 70.dp)
                        ) {
                            Text("⚡", fontSize = 14.sp)
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "${server?.pingsMs ?: 0} ms",
                                color = CyberEmerald,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium,
                                fontFamily = FontFamily.Monospace,
                                maxLines = 1
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("▶", color = TextMuted, fontSize = 11.sp)
                        }
                    }

                    if (sub.tier == "FREE" && connState == ConnectionState.Connected) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(WarningRed.copy(alpha = 0.15f), RoundedCornerShape(8.dp))
                                .border(1.dp, WarningRed.copy(alpha = 0.5f), RoundedCornerShape(8.dp))
                                .padding(horizontal = 12.dp, vertical = 10.dp)
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("⚠️", fontSize = 12.sp)
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text(
                                        text = "FREE SPEED CAP ACTIVE: max $freeBandwidthLimit Mbps",
                                        color = WarningRed,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        fontFamily = FontFamily.Monospace
                                    )
                                }
                                Text(
                                    text = "UPGRADE ⚡",
                                    color = CyberEmerald,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontFamily = FontFamily.Monospace,
                                    modifier = Modifier.padding(horizontal = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        // Live Telemetry display metrics (Immersive UI Widget Grid)
        item {
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Top Row of Widgets
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Download Widget
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        shape = RoundedCornerShape(24.dp), // Immersive heavily rounded
                        modifier = Modifier
                            .weight(1f)
                            .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                "DOWNLOAD SPEED",
                                color = TextSecondary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                letterSpacing = 1.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(
                                    text = "$currentSpeedDown",
                                    color = TextPrimary,
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    "MB/s",
                                    color = TextMuted,
                                    fontSize = 12.sp,
                                    modifier = Modifier.padding(bottom = 4.dp)
                                )
                            }
                        }
                    }

                    // Protocol Widget
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        shape = RoundedCornerShape(24.dp),
                        modifier = Modifier
                            .weight(1f)
                            .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                "CURRENT PROTOCOL",
                                color = TextSecondary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                letterSpacing = 1.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(
                                    text = if (activeProtocol == "WireGuard") "WG" else "OVPN",
                                    color = TextPrimary,
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    "Ultra",
                                    color = CyberEmerald,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(bottom = 4.dp)
                                )
                            }
                        }
                    }
                }

                // Bottom Row of Widgets
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Latency Widget
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        shape = RoundedCornerShape(24.dp),
                        modifier = Modifier
                            .weight(1f)
                            .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                "LATENCY",
                                color = TextSecondary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                letterSpacing = 1.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(
                                    text = "${server?.pingsMs ?: "--"}",
                                    color = TextPrimary,
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    "ms",
                                    color = TextMuted,
                                    fontSize = 12.sp,
                                    modifier = Modifier.padding(bottom = 4.dp)
                                )
                            }
                        }
                    }

                    // Encryption Widget
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        shape = RoundedCornerShape(24.dp),
                        modifier = Modifier
                            .weight(1f)
                            .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                "ENCRYPTION",
                                color = TextSecondary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                letterSpacing = 1.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(
                                    text = "AES",
                                    color = TextPrimary,
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    "256",
                                    color = TextMuted,
                                    fontSize = 12.sp,
                                    modifier = Modifier.padding(bottom = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

// 2. SERVER NODE EXPLORER SCREEN
@Composable
fun ServerListScreen(
    viewModel: VpnViewModel,
    localizer: (String, String, String, String, String) -> String
) {
    val servers by viewModel.servers.collectAsState()
    val selectedServer by viewModel.selectedServer.collectAsState()

    var activeListIndex by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = localizer("SECURE NODES DIRECTORY", "SERVIDORES DISPONIBLES", "KNOTEN-VERZEICHNIS", "世界安全ノード", "全球保密安全节点"),
            color = CyberEmerald,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        Text(
            text = localizer("LoraCon employs high-speed multi-routing relays with military configurations.", "LoraCon utiliza repetidores dinámicos redundantes de alta velocidad.", "LoraCon verwendet hochgeschwindigkeits Multi-Hop Server mit Militärschutz.", "最最速かつ安全なWireGuard転送規格を極秘統合した分散型エッジリレー。", "LoraCon 采用高带宽加密中继，支持极快链路切换与防御级安全定位。"),
            color = TextSecondary,
            fontSize = 11.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSteel, RoundedCornerShape(8.dp))
                .padding(4.dp)
        ) {
            val categories = listOf(
                localizer("ALL NODES", "TODAS", "ALLE", "全体", "全部节点"),
                localizer("FREE NODES", "GRATIS", "KOSTENLOS", "無料", "免费常规"),
                localizer("PREMIUM VAULTS", "STEALTH", "PREMIUM", "ステラ保護", "高隐极速")
            )
            categories.forEachIndexed { index, title ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .minimumInteractiveComponentSize()
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (activeListIndex == index) CyberEmerald else Color.Transparent)
                        .clickable { activeListIndex = index }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = title,
                        color = if (activeListIndex == index) Color(0xFF090D14) else TextSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        val sortedList = when (activeListIndex) {
            1 -> servers.filter { !it.isPremium }
            2 -> servers.filter { it.isPremium }
            else -> servers
        }

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.weight(1f)
        ) {
            if (sortedList.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(40.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = localizer("NO SECURE NODES RESOLVED", "SIN SERVIDORES ACTIVOS", "KEINE KNOTEN GEFUNDEN", "該当ノードなし", "没有匹配的安全节点"),
                            color = TextMuted,
                            fontFamily = FontFamily.Monospace,
                            fontSize = 12.sp
                        )
                    }
                }
            } else {
                items(sortedList) { node ->
                    val isSelected = selectedServer?.id == node.id
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .minimumInteractiveComponentSize()
                            .clickable { viewModel.selectServer(node) }
                            .border(
                                1.dp,
                                if (isSelected) CyberEmerald else BorderColor,
                                RoundedCornerShape(8.dp)
                            ),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isSelected) CardSelectedBg else DarkSteel
                        )
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(node.flagEmoji, fontSize = 28.sp)
                                Spacer(modifier = Modifier.width(14.dp))
                                Column(modifier = Modifier.weight(1f)) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = node.name,
                                            color = TextPrimary,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 13.sp,
                                            maxLines = 1,
                                            overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                                        )
                                        if (node.isPremium) {
                                            Spacer(modifier = Modifier.width(6.dp))
                                            Box(
                                                modifier = Modifier
                                                    .background(ElectricCyan.copy(alpha = 0.2f), RoundedCornerShape(4.dp))
                                                    .border(0.5.dp, ElectricCyan, RoundedCornerShape(4.dp))
                                                    .padding(horizontal = 4.dp, vertical = 1.dp)
                                            ) {
                                                Text("PREMIUM", color = ElectricCyan, fontSize = 8.sp, fontFamily = FontFamily.Monospace)
                                            }
                                        }
                                    }
                                    Spacer(modifier = Modifier.height(2.dp))
                                    Text(
                                        text = "IP: ${node.ipAddress} • Protocol: ${node.protocolSupported}",
                                        color = TextSecondary,
                                        fontSize = 11.sp,
                                        maxLines = 1,
                                        overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.width(8.dp))

                            Column(
                                horizontalAlignment = Alignment.End,
                                modifier = Modifier.widthIn(min = 65.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("⚡", fontSize = 12.sp)
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "${node.pingsMs} ms",
                                        color = if (node.pingsMs < 60) CyberEmerald else SignalOrange,
                                        fontSize = 12.sp,
                                        fontFamily = FontFamily.Monospace,
                                        fontWeight = FontWeight.Bold,
                                        maxLines = 1
                                    )
                                }
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = "Load: ${node.loadPercentage}%",
                                    color = TextMuted,
                                    fontSize = 10.sp,
                                    fontFamily = FontFamily.Monospace,
                                    maxLines = 1
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

// 3. ACCOUNT & SPLENDID DECENTRALIZED CRYPTO BILLING SCREEN
@Composable
fun AccountSubscriptionScreen(
    viewModel: VpnViewModel,
    localizer: (String, String, String, String, String) -> String
) {
    val sub by viewModel.userSubscription.collectAsState()
    val cryptoSolAddress by viewModel.cryptoSolAddress.collectAsState()
    val cryptoUsdtAddress by viewModel.cryptoUsdtAddress.collectAsState()
    val priceStandardSol by viewModel.priceStandardSol.collectAsState()
    val pricePremiumSol by viewModel.pricePremiumSol.collectAsState()

    var isPaying by remember { mutableStateOf<String?>(null) }
    var selectedCryptoWallet by remember { mutableStateOf("USDT (ERC20)") }
    var mockTxHash by remember { mutableStateOf("") }
    var notificationMessage by remember { mutableStateOf("") }

    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text(
            text = localizer("PIONEER IDENTIFICATION & PLANS", "MEMBRESÍAS Y PLANES DE ACCESO", "MITGLIEDSCHAFT & ABRECHNUNG", "メンバーシップ & 精算プラン", "身份授权与隐私套餐"),
            color = CyberEmerald,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Card(
            colors = CardDefaults.cardColors(containerColor = DarkSteel),
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(localizer("CURRENT DEPLOYMENT ID", "CREDENCIAL INGRESDADA", "KONTO DETAIL", "現在のアカウント", "当前授权状态"), color = TextMuted, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                Text(sub.email, color = TextPrimary, fontSize = 14.sp, fontWeight = FontWeight.Bold)

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(localizer("LICENSURE LEVEL", "NIVEL DE TARIFA", "TUNNEL TIER", "暗号規格", "盾口等级"), color = TextMuted, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = sub.tier,
                                color = if (sub.tier == "FREE") TextSecondary else CyberEmerald,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = FontFamily.Monospace
                            )
                            if (sub.tier != "FREE") {
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("✅", fontSize = 12.sp)
                            }
                        }
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(localizer("EXPIRES AT (UTC)", "EXPIRACIÓN (UTC)", "ABLAUFDATUM", "有効期限", "过期时间"), color = TextMuted, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                        Text(sub.expiresAt, color = TextPrimary, fontSize = 12.sp, fontFamily = FontFamily.Monospace)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (isPaying == null) {
            Text(
                text = localizer("AVAILABLE CONFIGURATIONS", "MEJORAR CUENTA", "PLAN AUSWÄHLEN", "アップグレード可能なプラン", "升级加密信道"),
                color = TextPrimary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Monospace,
                modifier = Modifier.padding(bottom = 8.dp)
            )

            PlanCard(
                title = localizer("STANDARD VAULT", "BÓVEDA ESTÁNDAR", "STANDARDSCHUTZ", "スタンダード", "标准隐形中继"),
                price = "$3.20 / mo",
                cryptoPrice = "≈ $priceStandardSol SOL",
                features = listOf(
                    localizer("Access to standard Japanese Neon server", "Servidor de Shinjuku Neon integrado", "Zugriff auf Shinjuku Neon Server", "Shinjuku Neonサーバーを完全解放", "畅连日本霓虹、新加坡核心中继"),
                    localizer("WireGuard protocol acceleration up to 300 Mbps", "Velocidades WireGuard hasta 300 Mbps", "Geschwindigkeiten bis zu 300 Mbps", "最速 300 Mbps の回線バースト", "信道提速，享受最高 300 Mbps 带宽"),
                    localizer("Dripless reconnect backup nodes", "Alternadores de redundancia sin caída de datos", "Störfallfreie Ausfallsicherung", "漏れなき転送バックアップの有効化", "启用无感防漏断备份网络")
                ),
                highlightColor = ElectricCyan,
                onSelect = { isPaying = "STANDARD" }
            )

            Spacer(modifier = Modifier.height(12.dp))

            PlanCard(
                title = localizer("LORAPOK STEALTH EXTREME", "LORAPOK EXTREMO DISCRETO", "LORAPOK STEALTH EXTREME", "Lorapok 極限ステルス仕様", "Lorapok 曜石极端隐秘"),
                price = "$7.50 / mo",
                cryptoPrice = "≈ $pricePremiumSol SOL",
                features = listOf(
                    localizer("Access to military Swiss Vaults & Iceland Ice nodes", "Bóvedas suizas y nodos árticos en Islandia", "Zugriff auf Schweizer Tresor & Island Knoten", "軍事スイスVaults & アイスランド・ステルス", "解锁瑞士雪山保密堡垒与冰岛极地暗曜节点"),
                    localizer("Unlimited speed & rate limits (1 Gbps+)", "Velocidad ilimitada sin límites (1 Gbps+)", "Unbegrenzte Geschwindigkeiten (1 Gbps+)", "転送速度無制限 (最高 1 Gbps)", "尊享最优先级 1 Gbps+ 无锁爆发带宽"),
                    localizer("Automated priority network failover controls", "Control automático de caída de conexión dedicado", "Priorisierter Ausfallschutz-Mechanismus", "AI優先の自動バックアップルーティング", "AI 主动防断感知系统优先响应保护"),
                    localizer("Specialized VIP Sentinel AI response priorities", "Atención ultra prioritario de IA", "VIP Sentinel AI Support", "専属 AI 最優先アシスタント応答", "AI 导航员响应优先级提升，提供极客建议")
                ),
                highlightColor = CyberEmerald,
                onSelect = { isPaying = "PREMIUM" }
            )
        } else {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkSteel),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, CyberEmerald, RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("INVOICE FOR LORACON $isPaying", color = CyberEmerald, fontSize = 12.sp, fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Bold)
                        IconButton(onClick = { isPaying = null }) {
                            Text("❌", fontSize = 12.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = localizer("DECENTRALIZED CRYPTO GATEWAY", "PORTAL DE CRIPTOMONEDAS", "KRYPTO ZAHLUNGSPORTAL", "分散型仮想通貨決済ゲートウェイ", "去中心化加密支付终端"),
                        color = TextPrimary,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        val wallets = listOf("USDT (Solana)", "SOLANA", "USDC (Solana)")
                        wallets.forEach { w ->
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .minimumInteractiveComponentSize()
                                    .clip(RoundedCornerShape(4.dp))
                                    .background(if (selectedCryptoWallet == w) CyberEmerald else ObsidianBlack)
                                    .clickable { selectedCryptoWallet = w }
                                    .padding(vertical = 8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(w, color = if (selectedCryptoWallet == w) ObsidianBlack else TextSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(localizer("DEPOSIT WALLET ADDRESS (SOLANA DEVNET)", "DIRECCIÓN DE DEPOSITO SOLANA", "BETRAG AN SOLANAADRESSE SENDE", "デポジットSolana送金先", "专有接收网关地址(Solana Devnet)"), color = TextMuted, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(ObsidianBlack, RoundedCornerShape(6.dp))
                            .border(0.5.dp, BorderColorMedium, RoundedCornerShape(6.dp))
                            .padding(10.dp)
                    ) {
                        Text(
                            text = if (selectedCryptoWallet.contains("USDT") || selectedCryptoWallet.contains("USDC")) cryptoUsdtAddress else cryptoSolAddress,
                            color = AccentMint,
                            fontSize = 11.sp,
                            fontFamily = FontFamily.Monospace
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = mockTxHash,
                        onValueChange = { mockTxHash = it },
                        label = { Text("Paste Solana Tx Hash or Block Signature", color = TextSecondary) },
                        placeholder = { Text("e.g., 4nPx3T...x89q", color = TextMuted) },
                        textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 12.sp),
                        modifier = Modifier.fillMaxWidth().testTag("crypto_tx_hash_input"),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = CyberEmerald,
                            unfocusedBorderColor = BorderColorMedium
                        ),
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done)
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            if (mockTxHash.trim().isEmpty()) {
                                notificationMessage = "Please paste a simulated Solana transaction validation signature hash."
                            } else {
                                scope.launch {
                                    notificationMessage = "Decrypting block on Solana Devnet... verifying LCon billing nodes..."
                                    delay(2000)
                                    viewModel.upgradeSubscription(isPaying!!)
                                    notificationMessage = "Authorization success! Premium Sentinel vaults activated."
                                    delay(2000)
                                    isPaying = null
                                    mockTxHash = ""
                                    notificationMessage = ""
                                }
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = CyberEmerald),
                        modifier = Modifier.fillMaxWidth().testTag("payment_verify_button"),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(localizer("CONFIRM DECENTRALIZED SETTLEMENT", "VERIFICAR TRANSACCIÓN CRYPTO", "TRANSAKTION VERIFIZIEREN", "支払い処理を検証する", "提交去中心化链上存证"), color = Color(0xFF090D14), fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    }

                    if (notificationMessage.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(notificationMessage, color = AccentMint, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                    }
                }
            }
        }
    }
}

@Composable
fun PlanCard(
    title: String,
    price: String,
    cryptoPrice: String,
    features: List<String>,
    highlightColor: Color,
    onSelect: () -> Unit
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = DarkSteel),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(title, color = highlightColor, fontSize = 14.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
                Column(horizontalAlignment = Alignment.End) {
                    Text(price, color = TextPrimary, fontSize = 14.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    Text(cryptoPrice, color = TextMuted, fontSize = 9.sp, fontFamily = FontFamily.Monospace)
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            features.forEach { feat ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(highlightColor)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(feat, color = TextSecondary, fontSize = 11.sp)
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = onSelect,
                colors = ButtonDefaults.buttonColors(containerColor = highlightColor),
                modifier = Modifier.fillMaxWidth().testTag("select_plan_$title"),
                shape = RoundedCornerShape(6.dp)
            ) {
                Text("ACQUIRE KEYS", color = Color(0xFF090D14), fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
        }
    }
}

// 4. SQLITE ROOM PERSISTED CONNECTION LOGS
@Composable
fun ConnectionLogsScreen(
    viewModel: VpnViewModel,
    localizer: (String, String, String, String, String) -> String
) {
    val logs by viewModel.logs.collectAsState()
    var searchKeyword by remember { mutableStateOf("") }
    var filterLevel by remember { mutableStateOf("ALL") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = localizer("SECURE AUDIT PATH (ROOM SQLITE)", "AUDITORÍA EN TIEMPO REAL", "ZERTIFIZIERTES SYSTEMPROTOKOLL", "リアルタイム暗号化ログ", "本地安全审计日志 (SQLite Room)"),
                color = CyberEmerald,
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                fontFamily = FontFamily.Monospace
            )

            IconButton(onClick = { viewModel.clearLogDatabase() }) {
                Text("🗑️", fontSize = 16.sp)
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val levels = listOf("ALL", "CONNECTED", "DISCONNECTED")
            levels.forEach { lvl ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .minimumInteractiveComponentSize()
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (filterLevel == lvl) CyberEmerald else DarkSteel)
                        .clickable { filterLevel = lvl }
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(lvl, color = if (filterLevel == lvl) ObsidianBlack else TextSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                }
            }
        }

        OutlinedTextField(
            value = searchKeyword,
            onValueChange = { searchKeyword = it },
            placeholder = { Text("Search system node logs...", color = TextMuted) },
            textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 12.sp),
            modifier = Modifier.fillMaxWidth().testTag("system_log_search"),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = CyberEmerald,
                unfocusedBorderColor = BorderColorMedium
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        val filteredLogs = logs.filter { item ->
            val matchLvl = (filterLevel == "ALL" || item.status == filterLevel)
            val matchKw = (searchKeyword.isEmpty() || item.serverName.contains(searchKeyword, ignoreCase = true) || item.ipAddress.contains(searchKeyword))
            matchLvl && matchKw
        }

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.weight(1f)
        ) {
            if (filteredLogs.isEmpty()) {
                item {
                    Box(modifier = Modifier.fillMaxWidth().padding(40.dp), contentAlignment = Alignment.Center) {
                        Text("No audited logs found matching constraints.", color = TextMuted, fontFamily = FontFamily.Monospace, fontSize = 11.sp)
                    }
                }
            } else {
                items(filteredLogs) { log ->
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(6.dp))
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = log.status,
                                    color = if (log.status == "CONNECTED") CyberEmerald else WarningRed,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    fontFamily = FontFamily.Monospace
                                )
                                Text(
                                    text = java.text.SimpleDateFormat("HH:mm:ss.SSS", java.util.Locale.US).format(java.util.Date(log.timestamp)),
                                    color = TextMuted,
                                    fontSize = 10.sp,
                                    fontFamily = FontFamily.Monospace
                                )
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "Node: ${log.serverName} (${log.ipAddress})",
                                color = TextPrimary,
                                fontSize = 12.sp,
                                fontFamily = FontFamily.Monospace
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Protocol: ${log.protocol} • Transmitted: Tx ${formatBytes(log.bytesSent)} / Rx ${formatBytes(log.bytesReceived)} • Duration: ${log.durationSeconds}s",
                                color = TextSecondary,
                                fontSize = 11.sp,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }
    }
}

// 5. MASTER CONTROLLER WORKBENCH
@Composable
fun AdminDashboardScreen(
    viewModel: VpnViewModel,
    localizer: (String, String, String, String, String) -> String
) {
    val clock by viewModel.utcClock.collectAsState()
    val servers by viewModel.servers.collectAsState()

    // ViewModel Admin configuration states
    val cryptoSolAddress by viewModel.cryptoSolAddress.collectAsState()
    val cryptoUsdtAddress by viewModel.cryptoUsdtAddress.collectAsState()
    val priceStandardSol by viewModel.priceStandardSol.collectAsState()
    val pricePremiumSol by viewModel.pricePremiumSol.collectAsState()
    val selectedApiProvider by viewModel.selectedApiProvider.collectAsState()
    val grokApiKeyString by viewModel.grokApiKeyString.collectAsState()
    val freeBandwidthLimit by viewModel.freeBandwidthLimit.collectAsState()
    val freeDailyQuotaLimit by viewModel.freeDailyQuotaLimit.collectAsState()

    var activeAdminTab by remember { mutableStateOf("FLOW") } // "FLOW", "CRYPT", "SERVERS", "MONITOR"

    // Crypt Wallet Fields
    var solAddressField by remember(cryptoSolAddress) { mutableStateOf(cryptoSolAddress) }
    var usdtAddressField by remember(cryptoUsdtAddress) { mutableStateOf(cryptoUsdtAddress) }
    var priceStandardSolField by remember(priceStandardSol) { mutableStateOf(priceStandardSol.toString()) }
    var pricePremiumSolField by remember(pricePremiumSol) { mutableStateOf(pricePremiumSol.toString()) }

    // API Key Editor Field
    var grokKeyField by remember(grokApiKeyString) { mutableStateOf(grokApiKeyString) }

    // Server Adder Form State
    var newServerId by remember { mutableStateOf("") }
    var newServerName by remember { mutableStateOf("") }
    var newServerCountry by remember { mutableStateOf("") }
    var newServerFlag by remember { mutableStateOf("🌐") }
    var newServerIp by remember { mutableStateOf("") }
    var newServerPing by remember { mutableStateOf(45f) }
    var newServerLoad by remember { mutableStateOf(20f) }
    var newServerIsPremium by remember { mutableStateOf(false) }
    var newServerRequiredTier by remember { mutableStateOf("FREE") } // FREE, STANDARD, PREMIUM
    var newServerProtocol by remember { mutableStateOf("WireGuard & OpenVPN") }

    var formStatusMessage by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = localizer("ADMIN MASTER COGNITIVE PORTAL", "CONSOLA DE CONTROL MASTER", "ADMINISTRATIVES MASTER-WERKBANK", "マスター管理パネル", "系统控制与边缘调度控制台"),
            color = CyberEmerald,
            fontWeight = FontWeight.Bold,
            fontSize = 17.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.padding(bottom = 6.dp)
        )

        // Clock & Quick telemetry stats card
        Card(
            colors = CardDefaults.cardColors(containerColor = ObsidianBlack),
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("REALTIMING COORDINATION (UTC)", color = TextMuted, fontSize = 9.sp, fontFamily = FontFamily.Monospace)
                    Text(
                        text = if (selectedApiProvider == "Grok AI API") "PROVIDER: xAI GROK" else "PROVIDER: GEMINI-FLASH",
                        color = if (selectedApiProvider == "Grok AI API") TechPurple else CyberEmerald,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )
                }
                Text(clock, color = TechPurple, fontSize = 16.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                Spacer(modifier = Modifier.height(4.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Active Db Endpoints: ${servers.filter { it.isActive }.size}", color = TextSecondary, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                    Text("System Security Status: 0x01 SECURE", color = CyberEmerald, fontSize = 11.sp, fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Bold)
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Admin Sub Tab select bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSteel, RoundedCornerShape(4.dp))
                .padding(2.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            val tabs = listOf(
                "FLOW" to "FLOW & API",
                "CRYPT" to "CRYPT VAULT",
                "SERVERS" to "NODES BUILD",
                "MONITOR" to "GRAPH MONITOR"
            )
            tabs.forEach { (key, title) ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .minimumInteractiveComponentSize()
                        .clip(RoundedCornerShape(3.dp))
                        .background(if (activeAdminTab == key) CyberEmerald else Color.Transparent)
                        .clickable { activeAdminTab = key }
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = title,
                        color = if (activeAdminTab == key) ObsidianBlack else TextSecondary,
                        fontSize = 8.6.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Content Area with scrollable components or nested cards
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            when (activeAdminTab) {
                "FLOW" -> {
                    // API System and limit sliders
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Text("API PROVIDER ORACLE ENGINE", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            Spacer(modifier = Modifier.height(8.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                listOf("Gemini API", "Grok AI API").forEach { prov ->
                                    val isSelected = selectedApiProvider == prov
                                    Box(
                                        modifier = Modifier
                                            .weight(1f)
                                            .minimumInteractiveComponentSize()
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(if (isSelected) CyberEmerald else ObsidianBlack)
                                            .border(1.dp, if (isSelected) CyberEmerald else BorderColorMedium, RoundedCornerShape(6.dp))
                                            .clickable { viewModel.updateApiSettings(prov, grokKeyField) }
                                            .padding(10.dp),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(prov, color = if (isSelected) ObsidianBlack else TextPrimary, fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            if (selectedApiProvider == "Grok AI API") {
                                OutlinedTextField(
                                    value = grokKeyField,
                                    onValueChange = {
                                        grokKeyField = it
                                        viewModel.updateApiSettings("Grok AI API", it)
                                    },
                                    label = { Text("Grok AI (xAI) API Key Payload", color = TechPurple) },
                                    placeholder = { Text("e.g. xai-9aJK81...", color = TextMuted) },
                                    textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 11.sp),
                                    modifier = Modifier.fillMaxWidth().testTag("grok_api_key_input"),
                                    colors = OutlinedTextFieldDefaults.colors(
                                        focusedBorderColor = TechPurple,
                                        unfocusedBorderColor = BorderColorMedium
                                    )
                                )
                                Text("Grok AI cognitive model operates with deep-encryption rules and cheeky tech insight answers.", color = TextMuted, fontSize = 9.sp, modifier = Modifier.padding(top = 4.dp))
                            } else {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(ObsidianBlack, RoundedCornerShape(6.dp))
                                        .padding(10.dp)
                                ) {
                                    Text("Gemini API keys managed via AI Studio Secrets. Flash v1.5-Flash cognitive engine enabled.", color = TextMuted, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                                }
                            }
                        }
                    }

                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Text("BANDWIDTH FLOW THROTTLING (FREE TIER)", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            Spacer(modifier = Modifier.height(8.dp))

                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                Text("Free Bandwidth Cap", color = TextPrimary, fontSize = 11.sp)
                                Text("$freeBandwidthLimit Mbps", color = CyberEmerald, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            }
                            Slider(
                                value = freeBandwidthLimit.toFloat(),
                                onValueChange = { viewModel.updateFreeLimits(it.toInt(), freeDailyQuotaLimit) },
                                valueRange = 10f..150f,
                                colors = SliderDefaults.colors(
                                    thumbColor = CyberEmerald,
                                    activeTrackColor = CyberEmerald,
                                    inactiveTrackColor = BorderColorMedium
                                )
                            )

                            Spacer(modifier = Modifier.height(8.dp))

                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                Text("Free Daily Quota Limit", color = TextPrimary, fontSize = 11.sp)
                                Text("$freeDailyQuotaLimit MB", color = CyberEmerald, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            }
                            Slider(
                                value = freeDailyQuotaLimit.toFloat(),
                                onValueChange = { viewModel.updateFreeLimits(freeBandwidthLimit, it.toInt()) },
                                valueRange = 100f..2000f,
                                colors = SliderDefaults.colors(
                                    thumbColor = CyberEmerald,
                                    activeTrackColor = CyberEmerald,
                                    inactiveTrackColor = BorderColorMedium
                                )
                            )
                            Text("Connected Free plans will get capped and speed-limited based on these rates instantly.", color = TextMuted, fontSize = 9.sp, modifier = Modifier.padding(top = 4.dp))
                        }
                    }
                }

                "CRYPT" -> {
                    // Wallet configurations and plan rates
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("BLOCKCHAIN DEPLOYMENT PAYROLL SETTINGS", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)

                            OutlinedTextField(
                                value = solAddressField,
                                onValueChange = { solAddressField = it },
                                label = { Text("Solana (SOL) Recipient Address", color = TextSecondary) },
                                textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 11.sp),
                                modifier = Modifier.fillMaxWidth().testTag("sol_wallet_input"),
                                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                            )

                            OutlinedTextField(
                                value = usdtAddressField,
                                onValueChange = { usdtAddressField = it },
                                label = { Text("USDT (Solana/ERC20) Recipient Address", color = TextSecondary) },
                                textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 11.sp),
                                modifier = Modifier.fillMaxWidth().testTag("usdt_wallet_input"),
                                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                            )

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                OutlinedTextField(
                                    value = priceStandardSolField,
                                    onValueChange = { priceStandardSolField = it },
                                    label = { Text("Standard rate SOL", color = TextSecondary) },
                                    textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 11.sp),
                                    modifier = Modifier.weight(1f).testTag("std_price_input"),
                                    colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                                )

                                OutlinedTextField(
                                    value = pricePremiumSolField,
                                    onValueChange = { pricePremiumSolField = it },
                                    label = { Text("Premium rate SOL", color = TextSecondary) },
                                    textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontFamily = FontFamily.Monospace, fontSize = 11.sp),
                                    modifier = Modifier.weight(1f).testTag("prem_price_input"),
                                    colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                                )
                            }

                            Button(
                                onClick = {
                                    val solPrice = priceStandardSolField.toDoubleOrNull() ?: priceStandardSol
                                    val premPrice = pricePremiumSolField.toDoubleOrNull() ?: pricePremiumSol
                                    viewModel.updateCryptoSettings(solAddressField, usdtAddressField, solPrice, premPrice)
                                    formStatusMessage = "Settlement keys synchronized to dynamic registry."
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = CyberEmerald),
                                modifier = Modifier.fillMaxWidth().testTag("save_crypt_button"),
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text("SYNCHRONIZE PAYROLL CONFIGS", color = ObsidianBlack, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace, fontSize = 11.sp)
                            }

                            if (formStatusMessage.isNotEmpty()) {
                                Text(formStatusMessage, color = AccentMint, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }
                }

                "SERVERS" -> {
                    // Server additions and deletions
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text("BUILD NEW VPN NODE PROFILE", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)

                            OutlinedTextField(
                                value = newServerId,
                                onValueChange = { newServerId = it },
                                label = { Text("Server ID Key (e.g. us_sf)", color = TextSecondary) },
                                textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 11.sp),
                                modifier = Modifier.fillMaxWidth(),
                                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                            )

                            OutlinedTextField(
                                value = newServerName,
                                onValueChange = { newServerName = it },
                                label = { Text("Server Name", color = TextSecondary) },
                                textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 11.sp),
                                modifier = Modifier.fillMaxWidth(),
                                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                            )

                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                OutlinedTextField(
                                    value = newServerCountry,
                                    onValueChange = { newServerCountry = it },
                                    label = { Text("Country", color = TextSecondary) },
                                    textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 11.sp),
                                    modifier = Modifier.weight(1.3f),
                                    colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                                )

                                OutlinedTextField(
                                    value = newServerFlag,
                                    onValueChange = { newServerFlag = it },
                                    label = { Text("Flag Emoji", color = TextSecondary) },
                                    textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 11.sp),
                                    modifier = Modifier.weight(0.7f),
                                    colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                                )
                            }

                            OutlinedTextField(
                                value = newServerIp,
                                onValueChange = { newServerIp = it },
                                label = { Text("IP Address Target", color = TextSecondary) },
                                textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 11.sp),
                                modifier = Modifier.fillMaxWidth(),
                                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = CyberEmerald, unfocusedBorderColor = BorderColorMedium)
                            )

                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.CenterVertically) {
                                Text("Required Tier:", color = TextSecondary, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                                listOf("FREE", "STANDARD", "PREMIUM").forEach { tier ->
                                    val isSelected = newServerRequiredTier == tier
                                    Box(
                                        modifier = Modifier
                                            .weight(1f)
                                            .minimumInteractiveComponentSize()
                                            .clip(RoundedCornerShape(4.dp))
                                            .background(if (isSelected) CyberEmerald else ObsidianBlack)
                                            .clickable {
                                                newServerRequiredTier = tier
                                                newServerIsPremium = tier != "FREE"
                                            }
                                            .padding(6.dp),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(tier, color = if (isSelected) ObsidianBlack else TextSecondary, fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                                    }
                                }
                            }

                            Button(
                                onClick = {
                                    if (newServerId.trim().isEmpty() || newServerName.trim().isEmpty() || newServerIp.trim().isEmpty()) {
                                        formStatusMessage = "Please fulfill ID, Name and IP Address fields."
                                    } else {
                                        viewModel.addServer(
                                            id = newServerId.trim(),
                                            name = newServerName.trim(),
                                            country = newServerCountry.trim().ifEmpty { "Global" },
                                            flagEmoji = newServerFlag.trim().ifEmpty { "🌐" },
                                            ipAddress = newServerIp.trim(),
                                            pingsMs = newServerPing.toInt(),
                                            loadPercentage = newServerLoad.toInt(),
                                            isPremium = newServerIsPremium,
                                            requiredTier = newServerRequiredTier,
                                            protocolSupported = newServerProtocol
                                        )
                                        formStatusMessage = "Server '${newServerName}' injected into local Room database successfully."
                                        // Reset fields
                                        newServerId = ""
                                        newServerName = ""
                                        newServerCountry = ""
                                        newServerFlag = "🌐"
                                        newServerIp = ""
                                    }
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = CyberEmerald),
                                modifier = Modifier.fillMaxWidth().testTag("add_node_button"),
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text("COMPOSE & INJECT NODE", color = ObsidianBlack, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace, fontSize = 11.sp)
                            }
                        }
                    }

                    Text("ACTIVE COGNITIVE SYSTEM ENDPOINTS", color = TextPrimary, fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace, modifier = Modifier.padding(top = 6.dp))

                    servers.filter { it.isActive }.forEach { node ->
                        Card(
                            colors = CardDefaults.cardColors(containerColor = DarkSteel),
                            modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(8.dp))
                        ) {
                            Row(
                                modifier = Modifier.padding(10.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(modifier = Modifier.weight(1f), verticalAlignment = Alignment.CenterVertically) {
                                    Text(node.flagEmoji, fontSize = 22.sp)
                                    Spacer(modifier = Modifier.width(10.dp))
                                    Column {
                                        Text(node.name, color = TextPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold, maxLines = 1)
                                        Text("IP: ${node.ipAddress} • ${node.requiredTier}", color = TextSecondary, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
                                    }
                                }
                                IconButton(
                                    onClick = { viewModel.deleteServer(node) },
                                    modifier = Modifier.minimumInteractiveComponentSize()
                                ) {
                                    Text("🗑️", fontSize = 14.sp)
                                }
                            }
                        }
                    }
                }

                "MONITOR" -> {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Text("SENTIENT TELEMETRY CONSOLE", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            Spacer(modifier = Modifier.height(4.dp))
                            Text("Realtime simulation of package stream throughput & neural encryption delays.", color = TextMuted, fontSize = 9.sp)

                            Spacer(modifier = Modifier.height(14.dp))

                            // Advanced Moving Graph canvas diagram
                            val infiniteTransition = rememberInfiniteTransition(label = "graph_shift")
                            val graphPhase by infiniteTransition.animateFloat(
                                initialValue = 0f,
                                targetValue = 2f * Math.PI.toFloat(),
                                animationSpec = infiniteRepeatable(
                                    animation = tween(2000, easing = LinearEasing)
                                ),
                                label = "phase"
                            )

                            val emeraldLocColor = CyberEmerald
                            val purpleLocColor = TechPurple

                            androidx.compose.foundation.Canvas(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(140.dp)
                                    .background(ObsidianBlack, RoundedCornerShape(8.dp))
                                    .border(1.dp, BorderColorMedium, RoundedCornerShape(8.dp))
                            ) {
                                val w = size.width
                                val h = size.height

                                // Draw grids
                                for (i in 1..4) {
                                    val gy = h * i / 5
                                    drawLine(Color.Gray.copy(alpha = 0.15f), Offset(0f, gy), Offset(w, gy), strokeWidth = 2f)
                                }
                                for (i in 1..9) {
                                    val gx = w * i / 10
                                    drawLine(Color.Gray.copy(alpha = 0.15f), Offset(gx, 0f), Offset(gx, h), strokeWidth = 2f)
                                }

                                // Draw moving waves represent load throughput
                                val points = 100
                                val path = androidx.compose.ui.graphics.Path()
                                for (p in 0..points) {
                                    val px = w * p / points
                                    val term1 = Math.sin((p * 0.15 + graphPhase).toDouble()).toFloat()
                                    val term2 = Math.cos((p * 0.05 - graphPhase * 0.5).toDouble()).toFloat()
                                    val py = h * 0.5f + (term1 * 25f) + (term2 * 12f)
                                    if (p == 0) path.moveTo(px, py) else path.lineTo(px, py)
                                }
                                drawPath(path, color = emeraldLocColor, style = Stroke(width = 4f, cap = StrokeCap.Round))

                                // Draw second wave representing latency delays
                                val path2 = androidx.compose.ui.graphics.Path()
                                for (p in 0..points) {
                                    val px = w * p / points
                                    val term1 = Math.cos((p * 0.10 + graphPhase * 1.2).toDouble()).toFloat()
                                    val term2 = Math.sin((p * 0.08 - graphPhase).toDouble()).toFloat()
                                    val py = h * 0.6f + (term1 * 18f) + (term2 * 8f)
                                    if (p == 0) path2.moveTo(px, py) else path2.lineTo(px, py)
                                }
                                drawPath(path2, color = purpleLocColor, style = Stroke(width = 3f, cap = StrokeCap.Round))
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(modifier = Modifier.size(8.dp).background(CyberEmerald, CircleShape))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Client Throughput: 42.4 MB/s (AVG)", color = TextSecondary, fontSize = 9.sp, fontFamily = FontFamily.Monospace)
                                }

                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(modifier = Modifier.size(8.dp).background(TechPurple, CircleShape))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Crypt handshake delay: 35ms", color = TextSecondary, fontSize = 9.sp, fontFamily = FontFamily.Monospace)
                                }
                            }
                        }
                    }

                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkSteel),
                        modifier = Modifier.fillMaxWidth().border(0.5.dp, BorderColor, RoundedCornerShape(10.dp))
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text("RAPID PROTOCOL CLEARING AUDITOR", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            Text("Database storage caches are backed up locally by Room SQL. Purge historic connections log securely and safely below.", color = TextSecondary, fontSize = 11.sp)
                            Spacer(modifier = Modifier.height(4.dp))
                            Button(
                                onClick = {
                                    viewModel.clearLogDatabase()
                                    formStatusMessage = "Audit log records erased on SQLite server."
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = WarningRed),
                                modifier = Modifier.fillMaxWidth().testTag("purge_logs_button"),
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text("PURGE CONNECTIVITY ARCHIVES", color = Color.White, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace, fontSize = 11.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ResearchHubScreen(
    localizer: (String, String, String, String, String) -> String
) {
    var activeSubTab by remember { mutableStateOf("MANUAL") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = localizer("LORA SYSTEM INTEL HUB", "BIBLIOTECA SISTEMA LORACON", "LORA_CON SPEZIFIKATIONEN", "最先端技術リサーチ・指南", "安全工程指南与协议研究中心"),
            color = CyberEmerald,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            fontFamily = FontFamily.Monospace,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("MANUAL", "REPOS").forEach { tab ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .minimumInteractiveComponentSize()
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (activeSubTab == tab) CyberEmerald else DarkSteel)
                        .clickable { activeSubTab = tab }
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = if (tab == "MANUAL") localizer("SYSTEM MANUAL", "GUÍA DE USO", "BENUTZERHANDBUCH", "システム指南", "操作指引与用户手册")
                               else localizer("TECH SPECS", "ESPECIFICACIONES", "TECH SPEZIFIKATION", "技術仕様", "协议开源技术库"),
                        color = if (activeSubTab == tab) ObsidianBlack else TextSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        if (activeSubTab == "MANUAL") {
            Text(
                text = localizer("Operational instructions of Lorapok crypt tunnels.", "Instrucciones paso a paso del espectro técnico para el usuario.", "Schritt-für-Schritt-Anleitung zur Nutzung von LoraCon.", "暗号化トンネルの設定と基本操作のマニュアル。", "了解如何利用 LoraCon 零碎阻碍优化工具，一键直达防御核心："),
                color = TextSecondary,
                fontSize = 11.sp,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.weight(1f)
            ) {
                item {
                    ManualStepCard(
                        step = "STEP 1: NODE DISCOVERY",
                        title = localizer("Inception & Node Setup", "Incepción y Nodos", "Knoten-Inbetriebnahme", "ノードの検出と確立", "极客入口与选节点"),
                        desc = localizer(
                            "Navigate to the 'Nodes' channel tab. Review the real-time latency indicators (⚡ in ms) and server load levels. Standard free nodes do not require security clearance. Click any server to prime your routing target.",
                            "Navegue al canal Nodos. Revise el ping en milisegundos y carga. Haga clic en un nodo de Rhein-Main o Fráncfort para apuntar su tráfico.",
                            "Wählen Sie im Reiter 'Knoten' einen Server aus. Standard-Knoten sind frei verfügbar, während Premium-Knoten gesicherte Token erfordern.",
                            "「ノード」タブを起動し、伝送遅延（⚡ ms）と負荷を確認します。無料ノードは常时開放されており、クリックするだけで瞬時に接続標的が確定します。",
                            "点击屏幕下方的“节点”菜单，查看全球各大边缘服务器。留意绿色闪电标出的延迟能耗（如 35ms ）。普通免费节点双击直接装载即可。"
                        ),
                        icon = "🌍"
                    )
                }
                item {
                    ManualStepCard(
                        step = "STEP 2: ENVELOPE SHIELDING",
                        title = localizer("Armor Tunnel handshakes", "Handshakes Seguros", "Handshake-Aktivierung", "トンネル鍵交換", "激活物理防卫外壳"),
                        desc = localizer(
                            "Transition to the main 'Shield' tab. Toggle the active encapsulation protocol (WireGuard or OpenVPN). Tap the large neural-like biometric Shield core trigger button. Within seconds, secure handshakes complete and routing tables evolve.",
                            "Transicione al panel principal Proteger. Seleccione el protocolo (WireGuard u OpenVPN) y presione el gran switch circular de conexión para armar la protección.",
                            "Aktivieren Sie die VPN-Verschlüsselung im Hauptmenü. Ein Fingertipp auf den holografischen Schild-Button löst den krypto-symmetrischen Schlüsselaustausch aus.",
                            "「シールド」画面で、暗号化プロトコル（WireGuard もしくは OpenVPN）を指定します。中央の巨大な生体サークル電極をタップすると、鍵交換プロセスが開始されます。",
                            "进入首屏“防护”，选择您青睐的底层网络协议（推荐超高速 WireGuard ）。点击正中悬浮的主控圆盘核能开关，微秒内建立隧道连接。"
                        ),
                        icon = "🛡️"
                    )
                }
                item {
                    ManualStepCard(
                        step = "STEP 3: DECENTRALIZED SETTLEMENT",
                        title = localizer("Acquiring Premium Keys", "Adquisición de Llaves", "Schlüssel kaufen", "プレミアムキーの申請", "链上支付解锁高级线路"),
                        desc = localizer(
                            "Access high-bandwidth elite servers via the 'Keys' channel tab. Initiate a decentralized crypto token transfer over Solana Devnet. Input your transaction hash and verify the blocks automatically to secure premium status instantly.",
                            "Para acceder a servidores ilimitados, navegue al canal Llaves. Inicie un pago criptográfico descentralizado en la red Solana Devnet. Ingrese el hash para activar privilegios.",
                            "Erwerben Sie ungedrosselte Verschlüsselungsschlüssel. Überweisen Sie SOL/USDT auf die hinterlegte Blockchain-Wallet und bestätigen Sie die Transaktions-ID.",
                            "「キー」タブから超高速でトラフィックの最適化を継続するために特権プランを選択。認証コード用の決済トランザクションを入力后、自動的に制限が解除されます。",
                            "如果需要加载标记为 PREMIUM 专线，可以在“卡包”进行链上模拟存证。转入模拟的 SOL 后，填写回执凭证，全线极速高宽带瞬间敞开。"
                        ),
                        icon = "🗝️"
                    )
                }
                item {
                    ManualStepCard(
                        step = "STEP 4: SENTIENT AI NAVIGATION",
                        title = localizer("Interactive Diagnostic Chat", "Copiloto Asistente IA", "Systemdiagnose mit KI", "対話型AIナビゲーション", "AI 协同诊断与路由调度"),
                        desc = localizer(
                            "Need advanced network diagnostics or system troubleshooting? Activate the floating Lora AI chatbot in the bottom right corner. Ask complex technical, protocol, or Solana transaction details to get real-time recommendations.",
                            "¿Necesita ayuda? Active la burbuja flotante del asistente Lora AI. Haga preguntas técnicas complejas sobre criptografía, logs de red y resolución de fallos.",
                            "Tippen Sie auf die schwebende KI-Blase unten rechts, wenn Sie Netzwerkprobleme analysieren möchten. Unser Modell sucht nach krypto-strukturellen Bottlenecks.",
                            "右下の「AI ナビゲーター」アイコン（🧠）をタップしてチャットを開きます。最適な暗号ノード提案や、Solana トランザクション承認状況などの技術的相談が可能です。",
                            "如有任何断连、卡顿或区块链网络状况疑问，双击右下角浮动的“微处理器 🧠”小浮窗，人工智能助理将用前沿算法全天候帮您排错。"
                        ),
                        icon = "🧠"

                    )
                }
            }
        } else {
            Text(
                text = localizer(
                    "Below are high-quality secure public cross platform libraries on Github for production implementations.",
                    "A continuación se presentan los repositorios libres estándar del espectro técnico para producción.",
                    "Nachfolgend finden Sie vertrauenswürdige Bibliotheken.",
                    "以下は本番実装向けの高品質なセキュア公开クロスプラットフォームライブラリです。",
                    "强力社群维护的 WireGuard 与 OpenVPN 核心开源代码库生态："
                ),
                color = TextSecondary,
                fontSize = 11.sp,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.weight(1f)
            ) {
                item {
                    ResearchRepositoryCard(
                        title = "WireGuard-Android-SDK",
                        tech = "WireGuard Core Protocol",
                        url = "https://github.com/WireGuard/wireguard-android",
                        desc = "Official WireGuard protocol client implementation. Supports user-space configs, tunnel configurations, fast handshakes, extreme throughput performance, and native kernel interactions on supported devices."
                    )
                }
                item {
                    ResearchRepositoryCard(
                        title = "ics-openvpn",
                        tech = "OpenVPN Protocol",
                        url = "https://github.com/schwabe/ics-openvpn",
                        desc = "Standard-setting open-source OpenVPN client implementation for Android. Implements routing protocols, custom certificates, OpenSSL dependencies, multi-port support, and extensive connection logging triggers."
                    )
                }
                item {
                    ResearchRepositoryCard(
                        title = "Outline-Vpn-Client",
                        tech = "Shadowsocks Protocol",
                        url = "https://github.com/Jigsaw-Code/outline-sdk",
                        desc = "High performance connection framework providing highly resilient obfuscated proxy wrappers for cross-platform clients, utilizing stable Go-modules and secure network tunnels."
                    )
                }
                item {
                    ResearchRepositoryCard(
                        title = "Lorapok Singularity Bible core",
                        tech = "Scientific connectivity Bible research methodologies",
                        url = "https://maijied.github.io/Lorapok-Labs-Bible/",
                        desc = "Lorapok conceptual bible and cellular designs emphasizing deep quantum security, stealth layers, bio-biological geometry, and high-contrast terminal design patterns for software nodes. Connected."
                    )
                }
            }
        }
    }
}

@Composable
fun ManualStepCard(
    step: String,
    title: String,
    desc: String,
    icon: String
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = DarkSteel),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(step, color = TechPurple, fontSize = 9.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                Text(icon, fontSize = 16.sp)
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(title, color = CyberEmerald, fontWeight = FontWeight.Bold, fontSize = 13.sp, fontFamily = FontFamily.Monospace)
            Spacer(modifier = Modifier.height(6.dp))
            Text(desc, color = TextSecondary, fontSize = 11.sp, lineHeight = 16.sp)
        }
    }
}


@Composable
fun ResearchRepositoryCard(
    title: String,
    tech: String,
    url: String,
    desc: String
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = DarkSteel),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(title, color = CyberEmerald, fontWeight = FontWeight.Bold, fontSize = 14.sp, fontFamily = FontFamily.Monospace)
                Box(
                    modifier = Modifier
                        .background(TechPurple.copy(alpha = 0.2f), RoundedCornerShape(4.dp))
                        .border(0.5.dp, TechPurple, RoundedCornerShape(4.dp))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(tech, color = TechPurple, fontSize = 8.sp, fontFamily = FontFamily.Monospace)
                }
            }

            Spacer(modifier = Modifier.height(4.dp))
            Text(url, color = ElectricCyan, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
            Spacer(modifier = Modifier.height(8.dp))
            Text(desc, color = TextSecondary, fontSize = 11.sp, lineHeight = 16.sp)
        }
    }
}

// 7. SENTIENT FLOATING ASSISTANT OVERLAY COMPONENT
@Composable
fun FloatingSentientAiAssistant(
    viewModel: VpnViewModel,
    isExpanded: Boolean,
    onToggle: () -> Unit,
    localizer: (String, String, String, String, String) -> String,
    modifier: Modifier = Modifier
) {
    val messages by viewModel.aiMessages.collectAsState()
    val isAiLoading by viewModel.isAiLoading.collectAsState()

    var chatText by remember { mutableStateOf("") }

    if (!isExpanded) {
        Box(
            modifier = modifier
                .size(60.dp)
                .clip(CircleShape)
                .background(Brush.radialGradient(colors = listOf(CyberEmerald, ObsidianBlack)))
                .border(2.dp, CyberEmerald, CircleShape)
                .minimumInteractiveComponentSize()
                .clickable { onToggle() }
                .testTag("ai_assistant_bubble"),
            contentAlignment = Alignment.Center
        ) {
            val infiniteTransition = rememberInfiniteTransition(label = "pulseRing")
            val pulseScale by infiniteTransition.animateFloat(
                initialValue = 0.9f,
                targetValue = 1.1f,
                animationSpec = infiniteRepeatable(
                    animation = tween(2000, easing = LinearEasing),
                    repeatMode = RepeatMode.Reverse
                ),
                label = "scale"
            )

            Box(
                modifier = Modifier
                    .size(44.dp)
                    .scale(pulseScale)
                    .clip(CircleShape)
                    .background(ObsidianBlack),
                contentAlignment = Alignment.Center
            ) {
                Text("🧠", fontSize = 22.sp)
            }
        }
    } else {
        Card(
            colors = CardDefaults.cardColors(containerColor = DarkSteel),
            modifier = modifier
                .width(320.dp)
                .height(440.dp)
                .border(1.dp, CyberEmerald, RoundedCornerShape(16.dp))
                .testTag("ai_assistant_panel"),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(ObsidianBlack)
                        .padding(horizontal = 14.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(CyberEmerald)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Column {
                            Text("LORA AI NAVIGATOR", color = CyberEmerald, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            Text("Lorapok Core Mind v3.5-Flash", color = TextMuted, fontSize = 8.sp, fontFamily = FontFamily.Monospace)
                        }
                    }

                    IconButton(onClick = onToggle) {
                        Text("❌", fontSize = 12.sp)
                    }
                }

                LazyColumn(
                    modifier = Modifier
                        .weight(1f)
                        .padding(12.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(messages) { msg ->
                        val isUser = msg.sender == "USER"
                        Column(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalAlignment = if (isUser) Alignment.End else Alignment.Start
                        ) {
                            Box(
                                modifier = Modifier
                                    .clip(
                                        RoundedCornerShape(
                                            topStart = 12.dp,
                                            topEnd = 12.dp,
                                            bottomStart = if (isUser) 12.dp else 0.dp,
                                            bottomEnd = if (isUser) 0.dp else 12.dp
                                        )
                                    )
                                    .background(if (isUser) CyberEmerald else ObsidianBlack)
                                    .border(
                                        0.5.dp,
                                        if (isUser) Color.Transparent else BorderColorMedium,
                                        RoundedCornerShape(12.dp)
                                    )
                                    .padding(10.dp)
                            ) {
                                Text(
                                    text = msg.text,
                                    color = if (isUser) ObsidianBlack else TextPrimary,
                                    fontSize = 11.sp,
                                    fontFamily = FontFamily.SansSerif
                                )
                            }
                        }
                    }

                    if (isAiLoading) {
                        item {
                            Text(
                                "Analyzing Lorapok handshakes... processing block validation...",
                                color = TextMuted,
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Monospace,
                                modifier = Modifier.padding(start = 4.dp)
                            )
                        }
                    }
                }

                HorizontalDivider(color = BorderColor)

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    OutlinedTextField(
                        value = chatText,
                        onValueChange = { chatText = it },
                        placeholder = { Text("Ask LoraAI anything...", fontSize = 11.sp) },
                        textStyle = androidx.compose.ui.text.TextStyle(color = TextPrimary, fontSize = 12.sp, fontFamily = FontFamily.SansSerif),
                        modifier = Modifier
                            .weight(1f)
                            .testTag("ai_assistant_input"),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = CyberEmerald,
                            unfocusedBorderColor = BorderColorMedium
                        ),
                        maxLines = 2,
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                        keyboardActions = KeyboardActions(onSend = {
                            if (chatText.trim().isNotEmpty()) {
                                viewModel.sendAiMessage(chatText)
                                chatText = ""
                            }
                        })
                    )

                    Spacer(modifier = Modifier.width(6.dp))

                    IconButton(
                        onClick = {
                            if (chatText.trim().isNotEmpty()) {
                                viewModel.sendAiMessage(chatText)
                                chatText = ""
                            }
                        },
                        modifier = Modifier
                            .background(CyberEmerald, RoundedCornerShape(4.dp))
                            .testTag("ai_assistant_send_button")
                    ) {
                        Text("▶", color = Color(0xFF090D14), fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
fun VpnBottomBar(
    currentTab: NavigationTab,
    onTabSelected: (NavigationTab) -> Unit,
    localizer: (String, String, String, String, String) -> String
) {
    NavigationBar(
        containerColor = ObsidianBlack,
        modifier = Modifier
            .border(0.5.dp, BorderColor, RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp))
    ) {
        val menuItems = listOf(
            VpnMenuItem(NavigationTab.DASHBOARD, Icons.Default.Lock, localizer("Shield", "Proteger", "Schutz", "保護", "防护")),
            VpnMenuItem(NavigationTab.SERVERS, Icons.Default.Menu, localizer("Nodes", "Nodos", "Knoten", "ノード", "节点")),
            VpnMenuItem(NavigationTab.ACCOUNT, Icons.Default.Star, localizer("Keys", "Llaves", "Preise", "キー", "卡包")),
            VpnMenuItem(NavigationTab.LOGS, Icons.Default.Info, localizer("Audit", "Auditar", "Logs", "監査", "日志")),
            VpnMenuItem(NavigationTab.ADMIN, Icons.Default.Settings, localizer("Master", "Admin", "Admin", "管理", "主控")),
            VpnMenuItem(NavigationTab.RESEARCH, Icons.Default.Search, localizer("Specs", "Specs", "Forschung", "詳細", "技术"))
        )

        menuItems.forEach { item ->
            NavigationBarItem(
                selected = currentTab == item.tab,
                onClick = { onTabSelected(item.tab) },
                icon = { Icon(imageVector = item.icon, contentDescription = item.label) },
                label = { Text(item.label, fontSize = 9.sp, fontFamily = FontFamily.Monospace) },
                modifier = Modifier.testTag("nav_tab_${item.tab.name}"),
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = Color(0xFF090D14),
                    selectedTextColor = CyberEmerald,

                    indicatorColor = CyberEmerald,
                    unselectedIconColor = TextMuted,
                    unselectedTextColor = TextMuted
                )
            )
        }
    }
}

// Format Helper Utilities
fun formatBytes(bytes: Long): String {
    if (bytes <= 0) return "0 B"
    val units = listOf("B", "KB", "MB", "GB", "TB")
    val i = (Math.log10(bytes.toDouble()) / Math.log10(1024.0)).toInt()
    return String.format(java.util.Locale.getDefault(), "%.2f %s", bytes / Math.pow(1024.0, i.toDouble()), units[i])
}

fun formatDuration(seconds: Long): String {
    val h = seconds / 3600
    val m = (seconds % 3600) / 60
    val s = seconds % 60
    return String.format(java.util.Locale.getDefault(), "%02d:%02d:%02d", h, m, s)
}
