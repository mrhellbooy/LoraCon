package com.example.ui.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import com.example.ui.AppTheme

val LocalAppTheme = staticCompositionLocalOf { AppTheme.IMMERSIVE }

val ObsidianBlack: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF090D14)
        AppTheme.IMMERSIVE -> Color(0xFF050505)
        AppTheme.LIGHT_SYNC -> Color(0xFFF8FAFC)
    }

val DarkSteel: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF111723)
        AppTheme.IMMERSIVE -> Color(0xFF111111)
        AppTheme.LIGHT_SYNC -> Color(0xFFE2E8F0)
    }

val CardGray: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF1B2333)
        AppTheme.IMMERSIVE -> Color(0xFF111111)
        AppTheme.LIGHT_SYNC -> Color(0xFFE2E8F0)
    }

val CyberEmerald: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF10B981)
        AppTheme.IMMERSIVE -> Color(0xFF00FF00)
        AppTheme.LIGHT_SYNC -> Color(0xFF22C55E)
    }

val AccentMint: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF34D399)
        AppTheme.IMMERSIVE -> Color(0xFF34D399)
        AppTheme.LIGHT_SYNC -> Color(0xFF4ADE80)
    }

val ElectricCyan: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF06B6D4)
        AppTheme.IMMERSIVE -> Color(0xFF10B981)
        AppTheme.LIGHT_SYNC -> Color(0xFF0284C7)
    }

val TechPurple: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF8B5CF6)
        AppTheme.IMMERSIVE -> Color(0xFF8B5CF6)
        AppTheme.LIGHT_SYNC -> Color(0xFF7C3AED)
    }

val SignalOrange: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFFF97316)
        AppTheme.IMMERSIVE -> Color(0xFFF97316)
        AppTheme.LIGHT_SYNC -> Color(0xFFEA580C)
    }

val WarningRed: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFFEF4444)
        AppTheme.IMMERSIVE -> Color(0xFFEF4444)
        AppTheme.LIGHT_SYNC -> Color(0xFFDC2626)
    }

val TextPrimary: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFFF3F4F6)
        AppTheme.IMMERSIVE -> Color(0xFFF1F5F9)
        AppTheme.LIGHT_SYNC -> Color(0xFF0F172A)
    }

val TextSecondary: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF9CA3AF)
        AppTheme.IMMERSIVE -> Color(0xFF94A3B8)
        AppTheme.LIGHT_SYNC -> Color(0xFF475569)
    }

val TextMuted: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF6B7280)
        AppTheme.IMMERSIVE -> Color(0xFF64748B)
        AppTheme.LIGHT_SYNC -> Color(0xFF64748B)
    }

val BorderColor: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0x15FFFFFF)
        AppTheme.IMMERSIVE -> Color(0x15FFFFFF)
        AppTheme.LIGHT_SYNC -> Color(0x15000000)
    }

val BorderColorMedium: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0x22FFFFFF)
        AppTheme.IMMERSIVE -> Color(0x22FFFFFF)
        AppTheme.LIGHT_SYNC -> Color(0x22000000)
    }

val BorderColorHigh: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0x33FFFFFF)
        AppTheme.IMMERSIVE -> Color(0x33FFFFFF)
        AppTheme.LIGHT_SYNC -> Color(0x33000000)
    }

val CardSelectedBg: Color
    @Composable
    get() = when (LocalAppTheme.current) {
        AppTheme.OBSIDIAN -> Color(0xFF0C191D)
        AppTheme.IMMERSIVE -> Color(0xFF0C191D)
        AppTheme.LIGHT_SYNC -> Color(0xFFDCFCE7)
    }

