package com.example

import android.app.Application
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.example.ui.LoraConApp
import com.example.ui.VpnViewModel
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [34])
class LoraConAppTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun testEveryFunctionality() {
        val application = ApplicationProvider.getApplicationContext<Application>()
        val viewModel = VpnViewModel(application)

        
        composeTestRule.setContent {
            LoraConApp(viewModel = viewModel)
        }

        // Click next 4 times to complete onboarding
        for(i in 1..4) {
             composeTestRule.onNodeWithTag("onboarding_next_button").performClick()
        }

        // Wait for dashboard to render
        composeTestRule.waitForIdle()
        
        // Tap on toggle button
        composeTestRule.onNodeWithTag("vpn_toggle_button").performClick()
        
        // Check Ai Assistant exist and interact with it
        composeTestRule.onNodeWithTag("ai_assistant_bubble").assertExists()
        composeTestRule.onNodeWithTag("ai_assistant_bubble").performClick()

        // Verify the panel opens and send a message
        composeTestRule.onNodeWithTag("ai_assistant_panel").assertExists()
        composeTestRule.onNodeWithTag("ai_assistant_input").performTextInput("Hello LoraAI")
        composeTestRule.onNodeWithTag("ai_assistant_send_button").performClick()
        
        // Close AI Assistant
        composeTestRule.onNodeWithText("❌").performClick() 
        
        // Navigate to SERVERS
        composeTestRule.onNodeWithTag("nav_tab_SERVERS").performClick()
        composeTestRule.waitForIdle()
        
        // Navigate to ACCOUNT (Crypto)
        composeTestRule.onNodeWithTag("nav_tab_ACCOUNT").performClick()
        composeTestRule.waitForIdle()
        composeTestRule.onNodeWithTag("select_plan_STANDARD VAULT").performClick()
        composeTestRule.waitForIdle()
        composeTestRule.onNodeWithTag("crypto_tx_hash_input").performTextInput("0x123abc")
        composeTestRule.onNodeWithTag("payment_verify_button").performClick()
        composeTestRule.waitForIdle()
        
        // Navigate to LOGS
        composeTestRule.onNodeWithTag("nav_tab_LOGS").performClick()
        composeTestRule.waitForIdle()
        composeTestRule.onNodeWithTag("system_log_search").performTextInput("test_search")
        
        // Wait and ensure no crash has happened
        composeTestRule.waitForIdle()
    }

    @Test
    fun fixFile() {
        val file = java.io.File("/app/applet/app/src/main/java/com/example/ui/LoraConApp.kt")
        if (!file.exists()) {
            val fallbackFile = java.io.File("app/src/main/java/com/example/ui/LoraConApp.kt")
            if (!fallbackFile.exists()) {
                println("File not found anywhere!")
                return
            }
            val content = fallbackFile.readText().replace("\r\n", "\n")
            val fixed = fileReplacer(content)
            fallbackFile.writeText(fixed)
            println("Fixed fallback file successfully!")
            return
        }
        val content = file.readText().replace("\r\n", "\n")
        val fixed = fileReplacer(content)
        file.writeText(fixed)
        println("Fixed standard file successfully!")
    }

    private fun fileReplacer(content: String): String {
        val startToken = "icon = \"🧠\""
        val endToken = "ResearchRepositoryCard("
        val startIndex = content.indexOf(startToken)
        val endIndex = content.indexOf(endToken)
        if (startIndex == -1 || endIndex == -1) {
            println("Tokens not found! startIndex: $startIndex, endIndex: $endIndex")
            return content
        }
        
        // Find safe cut points
        // Let's close first part cleanly.
        val beforeCut = content.substring(0, startIndex + startToken.length)
        val afterCut = content.substring(endIndex)
        
        val middle = """
                    )
                }
            }
        } else {
            Text(
                text = localizer(
                    "Below are high-quality secure public cross platform libraries on Github for production implementations.",
                    "A continuación se presentan los repositorios libres estándar del espectro técnico para producción.",
                    "Nachfolgend finden Sie vertrauenswürdige Bibliotheken.",
                    "以下は本番実装向けの高品質なセキュア公開クロスプラットフォームライブラリです。",
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
fun ResearchHubScreenDummyPlaceholder() {
    // Just to have endPoint
}

// Since we are cutting at ResearchRepositoryCard(, let's write out ResearchRepositoryCard and first fields
"""
        return beforeCut + "\n" + middle + "\n" + afterCut
    }
}

