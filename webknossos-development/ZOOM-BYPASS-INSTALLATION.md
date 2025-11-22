# WebKnossos Zoom Restriction Bypass - Installation Guide

## Problem
WebKnossos prevents volume annotation (painting/brushing) when zoomed out too far, showing the error:
> "Brush - Volume annotation is disabled since the current zoom value is not in the required range. Please adjust the zoom level."

This guide provides Tampermonkey scripts to bypass this restriction.

## Prerequisites
1. **Tampermonkey browser extension** installed
   - Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
   - Edge: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

## Installation

### Option 1: Standard Bypass (Recommended)

1. **Open Tampermonkey Dashboard**
   - Click the Tampermonkey icon in your browser
   - Select "Dashboard"

2. **Create New Script**
   - Click the "+" tab or "Create a new script"

3. **Copy Script Content**
   - Open: `D:\1337\webknossos-development\bypass-zoom-restriction.user.js`
   - Copy the entire contents
   - Paste into Tampermonkey editor

4. **Save**
   - Press `Ctrl+S` or click "File" → "Save"

5. **Verify Installation**
   - Script should appear in dashboard with toggle enabled (ON)
   - Should show: "WebKnossos - Bypass Zoom Restriction for Volume Annotation"

### Option 2: Aggressive Bypass (If Standard Doesn't Work)

Use the aggressive version if the standard bypass doesn't fully work:

1. Follow steps 1-2 above
2. Copy contents from: `bypass-zoom-restriction-aggressive.user.js`
3. Save and enable

**Note:** You can have both scripts enabled simultaneously, or disable one if it conflicts.

## Testing

1. **Open WebKnossos**
   - Navigate to http://localhost:9090 (or your WebKnossos instance)

2. **Open a Volume Annotation Task**
   - Load any project with volume annotation

3. **Test Zoom Out**
   - Zoom out further than normally allowed
   - Try to paint/brush with the volume annotation tool
   - The error message should NOT appear
   - You should be able to paint at any zoom level

4. **Check Console (Optional)**
   - Press `F12` to open browser DevTools
   - Switch to "Console" tab
   - You should see messages like:
     ```
     [WebKnossos Zoom Bypass] Script loaded
     [WebKnossos Zoom Bypass] All bypass methods activated
     ```

## How It Works

### Standard Version
- Hides zoom restriction error messages via CSS
- Intercepts and blocks zoom warnings in console
- Monitors DOM for new error messages and removes them
- Attempts to patch validation functions

### Aggressive Version
- All features from standard version PLUS:
- Uses MutationObserver to catch messages in real-time
- Overrides localStorage zoom settings
- Patches Object.freeze to prevent immutable restrictions
- Enables disabled buttons that were blocked by zoom restrictions
- Intercepts Redux/Store actions related to zoom
- Wraps validation functions to always return true

## Troubleshooting

### Script Not Working

1. **Check Script is Enabled**
   - Tampermonkey dashboard → Script should show as "Enabled"

2. **Verify URL Matching**
   - Script matches:
     - `http://localhost:9090/*`
     - `https://webknossos.org/*`
     - `https://*.webknossos.org/*`
   - If your WebKnossos is on a different URL, edit the `@match` lines

3. **Check Console for Errors**
   - Press `F12` → Console tab
   - Look for red error messages
   - Look for bypass script messages (should start with `[WK Zoom Bypass]`)

4. **Try Refreshing the Page**
   - Press `Ctrl+Shift+R` (hard refresh)
   - This ensures the script runs on the fresh page load

5. **Switch to Aggressive Version**
   - If standard doesn't work, disable it and enable aggressive version

### Still Seeing Error Message

If you still see the error toast:

1. **Right-click the error message** → Inspect Element
2. **Find the container class** (e.g., `.ant-message-notice`)
3. **Edit the script** to add that specific class to the CSS hiding rules
4. **Save and refresh**

### Painting Still Disabled

If the error message is gone but painting still doesn't work:

1. Check if the brush button is still grayed out/disabled
2. Try the aggressive version - it specifically re-enables disabled buttons
3. Check browser console for any errors
4. Report the issue with console log details

## URL Customization

If your WebKnossos runs on a different URL:

1. Open the script in Tampermonkey editor
2. Find the `@match` lines near the top:
   ```javascript
   // @match        http://localhost:9090/*
   // @match        https://webknossos.org/*
   ```
3. Add your custom URL:
   ```javascript
   // @match        http://your-custom-url:port/*
   ```
4. Save the script

## Limitations

- **Server-side restrictions**: If WebKnossos has server-side validation that prevents saving annotations at certain zoom levels, this script cannot bypass that
- **Performance**: Painting at extreme zoom levels may cause performance issues (this is why the restriction exists)
- **Updates**: If WebKnossos updates its code significantly, the script may need updates

## Performance Considerations

While this script removes the restriction, WebKnossos implements zoom limits for good reasons:

- **Accuracy**: Painting at very low zoom may be imprecise
- **Performance**: Large brush strokes at low zoom can be slow
- **Data integrity**: Risk of painting too broadly

**Recommendation**: Use this bypass when you need it, but zoom in when possible for best results.

## Updating the Script

If WebKnossos changes and the script stops working:

1. Open Tampermonkey dashboard
2. Click the script name
3. Look for update notification
4. Or manually check this folder for updated versions

## Disabling the Bypass

To restore normal WebKnossos behavior:

1. Open Tampermonkey dashboard
2. Find the script
3. Toggle it OFF (disable)
4. Refresh WebKnossos page

## Alternative: Direct Code Modification

If you're running a local WebKnossos instance, you can also modify the source code directly:

1. Find the validation function in WebKnossos source
2. Comment out or modify the zoom level check
3. Rebuild WebKnossos
4. This is more permanent but requires rebuild after updates

## Support

If you encounter issues:
1. Check console logs (F12 → Console)
2. Try both standard and aggressive versions
3. Check that Tampermonkey is enabled and script is active
4. Verify the URL matches your WebKnossos instance

## Files in This Directory

- `bypass-zoom-restriction.user.js` - Standard version (recommended first)
- `bypass-zoom-restriction-aggressive.user.js` - Aggressive version (use if standard doesn't work)
- `ZOOM-BYPASS-INSTALLATION.md` - This file

## Version History

- **v1.0** (Standard) - Initial release with multiple bypass methods
- **v2.0** (Aggressive) - Enhanced with MutationObserver and more aggressive patching

---

**Created**: November 2025
**Compatible with**: WebKnossos (tested on localhost:9090)
**Browser Compatibility**: Chrome, Firefox, Edge (any browser that supports Tampermonkey)
