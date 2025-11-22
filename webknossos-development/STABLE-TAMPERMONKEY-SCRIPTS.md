# WebKnossos Stable Tampermonkey Scripts

## Production-Ready Scripts

### 1. WK Quick Rename v2.4.0 ⭐ STABLE
**File:** `D:\1337\DO_NOT_TOUCH\webknossos-wk-quick-rename-v2.4.0-STABLE.user.js`

**Purpose:** Fast segment renaming with semantic labels

**Features:**
- Right-click segments to open custom context menu
- 12 semantic types with emojis:
  - 🌲 Dendrite
  - ⚡ Axon
  - 🧬 Soma
  - 🥜 Nucleus
  - 🐙 Glia
  - ⚪ Extracellular Space
  - 🍩 Myelin
  - ❤️ Blood Vessel
  - 🍔 Fat Globule
  - 💔 Tear
  - 🔀 Merge Between Classes
  - ❓ Uncertain
- React-compatible input handling
- Scroll-to-find functionality
- Works in both list view and 2D view

**Keyboard Support:**
- ESC - Close menu
- (Mouse only for selection in stable version)

**Status:** ✅ Production stable, battle-tested

---

### 2. WK Volume Opacity Toggle v1.0.0 ⭐ STABLE
**File:** `D:\1337\DO_NOT_TOUCH\webknossos-volume-opacity-toggle.user.js`

**Purpose:** Quick toggle volume layer visibility while annotating

**Features:**
- **Keyboard shortcut:** Ctrl+Shift+O
- Toggles between opacity 1 (fully visible) and saved lower value
- Remembers your preferred opacity setting
- Visual notifications when toggling
- Automatically finds volume layer slider

**Workflow:**
1. Set volume opacity to your preferred value (e.g., 0.3)
2. Press Ctrl+Shift+O to toggle to 100% when you need to see volume clearly
3. Press Ctrl+Shift+O again to return to your preferred opacity

**Status:** ✅ Production stable, perfect as-is

---

### 3. WK Quick Rename - Keyboard Shortcuts v1.1 ✨ STABLE ENOUGH
**File:** `D:\1337\webknossos-development\wk-quick-rename-keyboard-shortcuts.user.js`

**Purpose:** Add keyboard shortcuts to WK Quick Rename context menu

**Features:**
- Number keys 1-9 for first 9 semantic labels
- Q, W, E for remaining labels (10-12)
- Visual keyboard hints on each menu item
- Only active when menu is open (doesn't interfere with WebKnossos)
- Intercepts keys in capture phase to prevent conflicts

**Key Mapping:**
```
1 = 🌲 Dendrite
2 = ⚡ Axon
3 = 🧬 Soma
4 = 🥜 Nucleus
5 = 🐙 Glia
6 = ⚪ Extracellular Space
7 = 🍩 Myelin
8 = ❤️ Blood Vessel
9 = 🍔 Fat Globule
Q = 💔 Tear
W = 🔀 Merge Between Classes
E = ❓ Uncertain
```

**Usage:**
1. Install BOTH scripts:
   - WK Quick Rename v2.4.0 (provides the menu)
   - WK Quick Rename - Keyboard Shortcuts v1.1 (adds keys)
2. Right-click segment
3. Press number key or Q/W/E

**Status:** ✨ Working perfectly, needs more field testing before moving to DO_NOT_TOUCH

---

## Installation Order

1. **Install stable scripts first:**
   - WK Quick Rename v2.4.0
   - WK Volume Opacity Toggle v1.0.0

2. **Add keyboard shortcuts (optional):**
   - WK Quick Rename - Keyboard Shortcuts v1.1

All scripts use same @match patterns and run on all WebKnossos instances.

---

## Development Scripts (NOT STABLE)

These are experimental and in `webknossos-development/`:

- `bypass-semantic-labeling-restriction.user.js` - Zoom bypass (untested)
- `bypass-zoom-restriction.user.js` - Zoom bypass (untested)
- `bypass-zoom-restriction-aggressive.user.js` - Zoom bypass (untested)

**Do not use in production.**

---

## Workflow Recommendation

### For Daily Annotation Work:
1. **WK Quick Rename v2.4.0** - Essential for semantic labeling
2. **WK Volume Opacity Toggle v1.0.0** - Essential for viewing layers
3. **Keyboard Shortcuts v1.1** - Optional, reduces hand fatigue

### Combined Workflow:
```
1. Right-click segment (opens menu with keyboard hints)
2. Press number key to select label (e.g., 2 for Axon)
3. If need to see volume: Ctrl+Shift+O
4. Continue annotating
5. Ctrl+Shift+O to restore preferred opacity
```

**Result:** Minimal mouse movement, less hand fatigue, faster annotation.

---

## Version History

| Script | Version | Date | Status |
|--------|---------|------|--------|
| WK Quick Rename | 2.4.0 | 2025-11-18 | ✅ Stable |
| WK Volume Opacity Toggle | 1.0.0 | Unknown | ✅ Stable |
| WK Keyboard Shortcuts | 1.1 | 2025-11-21 | ✨ Testing |

---

## Moving to Production

**Criteria for DO_NOT_TOUCH folder:**
1. ✅ Tested in real annotation sessions
2. ✅ No bugs found after 1+ week of use
3. ✅ Does not interfere with other scripts
4. ✅ Works across all WebKnossos instances
5. ✅ Documentation complete

**When keyboard shortcuts v1.1 is ready:**
```bash
cp wk-quick-rename-keyboard-shortcuts.user.js ../DO_NOT_TOUCH/wk-quick-rename-keyboard-shortcuts-v1.1-STABLE.user.js
```
