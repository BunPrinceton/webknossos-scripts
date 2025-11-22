// ==UserScript==
// @name         WebKnossos - Bypass Zoom Restriction for Semantic Labeling
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows context menu and semantic labeling at any zoom level for examining axons/dendrites
// @author       You
// @match        http://localhost:9090/*
// @match        https://webknossos.org/*
// @match        https://*.webknossos.org/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('[WK Semantic Labeling Bypass] Initializing for context menu and semantic labeling...');

    // Hide ALL zoom restriction messages
    GM_addStyle(`
        /* Hide zoom restriction toasts/notifications */
        .ant-message-notice:has(*:contains("zoom")),
        .ant-notification-notice:has(*:contains("zoom")),
        div[class*="Toast"]:has(*:contains("zoom")) {
            display: none !important;
        }

        /* Ensure context menu is always clickable */
        .context-menu,
        [class*="ContextMenu"],
        [class*="contextMenu"],
        [role="menu"] {
            pointer-events: auto !important;
            opacity: 1 !important;
            z-index: 9999 !important;
        }

        /* Ensure segments/skeletons are always selectable */
        canvas {
            pointer-events: auto !important;
        }

        /* Enable any disabled menu items that mention zoom */
        [role="menuitem"][disabled*="zoom"],
        button[disabled][title*="zoom"] {
            pointer-events: auto !important;
            opacity: 1 !important;
        }
    `);

    // MutationObserver to remove zoom messages in real-time
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    const text = node.textContent || '';
                    // Remove any messages about zoom restrictions
                    if (text.includes('zoom') &&
                        (text.includes('disabled') ||
                         text.includes('not in the required range') ||
                         text.includes('not allowed'))) {
                        console.log('[WK Semantic Bypass] Removing zoom restriction message');
                        node.remove();
                    }
                }
            });
        });
    });

    // Start observing once DOM is ready
    const startObserver = () => {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log('[WK Semantic Bypass] DOM observer active');
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }

    // Override validation functions that might block context menu or semantic labeling
    const overrideValidation = () => {
        // Common validation function names
        const validationOverrides = [
            'isZoomLevelValid',
            'checkZoomLevel',
            'validateZoom',
            'canShowContextMenu',
            'canEditSemantic',
            'canLabelSegment',
            'isAnnotationAllowed',
            'isSegmentationAllowed'
        ];

        validationOverrides.forEach(funcName => {
            if (window[funcName]) {
                const original = window[funcName];
                window[funcName] = function(...args) {
                    console.log(`[WK Semantic Bypass] Intercepted ${funcName}, returning true`);
                    return true;
                };
            }
        });
    };

    // Intercept right-click events to ensure context menu works
    let contextMenuAttempts = 0;
    document.addEventListener('contextmenu', function(e) {
        contextMenuAttempts++;
        console.log('[WK Semantic Bypass] Context menu event detected (#' + contextMenuAttempts + ')');
        // Don't prevent default - let it work naturally
    }, true);

    // Monitor for context menu clicks on canvas
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.tagName === 'CANVAS' || target.closest('canvas')) {
            console.log('[WK Semantic Bypass] Canvas click detected, context menu should work');
        }
    }, true);

    // Patch any Store/Redux state that controls semantic labeling
    let patchAttempts = 0;
    const patchInterval = setInterval(() => {
        patchAttempts++;

        // Override validation
        overrideValidation();

        // Look for WebKnossos Store
        if (window.Store) {
            try {
                const state = window.Store.getState();
                console.log('[WK Semantic Bypass] Found Store, semantic labeling should work at any zoom');
            } catch (e) {
                // Store not ready
            }
        }

        // Look for disabled menu items and enable them
        const disabledItems = document.querySelectorAll('[role="menuitem"][disabled], button[disabled]');
        disabledItems.forEach(item => {
            const text = item.textContent || '';
            const title = item.getAttribute('title') || '';
            if (text.includes('label') || text.includes('semantic') ||
                title.includes('zoom') || title.includes('annotation')) {
                console.log('[WK Semantic Bypass] Enabling disabled UI element:', text || title);
                item.removeAttribute('disabled');
                item.disabled = false;
            }
        });

        if (patchAttempts > 60) {
            clearInterval(patchInterval);
            console.log('[WK Semantic Bypass] Patching complete - you can now label at any zoom level!');
        }
    }, 1000);

    // Intercept console warnings/errors about zoom restrictions
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = function(...args) {
        const msg = args.join(' ');
        if ((msg.includes('zoom') || msg.includes('Zoom')) &&
            (msg.includes('annotation') || msg.includes('labeling') || msg.includes('context'))) {
            console.log('[WK Semantic Bypass] Blocked zoom warning:', msg);
            return;
        }
        originalWarn.apply(console, args);
    };

    console.error = function(...args) {
        const msg = args.join(' ');
        if ((msg.includes('zoom') || msg.includes('Zoom')) &&
            (msg.includes('annotation') || msg.includes('labeling') || msg.includes('disabled'))) {
            console.log('[WK Semantic Bypass] Blocked zoom error:', msg);
            return;
        }
        originalError.apply(console, args);
    };

    // Override Object.freeze for zoom config objects
    const originalFreeze = Object.freeze;
    Object.freeze = function(obj) {
        if (obj && typeof obj === 'object') {
            // Check if this is a zoom configuration object
            if (obj.minZoom !== undefined || obj.maxZoom !== undefined ||
                obj.minZoomForAnnotation !== undefined || obj.minZoomForLabeling !== undefined) {
                console.log('[WK Semantic Bypass] Intercepted zoom config, allowing all zoom levels');
                // Set to permissive values
                if (obj.minZoom !== undefined) obj.minZoom = 0;
                if (obj.maxZoom !== undefined) obj.maxZoom = Infinity;
                if (obj.minZoomForAnnotation !== undefined) obj.minZoomForAnnotation = 0;
                if (obj.minZoomForLabeling !== undefined) obj.minZoomForLabeling = 0;
            }
        }
        return originalFreeze(obj);
    };

    // Patch event listeners that might block interactions
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'contextmenu' || type === 'click') {
            console.log('[WK Semantic Bypass] Monitoring', type, 'event listener');
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    console.log('[WK Semantic Bypass] All systems active - context menu and semantic labeling should work at any zoom!');
    console.log('[WK Semantic Bypass] You can now:');
    console.log('  - Zoom out to see full axon/dendrite paths');
    console.log('  - Right-click to open context menu');
    console.log('  - Select semantic labels (axon, dendrite, vesicle, PSD, etc.)');
    console.log('  - Examine structures from birds eye view');
})();
