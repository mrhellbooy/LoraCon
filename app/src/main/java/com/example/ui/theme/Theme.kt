package com.example.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = true,
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    val colorScheme = if (darkTheme) {
        darkColorScheme(
            primary = CyberEmerald,
            secondary = AccentMint,
            tertiary = ElectricCyan,
            background = ObsidianBlack,
            surface = DarkSteel,
            onPrimary = ObsidianBlack,
            onSecondary = ObsidianBlack,
            onTertiary = ObsidianBlack,
            onBackground = TextPrimary,
            onSurface = TextPrimary,
            surfaceVariant = CardGray,
            onSurfaceVariant = TextSecondary
        )
    } else {
        lightColorScheme(
            primary = CyberEmerald,
            secondary = AccentMint,
            tertiary = ElectricCyan,
            background = ObsidianBlack,
            surface = DarkSteel,
            onPrimary = ObsidianBlack,
            onSecondary = ObsidianBlack,
            onTertiary = ObsidianBlack,
            onBackground = TextPrimary,
            onSurface = TextPrimary,
            surfaceVariant = CardGray,
            onSurfaceVariant = TextSecondary
        )
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
