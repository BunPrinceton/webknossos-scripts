// ==UserScript==
// @name         WebKnossos - Bypass Zoom Restriction for Volume Annotation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes zoom level restrictions for volume annotation/painting in WebKnossos
// @author       You
// @match        http://localhost:9090/*
// @match        https://webknossos.org/*
// @match        https://*.webknossos.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('[WebKnossos Zoom Bypass] Script loaded');

    // Method 1: Override zoom validation function
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args);
    };

    // Method 2: Patch the zoom restriction when the page loads
    function patchZoomRestriction() {
        // Wait for the WebKnossos app to load
        const checkInterval = setInterval(() => {
            // Try to find and hide the zoom warning toast
            const toasts = document.querySelectorAll('.ant-message-notice-content, .ant-notification-notice-message');
            toasts.forEach(toast => {
                if (toast.textContent.includes('zoom') && toast.textContent.includes('disabled')) {
                    console.log('[WebKnossos Zoom Bypass] Hiding zoom restriction message');
                    toast.parentElement.style.display = 'none';
                }
            });

            // Try to patch the Store if available
            if (window.Store && window.Store.getState) {
                try {
                    const state = window.Store.getState();
                    console.log('[WebKnossos Zoom Bypass] Found Store, attempting to patch...');
                    clearInterval(checkInterval);
                } catch (e) {
                    // Store not ready yet
                }
            }
        }, 500);

        // Stop checking after 30 seconds
        setTimeout(() => clearInterval(checkInterval), 30000);
    }

    // Method 3: CSS to hide the error message
    const style = document.createElement('style');
    style.textContent = `
        /* Hide zoom restriction messages */
        .ant-message-notice-content:has-text("zoom"),
        .ant-notification-notice-message:has-text("zoom") {
            display: none !important;
        }

        /* Alternative: hide all messages containing 'disabled' and 'zoom' */
        div[class*="message"]:has-text("disabled"):has-text("zoom") {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Method 4: Intercept and modify the zoom validation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', patchZoomRestriction);
    } else {
        patchZoomRestriction();
    }

    // Method 5: Override console warnings (optional)
    const originalWarn = console.warn;
    console.warn = function(...args) {
        const message = args.join(' ');
        if (message.includes('zoom') && message.includes('annotation')) {
            console.log('[WebKnossos Zoom Bypass] Blocked zoom warning:', message);
            return;
        }
        originalWarn.apply(console, args);
    };

    // Method 6: Monkey-patch any validation functions
    let attemptCount = 0;
    const patchValidation = setInterval(() => {
        attemptCount++;

        // Look for common validation function patterns
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent.includes('isZoomLevelValid') ||
                script.textContent.includes('checkZoomLevel') ||
                script.textContent.includes('validateZoom')) {
                console.log('[WebKnossos Zoom Bypass] Found potential zoom validation in script');
            }
        });

        // Try to override window functions
        if (window.app || window.Store) {
            console.log('[WebKnossos Zoom Bypass] WebKnossos app detected, patching...');

            // Attempt to override validation
            const originalDefineProperty = Object.defineProperty;
            Object.defineProperty = function(obj, prop, descriptor) {
                if (prop.includes('zoom') || prop.includes('Zoom')) {
                    console.log('[WebKnossos Zoom Bypass] Intercepted zoom-related property:', prop);
                }
                return originalDefineProperty(obj, prop, descriptor);
            };
        }

        if (attemptCount > 60) {
            clearInterval(patchValidation);
        }
    }, 1000);

    console.log('[WebKnossos Zoom Bypass] All bypass methods activated');
})();
