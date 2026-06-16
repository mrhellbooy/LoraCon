package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.ui.LoraConApp
import com.example.ui.VpnViewModel
import com.example.ui.AppTheme
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.ObsidianBlack

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import com.example.ui.theme.LocalAppTheme

class MainActivity : ComponentActivity() {
    private val viewModel: VpnViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val appTheme by viewModel.currentTheme.collectAsState()
            
            CompositionLocalProvider(LocalAppTheme provides appTheme) {
                MyApplicationTheme(darkTheme = appTheme != AppTheme.LIGHT_SYNC) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = ObsidianBlack
                    ) {
                        LoraConApp(viewModel = viewModel)
                    }
                }
            }
        }
    }
}
