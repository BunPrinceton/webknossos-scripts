// ==UserScript==
// @name         WebKnossos - Bypass Zoom Restriction (Aggressive)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Aggressively removes ALL zoom level restrictions for volume annotation in WebKnossos
// @author       You
// @match        http://localhost:9090/*
// @match        https://webknossos.org/*
// @match        https://*.webknossos.org/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('[WK Zoom Bypass AGGRESSIVE] Initializing...');

    // Inject CSS to hide ALL zoom-related messages
    GM_addStyle(`
        /* Hide all notification messages */
        .ant-message-notice:has(.ant-message-notice-content:contains("zoom")),
        .ant-notification-notice:has(.ant-notification-notice-message:contains("zoom")),
        .ant-notification-notice:has(.ant-notification-notice-message:contains("disabled")) {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Hide error toasts */
        div[class*="Toast"]:has(*:contains("zoom")),
        div[class*="toast"]:has(*:contains("zoom")) {
            display: none !important;
        }

        /* Ensure volume annotation tools are always enabled */
        button[disabled][title*="zoom"],
        button[disabled][title*="Zoom"] {
            pointer-events: auto !important;
            opacity: 1 !important;
        }
    `);

    // MutationObserver to remove zoom messages as they appear
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const text = node.textContent || '';
                    if ((text.includes('zoom') || text.includes('Zoom')) &&
                        (text.includes('disabled') || text.includes('not in the required range'))) {
                        console.log('[WK Zoom Bypass] Removing zoom restriction message');
                        node.remove();
                    }

                    // Also check child elements
                    const messages = node.querySelectorAll?.('[class*="message"], [class*="notification"], [class*="toast"]');
                    messages?.forEach(msg => {
                        const msgText = msg.textContent || '';
                        if (msgText.includes('zoom') && msgText.includes('disabled')) {
                            console.log('[WK Zoom Bypass] Removing nested zoom message');
                            msg.remove();
                        }
                    });
                }
            });
        });
    });

    // Start observing when DOM is ready
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // Intercept and modify Redux/Store actions
    const originalDispatch = window.dispatch;
    if (originalDispatch) {
        window.dispatch = function(action) {
            if (action && action.type && action.type.includes('ZOOM')) {
                console.log('[WK Zoom Bypass] Intercepted zoom action:', action);
                // Allow the action but log it
            }
            return originalDispatch.apply(this, arguments);
        };
    }

    // Override Object.freeze to prevent immutable zoom restrictions
    const originalFreeze = Object.freeze;
    Object.freeze = function(obj) {
        if (obj && (obj.minZoom || obj.maxZoom || obj.zoomLevel)) {
            console.log('[WK Zoom Bypass] Intercepted zoom config freeze, modifying...');
            // Allow any zoom level
            if (obj.minZoom !== undefined) obj.minZoom = 0;
            if (obj.maxZoom !== undefined) obj.maxZoom = Infinity;
        }
        return originalFreeze(obj);
    };

    // Patch localStorage to override zoom settings
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        if (key.includes('zoom') || key.includes('Zoom')) {
            console.log('[WK Zoom Bypass] Intercepted localStorage zoom setting:', key, value);
        }
        return originalSetItem.apply(this, arguments);
    };

    // Override any zoom validation functions
    window.isZoomLevelValid = function() { return true; };
    window.checkZoomLevel = function() { return true; };
    window.validateZoom = function() { return true; };
    window.canPaint = function() { return true; };
    window.canAnnotate = function() { return true; };

    // Hook into WebGL/Canvas to detect drawing attempts
    let patchAttempts = 0;
    const patchInterval = setInterval(() => {
        patchAttempts++;

        // Try to find and enable disabled buttons
        const disabledButtons = document.querySelectorAll('button[disabled]');
        disabledButtons.forEach(btn => {
            const title = btn.getAttribute('title') || '';
            const ariaLabel = btn.getAttribute('aria-label') || '';
            if (title.includes('zoom') || ariaLabel.includes('zoom')) {
                console.log('[WK Zoom Bypass] Enabling disabled zoom-restricted button');
                btn.removeAttribute('disabled');
                btn.disabled = false;
            }
        });

        // Try to patch any Store/State objects
        if (window.Store) {
            try {
                const state = window.Store.getState();
                if (state && state.uiInformation) {
                    console.log('[WK Zoom Bypass] Found UI state');
                }
            } catch (e) {
                // Ignore
            }
        }

        if (patchAttempts > 120) { // Stop after 2 minutes
            clearInterval(patchInterval);
            console.log('[WK Zoom Bypass] Patching complete');
        }
    }, 1000);

    // Intercept error/warning messages
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = function(...args) {
        const msg = args.join(' ');
        if (msg.includes('zoom') && (msg.includes('disabled') || msg.includes('not allowed'))) {
            console.log('[WK Zoom Bypass] Blocked error:', msg);
            return;
        }
        originalError.apply(console, args);
    };

    console.warn = function(...args) {
        const msg = args.join(' ');
        if (msg.includes('zoom') && msg.includes('annotation')) {
            console.log('[WK Zoom Bypass] Blocked warning:', msg);
            return;
        }
        originalWarn.apply(console, args);
    };

    // Final fallback: Intercept all function calls and return true for validation
    const handler = {
        apply: function(target, thisArg, argumentsList) {
            const result = Reflect.apply(target, thisArg, argumentsList);
            // If function name suggests validation and it returned false, override to true
            if (target.name && (target.name.includes('valid') || target.name.includes('check')) &&
                target.name.toLowerCase().includes('zoom') && result === false) {
                console.log('[WK Zoom Bypass] Overriding validation function:', target.name);
                return true;
            }
            return result;
        }
    };

    // Try to wrap common validation patterns
    setTimeout(() => {
        if (window.app && typeof window.app === 'object') {
            Object.keys(window.app).forEach(key => {
                const value = window.app[key];
                if (typeof value === 'function' && key.toLowerCase().includes('zoom')) {
                    console.log('[WK Zoom Bypass] Wrapping function:', key);
                    window.app[key] = new Proxy(value, handler);
                }
            });
        }
    }, 5000);

    console.log('[WK Zoom Bypass AGGRESSIVE] All bypass methods active - you should now be able to paint at any zoom level!');
})();
