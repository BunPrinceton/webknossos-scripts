# WebKnossos - Semantic Labeling at Any Zoom Level

## The Problem

When examining large axons and dendrites in WebKnossos, you need to:
1. **Zoom out** to see the full path and structure (bird's eye view)
2. **Identify features** like vesicles or PSDs along the path
3. **Right-click** to open context menu
4. **Select semantic labels** (axon, dendrite, vesicle, PSD, etc.)

**But WebKnossos blocks this workflow** when you zoom out too far!

## The Solution

A Tampermonkey script that bypasses zoom restrictions specifically for:
- ✅ Context menu (right-click) at any zoom level
- ✅ Semantic labeling of segments/skeletons
- ✅ Examining structures from zoomed-out views
- ✅ Tracing full axon/dendrite paths

## Installation

### Step 1: Install Tampermonkey

Install Tampermonkey browser extension:
- **Chrome**: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- **Firefox**: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
- **Edge**: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

### Step 2: Add the Script

1. **Click Tampermonkey icon** in your browser toolbar
2. **Select "Dashboard"**
3. **Click "+"** tab (or "Create a new script" button)
4. **Copy the script**:
   - Open: `D:\1337\webknossos-development\bypass-semantic-labeling-restriction.user.js`
   - Select all (`Ctrl+A`)
   - Copy (`Ctrl+C`)
5. **Paste into Tampermonkey editor** (`Ctrl+V`)
6. **Save** (`Ctrl+S` or File → Save)

### Step 3: Verify Installation

In Tampermonkey dashboard, you should see:
- Script name: "WebKnossos - Bypass Zoom Restriction for Semantic Labeling"
- Status: **Enabled** (toggle should be ON/green)
- URL matches: localhost:9090, webknossos.org

## Usage Workflow

### Examining Axons and Dendrites

1. **Open your WebKnossos annotation task**
   - Navigate to http://localhost:9090 (or your instance)
   - Load your neuron tracing project

2. **Zoom Out** to see the full structure
   - Use mouse wheel or zoom controls
   - Get a bird's eye view of the axon/dendrite path
   - You should NOT see any zoom restriction errors

3. **Right-Click** on the structure
   - Context menu should appear (even when zoomed out)
   - Menu options should be enabled

4. **Select Semantic Label**
   - Choose from your labels: Axon, Dendrite, Vesicle, PSD, etc.
   - The label should be applied successfully

5. **Continue tracing** along the path
   - Examine for vesicles and PSDs
   - Label them as you find them
   - All from the comfortable zoomed-out view

## What the Script Does

### Removes Restrictions
- ✅ Hides zoom error messages
- ✅ Bypasses zoom level validation for semantic labeling
- ✅ Ensures context menu works at any zoom
- ✅ Enables disabled UI elements blocked by zoom restrictions

### Monitors in Real-Time
- 🔍 Watches for new error messages and removes them
- 🔍 Detects context menu events and allows them
- 🔍 Patches validation functions to always return "allowed"

### Console Logging
Open browser console (`F12` → Console) to see activity:
```
[WK Semantic Bypass] Initializing for context menu and semantic labeling...
[WK Semantic Bypass] DOM observer active
[WK Semantic Bypass] Context menu event detected
[WK Semantic Bypass] Patching complete - you can now label at any zoom level!
```

## Troubleshooting

### Context Menu Doesn't Appear

1. **Check script is enabled**
   - Tampermonkey icon → Dashboard
   - Toggle should be ON/green

2. **Hard refresh the page**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

3. **Check browser console** (`F12` → Console)
   - Look for messages starting with `[WK Semantic Bypass]`
   - Should see "Initializing..." message
   - If no messages, script may not be running

4. **Verify right-click is working**
   - Try right-clicking elsewhere on page
   - If context menu works elsewhere but not on canvas, there may be another issue

### Semantic Labels Are Grayed Out

1. **Check if labels are defined**
   - Some projects may not have semantic labels configured
   - Go to annotation settings to verify labels exist

2. **Try clicking the structure first**
   - Left-click to select the segment/skeleton
   - Then right-click for context menu

3. **Check console for errors**
   - Look for JavaScript errors in console
   - They may indicate why labeling is blocked

### Still Seeing "Zoom Out" Error

1. **Check which error message you're seeing**
   - Right-click the error → Inspect element
   - Note the exact text and class names

2. **Update the script** to hide that specific message:
   - Edit line ~13 in the script (CSS section)
   - Add the specific class/selector
   - Save and refresh

### Script Logs Not Appearing

If you don't see `[WK Semantic Bypass]` messages in console:

1. **Verify script is installed and enabled**
   - Tampermonkey dashboard should show it

2. **Check URL matching**
   - Script matches `localhost:9090` by default
   - If your WebKnossos is on different URL, edit `@match` lines

3. **Check for script errors**
   - Tampermonkey icon → Click script name
   - Look for red error indicators

## Custom URL Configuration

If your WebKnossos runs on a different URL:

1. **Edit the script**
   - Tampermonkey dashboard → Click script name

2. **Find the `@match` lines** (near top):
   ```javascript
   // @match        http://localhost:9090/*
   // @match        https://webknossos.org/*
   ```

3. **Add your URL**:
   ```javascript
   // @match        http://your-server:8000/*
   ```

4. **Save** (`Ctrl+S`)

## Combining with Volume Annotation Bypass

If you want BOTH semantic labeling AND volume painting at any zoom:

1. **Install both scripts**:
   - `bypass-semantic-labeling-restriction.user.js` (this one)
   - `bypass-zoom-restriction-aggressive.user.js` (for painting)

2. **Enable both** in Tampermonkey dashboard

3. Both will run simultaneously without conflicts

## Performance Notes

### Why the Restriction Exists

WebKnossos restricts zoom levels because:
- **Accuracy**: Hard to click precisely when zoomed out
- **Performance**: Rendering at extreme zoom can be slow
- **Data quality**: Risk of mislabeling structures

### Best Practices

Even with restrictions removed:
- ✅ **Use bird's eye view for planning** - see the overall path
- ✅ **Zoom in for precision** - when accuracy matters
- ✅ **Label obvious features from afar** - clear axons/dendrites
- ⚠️ **Zoom in for ambiguous cases** - when unsure what you're looking at

## Neuroscience-Specific Tips

### Axon vs Dendrite Identification

When zoomed out, look for:
- **Axons**: Longer, thinner, more uniform diameter
- **Dendrites**: Thicker, tapering, more branching
- **Spines**: Only on dendrites (need to zoom in to see)

### Vesicle Detection

- Vesicles appear as clustered dark spots
- More visible when zoomed in, but path to them visible when zoomed out
- Use zoom-out to find regions likely to have vesicles (near terminals)

### PSD Identification

- Post-synaptic densities are very small
- Usually need moderate zoom to identify
- But you can navigate to synapse locations when zoomed out

### Workflow Recommendation

1. **Zoom out** - trace full path, identify structure type
2. **Mark major features** - label main axon/dendrite segments
3. **Zoom in to regions of interest** - look for vesicles/PSDs
4. **Label fine details** - mark what you find
5. **Zoom back out** - continue to next section

## Disabling the Script

To restore normal WebKnossos behavior:

1. **Tampermonkey dashboard**
2. **Find script** in list
3. **Toggle to OFF** (gray/disabled)
4. **Refresh WebKnossos** page

Script will not run until re-enabled.

## Files in This Directory

- **`bypass-semantic-labeling-restriction.user.js`** - Main script for semantic labeling (use this one!)
- **`bypass-zoom-restriction.user.js`** - For volume painting (basic version)
- **`bypass-zoom-restriction-aggressive.user.js`** - For volume painting (aggressive version)
- **`SEMANTIC-LABELING-BYPASS-GUIDE.md`** - This file
- **`ZOOM-BYPASS-INSTALLATION.md`** - General zoom bypass guide

## Support

If you encounter issues:

1. **Check console** (`F12` → Console tab)
2. **Look for error messages** (red text)
3. **Verify script messages** (should see `[WK Semantic Bypass]`)
4. **Try hard refresh** (`Ctrl+Shift+R`)
5. **Check Tampermonkey dashboard** (script enabled?)

## Technical Details

### Script Hooks

The script intercepts:
- `contextmenu` events (right-click)
- Validation functions (zoom level checks)
- Object.freeze calls (configuration locking)
- Console warnings/errors (zoom restrictions)
- DOM mutations (new error messages)

### What's NOT Modified

- Actual zoom functionality (works normally)
- Image rendering (no visual changes)
- Data saving (annotations save normally)
- Other WebKnossos features (unchanged)

## Version

- **Version**: 1.0
- **Created**: November 2025
- **Compatible with**: WebKnossos (tested on localhost:9090)
- **Browser Support**: Chrome, Firefox, Edge (via Tampermonkey)

---

**Happy tracing! 🧠🔬**

Now you can examine those axons and dendrites from a comfortable distance and label what you find without WebKnossos complaining about zoom levels.
