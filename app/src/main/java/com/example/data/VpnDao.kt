package com.example.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface VpnDao {
    @Query("SELECT * FROM vpn_logs ORDER BY timestamp DESC")
    fun getAllLogs(): Flow<List<VpnLog>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLog(log: VpnLog)

    @Query("DELETE FROM vpn_logs")
    suspend fun clearLogs()

    @Query("SELECT * FROM vpn_servers WHERE isActive = 1")
    fun getActiveServers(): Flow<List<VpnServer>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertServer(server: VpnServer)

    @Query("UPDATE vpn_servers SET loadPercentage = :load, pingsMs = :ping WHERE id = :id")
    suspend fun updateServerStatus(id: String, load: Int, ping: Int)
}
