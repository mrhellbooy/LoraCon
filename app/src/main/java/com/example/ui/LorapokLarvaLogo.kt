package com.example.ui

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import com.example.ui.theme.CyberEmerald
import com.example.ui.theme.DarkSteel
import com.example.ui.theme.ObsidianBlack
import com.example.ui.theme.SignalOrange

@Composable
fun LorapokLarvaLogo(
    isConnecting: Boolean,
    isConnected: Boolean,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "larva_pulse")
    
    // Breathing animation for the segments
    val breathScale by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(
            animation = tween(if (isConnecting) 800 else if (isConnected) 1500 else 2500, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "breath"
    )

    // Eye glow intensity
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = if (isConnected) 0.6f else 0.2f,
        targetValue = if (isConnected) 1.0f else 0.4f,
        animationSpec = infiniteRepeatable(
            animation = tween(if (isConnecting) 400 else 1000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "glow"
    )
    
    // Leg movement for active processing simulation
    val legRotation by infiniteTransition.animateFloat(
        initialValue = -5f,
        targetValue = 5f,
        animationSpec = infiniteRepeatable(
            animation = tween(if (isConnecting) 200 else 800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse   
        ),
        label = "leg_wiggle"
    )

    val neonColor = if (isConnected) CyberEmerald else if (isConnecting) SignalOrange else Color.Gray

    val darkSteelColor = DarkSteel
    val obsidianBlackColor = ObsidianBlack

    Canvas(modifier = modifier) {
        val centerX = size.width / 2
        val centerY = size.height / 2
        val larvaWidth = size.width * 0.45f
        
        // Draw Legs (little lines extending outward)
        var currentY = centerY - (larvaWidth * 0.4f)
        for (i in 1..3) {
            val legY = currentY + (larvaWidth * 0.3f * i)
            val legLength = larvaWidth * 0.15f
            val dx = legLength * (if (isConnecting) 1.2f else 1.0f)
            val dy = legLength * legRotation / 5f
            
            // Left leg
            drawLine(
                color = neonColor,
                start = Offset(centerX - (larvaWidth * 0.4f), legY),
                end = Offset(centerX - (larvaWidth * 0.4f) - dx, legY + dy),
                strokeWidth = 10f,
                cap = StrokeCap.Round
            )
            // Right leg
            drawLine(
                color = neonColor,
                start = Offset(centerX + (larvaWidth * 0.4f), legY),
                end = Offset(centerX + (larvaWidth * 0.4f) + dx, legY - dy),
                strokeWidth = 10f,
                cap = StrokeCap.Round
            )
        }

        // Draw the segments
        val segmentHeights = listOf(0.2f, 0.25f, 0.3f, 0.25f, 0.2f)
        val segmentWidths = listOf(0.6f, 0.8f, 1.0f, 0.8f, 0.5f)
        
        currentY = centerY - (larvaWidth * 0.4f)
        
        // Segmented Plump Body (Cybernetic armor plates)
        segmentHeights.forEachIndexed { index, prop ->
            val curWidth = larvaWidth * segmentWidths[index] * breathScale
            val curHeight = larvaWidth * prop * breathScale
            
            // Main Plate
            drawRoundRect(
                color = darkSteelColor,
                topLeft = Offset(centerX - curWidth / 2, currentY),
                size = Size(curWidth, curHeight),
                cornerRadius = CornerRadius(30f, 30f)
            )
            
            // Neon Plating outline
            drawRoundRect(
                color = neonColor.copy(alpha = 0.5f),
                topLeft = Offset(centerX - curWidth / 2, currentY),
                size = Size(curWidth, curHeight),
                cornerRadius = CornerRadius(30f, 30f),
                style = Stroke(width = 6f)
            )
            
            // Neon accent nodes
            drawCircle(
                color = neonColor.copy(alpha = glowAlpha),
                radius = 4f,
                center = Offset(centerX, currentY + curHeight / 2)
            )
            
            currentY += curHeight * 0.7f // Overlap
        }
        
        // head position Y
        val headY = centerY - (larvaWidth * 0.4f) + (larvaWidth * 0.1f)
        val eyeDistance = larvaWidth * 0.25f * breathScale
        val eyeRadius = larvaWidth * 0.15f
        
        // Glow
        drawCircle(
            color = neonColor.copy(alpha = glowAlpha * 0.3f),
            radius = eyeRadius * 1.5f,
            center = Offset(centerX - eyeDistance, headY)
        )
        drawCircle(
            color = neonColor.copy(alpha = glowAlpha * 0.3f),
            radius = eyeRadius * 1.5f,
            center = Offset(centerX + eyeDistance, headY)
        )
        
        // Core Eye (large round eyes)
        drawCircle(
            color = obsidianBlackColor,
            radius = eyeRadius,
            center = Offset(centerX - eyeDistance, headY)
        )
        drawCircle(
            color = obsidianBlackColor,
            radius = eyeRadius,
            center = Offset(centerX + eyeDistance, headY)
        )
        
        // Iris / neon pupil
        drawCircle(
            color = neonColor.copy(alpha = glowAlpha),
            radius = eyeRadius * 0.5f,
            center = Offset(centerX - eyeDistance + (eyeRadius * 0.1f), headY)
        )
        drawCircle(
            color = neonColor.copy(alpha = glowAlpha),
            radius = eyeRadius * 0.5f,
            center = Offset(centerX + eyeDistance + (eyeRadius * 0.1f), headY)
        )
        
        // Cute little antenna
        drawLine(
            color = neonColor,
            start = Offset(centerX - eyeDistance, headY - eyeRadius),
            end = Offset(centerX - eyeDistance - 20f, headY - eyeRadius - 30f + legRotation),
            strokeWidth = 6f,
            cap = StrokeCap.Round
        )
        drawLine(
            color = neonColor,
            start = Offset(centerX + eyeDistance, headY - eyeRadius),
            end = Offset(centerX + eyeDistance + 20f, headY - eyeRadius - 30f - legRotation),
            strokeWidth = 6f,
            cap = StrokeCap.Round
        )
    }
}
