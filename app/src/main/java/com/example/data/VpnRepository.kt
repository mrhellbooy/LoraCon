package com.example.data

import android.content.Context
import androidx.room.Room
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class VpnRepository(context: Context) {
    private val database: AppDatabase = Room.databaseBuilder(
        context.applicationContext,
        AppDatabase::class.java,
        "loracon_database"
    ).build()

    private val dao = database.vpnDao()

    val allLogs: Flow<List<VpnLog>> = dao.getAllLogs()
    val activeServers: Flow<List<VpnServer>> = dao.getActiveServers()

    suspend fun insertLog(log: VpnLog) = withContext(Dispatchers.IO) {
        dao.insertLog(log)
    }

    suspend fun clearLogs() = withContext(Dispatchers.IO) {
        dao.clearLogs()
    }

    suspend fun insertServer(server: VpnServer) = withContext(Dispatchers.IO) {
        dao.insertServer(server)
    }

    suspend fun updateServerStatus(id: String, load: Int, ping: Int) = withContext(Dispatchers.IO) {
        dao.updateServerStatus(id, load, ping)
    }

    suspend fun initializeDefaultServers() = withContext(Dispatchers.IO) {
        val initialList = listOf(
            VpnServer("us_ny", "LoraCon Sentinel Node NY", "United States", "🇺🇸", "104.244.42.1", 32, 45, false, "FREE", "WireGuard & OpenVPN"),
            VpnServer("de_fr", "LoraCon Core Rhine-Main", "Germany", "🇩🇪", "46.165.211.17", 48, 28, false, "FREE", "WireGuard & OpenVPN"),
            VpnServer("jp_ty", "LoraCon Neon Shinjuku", "Japan", "🇯🇵", "210.140.10.3", 112, 60, false, "STANDARD", "WireGuard Only"),
            VpnServer("sg_jg", "Lorapok Singularity Node SG", "Singapore", "🇸🇬", "116.12.48.9", 74, 52, true, "STANDARD", "WireGuard & OpenVPN"),
            VpnServer("ch_zh", "LoraCon Swiss Alpine Vault", "Switzerland", "🇨🇭", "179.43.129.5", 56, 12, true, "PREMIUM", "OpenVPN Only"),
            VpnServer("is_rk", "Lorapok Arctic Ice Node RK", "Iceland", "🇮🇸", "185.112.144.2", 89, 18, true, "PREMIUM", "WireGuard & OpenVPN")
        )
        for (server in initialList) {
            dao.insertServer(server)
        }
    }
}
