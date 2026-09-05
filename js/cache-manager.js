// Cache Manager for KTP Website
// Handles font caching and resource preloading

class CacheManager {
    constructor() {
        this.fontCache = new Map();
        this.cssCache = new Map();
        this.init();
    }

    init() {
        // Check if fonts are already cached
        this.loadCachedFonts();
        this.preloadCriticalResources();
    }

    // Cache fonts locally
    async cacheFont(fontUrl, fontFamily) {
        try {
            const cached = localStorage.getItem(`font-${fontFamily}`);
            if (cached) {
                this.injectFont(cached, fontFamily);
                return;
            }

            const response = await fetch(fontUrl);
            const fontData = await response.text();
            
            // Store in localStorage
            localStorage.setItem(`font-${fontFamily}`, fontData);
            this.injectFont(fontData, fontFamily);
            
        } catch (error) {
            console.log('Font caching failed, using fallback:', error);
            this.loadFallbackFont(fontFamily);
        }
    }

    injectFont(fontData, fontFamily) {
        if (!document.querySelector(`#cached-${fontFamily}`)) {
            const style = document.createElement('style');
            style.id = `cached-${fontFamily}`;
            style.textContent = fontData;
            document.head.appendChild(style);
        }
    }

    loadFallbackFont(fontFamily) {
        // Load from Google Fonts as fallback
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
        document.head.appendChild(link);
    }

    loadCachedFonts() {
        // Try to load Roboto from cache
        const cachedRoboto = localStorage.getItem('font-Roboto');
        if (cachedRoboto) {
            this.injectFont(cachedRoboto, 'Roboto');
            // This script runs in <head>, so <body> may not exist yet.
            const markLoaded = () => document.body && document.body.classList.add('fonts-loaded');
            if (document.body) markLoaded(); else document.addEventListener('DOMContentLoaded', markLoaded);
        } else {
            // Cache it for next time
            this.cacheFont('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', 'Roboto');
        }
    }

    preloadCriticalResources() {
        const criticalResources = [
            'css/footer-styles/footer.css',
            'js/header.js',
            'js/footer.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    // Clear cache if needed
    clearCache() {
        const fontKeys = Object.keys(localStorage).filter(key => key.startsWith('font-'));
        fontKeys.forEach(key => localStorage.removeItem(key));
    }

    // Check cache size and clean if needed
    manageCacheSize() {
        try {
            const usage = JSON.stringify(localStorage).length;
            const maxSize = 5 * 1024 * 1024; // 5MB limit
            
            if (usage > maxSize) {
                console.log('Cache size exceeded, clearing old entries');
                this.clearCache();
            }
        } catch (error) {
            console.log('Cache management error:', error);
        }
    }
}

// Initialize cache manager
const cacheManager = new CacheManager();

// Export for use in other files
window.CacheManager = cacheManager; 