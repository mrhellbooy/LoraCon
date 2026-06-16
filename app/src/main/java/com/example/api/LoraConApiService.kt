package com.example.api

import com.example.data.VpnServer
import retrofit2.http.GET

interface LoraConApiService {
    @GET("/api/admin/servers") // Assuming this endpoint provides the server list
    suspend fun getServers(): List<VpnServer>
}
