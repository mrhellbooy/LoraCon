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
}

