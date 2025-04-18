package com.kazicash.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebChromeClient
import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)
        
        // Keep the splash screen visible for longer
        splashScreen.setKeepOnScreenCondition { false }
        
        setContentView(R.layout.activity_main)
        
        webView = findViewById(R.id.webview)
        setupWebView()
    }
    
    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            setSupportZoom(true)
        }
        
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                // Check network connection when page finishes loading
                if (!isNetworkAvailable()) {
                    // Inject JavaScript to show offline mode
                    val javascript = "window.isOnline = false; if (window.dispatchEvent) { window.dispatchEvent(new CustomEvent('connection-change', { detail: { online: false } })); }"
                    webView.evaluateJavascript(javascript, null)
                    Toast.makeText(this@MainActivity, "You're offline. Some features may be limited.", Toast.LENGTH_SHORT).show()
                } else {
                    val javascript = "window.isOnline = true; if (window.dispatchEvent) { window.dispatchEvent(new CustomEvent('connection-change', { detail: { online: true } })); }"
                    webView.evaluateJavascript(javascript, null)
                }
            }
        }
        
        webView.webChromeClient = WebChromeClient()
        
        // Load the app - For production, this would be a local HTML file
        // For development, load from your development server
        webView.loadUrl("file:///android_asset/index.html")
    }
    
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    private fun isNetworkAvailable(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val activeNetwork = connectivityManager.getNetworkCapabilities(network) ?: return false
        
        return when {
            activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true
            activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true
            activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> true
            else -> false
        }
    }
}
