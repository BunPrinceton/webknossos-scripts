// ==UserScript==
// @name         WK Quick Rename - Keyboard Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Press 1-9, Q, W, E to select semantic labels from WK Quick Rename context menu
// @author       Bun
// @match        *://webknossos.org/*
// @match        *://*.webknossos.org/*
// @match        *://wk.zetta.ai:9000/*
// @match        *://wk.zetta.ai/*
// @match        *://localhost:9090/*
// @match        *://127.0.0.1:9090/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.log('[WK Keyboard Shortcuts] Loaded');

    // Key mapping: 1-9 for first 9 items, then Q, W, E for items 10-12
    const KEY_MAP = {
        '1': 0, '2': 1, '3': 2, '4': 3, '5': 4,
        '6': 5, '7': 6, '8': 7, '9': 8,
        'q': 9, 'Q': 9,
        'w': 10, 'W': 10,
        'e': 11, 'E': 11
    };

    const KEY_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q', 'W', 'E'];

    let menuLabeled = false;

    // Watch for menu appearing and add keyboard hints
    const observer = new MutationObserver(() => {
        const menu = document.getElementById('wk-segment-context-menu');
        if (menu && menu.style.display !== 'none' && !menuLabeled) {
            const menuItems = menu.querySelectorAll('.wk-context-menu-item');

            menuItems.forEach((item, index) => {
                if (index < KEY_LABELS.length) {
                    // Check if hint already exists
                    if (!item.querySelector('.wk-keyboard-hint')) {
                        const hint = document.createElement('span');
                        hint.className = 'wk-keyboard-hint';
                        hint.textContent = KEY_LABELS[index];
                        hint.style.cssText = `
                            float: right;
                            margin-left: 16px;
                            padding: 2px 6px;
                            background: rgba(0, 0, 0, 0.1);
                            border-radius: 3px;
                            font-family: monospace;
                            font-size: 11px;
                            font-weight: bold;
                            color: #666;
                        `;
                        item.appendChild(hint);
                    }
                }
            });

            menuLabeled = true;
            console.log('[WK Keyboard Shortcuts] Added keyboard hints to menu');
        } else if (!menu || menu.style.display === 'none') {
            menuLabeled = false;
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Keyboard event listener - CAPTURE PHASE to intercept before WebKnossos
    document.addEventListener('keydown', function(e) {
        // Check if WK Quick Rename context menu is open
        const menu = document.getElementById('wk-segment-context-menu');
        if (!menu || menu.style.display === 'none') {
            return; // Menu not open, let WebKnossos handle keys
        }

        // Get all menu items
        const menuItems = menu.querySelectorAll('.wk-context-menu-item');
        if (menuItems.length === 0) {
            return;
        }

        // Check if the pressed key is mapped
        const index = KEY_MAP[e.key];
        if (index !== undefined && index < menuItems.length) {
            // STOP WebKnossos from handling this key
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            // Click the menu item
            menuItems[index].click();

            console.log('[WK Keyboard Shortcuts] Clicked item', e.key.toUpperCase(), ':', menuItems[index].textContent);
        }
    }, true); // TRUE = capture phase (runs before WebKnossos handlers)

    console.log('[WK Keyboard Shortcuts] Ready - Press 1-9, Q, W, E when menu is open');
})();
