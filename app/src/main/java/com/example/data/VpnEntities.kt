package com.example.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.io.Serializable

@Entity(tableName = "vpn_logs")
data class VpnLog(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val timestamp: Long = System.currentTimeMillis(),
    val serverName: String,
    val ipAddress: String,
    val protocol: String, // WireGuard or OpenVPN
    val bytesSent: Long,
    val bytesReceived: Long,
    val durationSeconds: Long,
    val status: String // CONNECTED, DISCONNECTED, FAILED
)

@Entity(tableName = "vpn_servers")
data class VpnServer(
    @PrimaryKey val id: String,
    val name: String,
    val country: String,
    val flagEmoji: String,
    val ipAddress: String,
    val pingsMs: Int,
    val loadPercentage: Int,
    val isPremium: Boolean,
    val requiredTier: String, // FREE, STANDARD, PREMIUM
    val protocolSupported: String, // WireGuard, OpenVPN, Both
    val isActive: Boolean = true
)
