# WebKnossos Zoom Bypass Project - Status Document

## Project Overview

**Created**: November 19, 2025
**Status**: ⚠️ **UNTESTED** - Scripts created but not yet installed or verified
**Purpose**: Remove zoom restrictions in WebKnossos to enable semantic labeling and painting at any zoom level

---

## The Problem

WebKnossos blocks certain operations when zoomed out too far:

1. **Context menu / semantic labeling** - Cannot right-click and select labels (axon, dendrite, vesicle, PSD) when zoomed out
2. **Volume annotation / painting** - Brush tool disabled at low zoom levels

**User's primary need**: Examine large axons and dendrites from bird's eye view to:
- See the full path/flow of structures
- Identify vesicles and PSDs along the path
- Right-click to open context menu
- Apply semantic labels while still zoomed out

---

## What Was Created

### 1. Semantic Labeling Bypass (PRIMARY SCRIPT)

**File**: `bypass-semantic-labeling-restriction.user.js`

**Purpose**: Enable context menu and semantic labeling at any zoom level

**Features**:
- Removes zoom restriction error messages
- Ensures right-click context menu works when zoomed out
- Bypasses validation functions that block semantic labeling
- Monitors DOM in real-time to catch and remove new error messages
- Enables disabled UI elements
- Overrides zoom configuration objects

**Use case**:
- Zoom out to see full axon/dendrite structure
- Right-click anywhere on the structure
- Select semantic labels (axon, dendrite, vesicle, PSD)
- Continue working from zoomed-out view

---

### 2. Volume Painting Bypass (SECONDARY - Standard Version)

**File**: `bypass-zoom-restriction.user.js`

**Purpose**: Allow brush/paint tool at any zoom level

**Features**:
- Hides zoom error toasts
- Intercepts and blocks zoom warnings
- Patches validation functions
- Multiple bypass methods

**Use case**:
- Volume annotation tasks where painting is needed
- Less relevant to user's current workflow but available

---

### 3. Volume Painting Bypass (SECONDARY - Aggressive Version)

**File**: `bypass-zoom-restriction-aggressive.user.js`

**Purpose**: More aggressive version of painting bypass if standard doesn't work

**Features**:
- Everything from standard version PLUS:
- MutationObserver for real-time DOM monitoring
- Redux/Store action interception
- Object.freeze overrides
- Function proxy wrapping
- Re-enables disabled buttons

**Use case**:
- Fallback if standard painting bypass doesn't work
- Can run alongside semantic labeling script

---

## Documentation Created

### 1. Semantic Labeling Guide (PRIMARY)
**File**: `SEMANTIC-LABELING-BYPASS-GUIDE.md`

**Contents**:
- Installation instructions for Tampermonkey
- Step-by-step usage workflow
- Troubleshooting guide
- Neuroscience-specific tips (axon vs dendrite ID, vesicle detection, PSD workflows)
- Performance considerations
- Best practices for tracing

### 2. General Zoom Bypass Installation Guide
**File**: `ZOOM-BYPASS-INSTALLATION.md`

**Contents**:
- Installation for painting bypass scripts
- Testing procedures
- Troubleshooting
- URL customization
- Performance notes

### 3. This Status Document
**File**: `ZOOM-BYPASS-PROJECT-STATUS.md`

Summary of entire project and next steps.

---

## File Locations

All files in: `D:\1337\webknossos-development\`

### Tampermonkey Scripts (Install These)
```
bypass-semantic-labeling-restriction.user.js    <- PRIMARY - Use this one!
bypass-zoom-restriction.user.js                 <- SECONDARY - For painting (basic)
bypass-zoom-restriction-aggressive.user.js      <- SECONDARY - For painting (aggressive)
```

### Documentation (Read These)
```
SEMANTIC-LABELING-BYPASS-GUIDE.md               <- PRIMARY - Start here
ZOOM-BYPASS-INSTALLATION.md                     <- SECONDARY - For painting scripts
ZOOM-BYPASS-PROJECT-STATUS.md                   <- This file
```

---

## Testing Status

### ❌ Not Yet Tested

- [ ] Scripts have NOT been installed in Tampermonkey
- [ ] Scripts have NOT been tested in WebKnossos
- [ ] Unknown if scripts work as intended
- [ ] Unknown if any adjustments needed

### What Needs Testing

1. **Install semantic labeling script** in Tampermonkey
2. **Open WebKnossos** (http://localhost:9090)
3. **Load annotation task** with semantic labels configured
4. **Zoom out** far enough to trigger restriction
5. **Right-click** on structure (axon/dendrite)
6. **Verify context menu appears**
7. **Select semantic label** from menu
8. **Verify label is applied**

### Expected Results

✅ **Success**:
- No zoom error messages appear
- Context menu works at any zoom level
- Can apply semantic labels while zoomed out
- Console shows `[WK Semantic Bypass]` messages

❌ **Failure indicators**:
- Still seeing zoom restriction error toasts
- Context menu doesn't appear or is grayed out
- Semantic label options are disabled
- Labels don't apply when selected

---

## Next Steps (When Returning)

### Phase 1: Install and Basic Test

1. **Install Tampermonkey** (if not already installed)
   - Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo

2. **Add the semantic labeling script**:
   - Tampermonkey → Dashboard → + (create new script)
   - Copy contents from `bypass-semantic-labeling-restriction.user.js`
   - Paste and save (Ctrl+S)

3. **Open WebKnossos**:
   - Navigate to http://localhost:9090
   - Load an annotation project

4. **Test basic functionality**:
   - Zoom out significantly
   - Right-click on a structure
   - Check if context menu appears
   - Check browser console (F12) for script messages

### Phase 2: Verify Semantic Labeling

1. **Select a structure** that needs labeling
2. **Zoom out** to bird's eye view
3. **Right-click** to open context menu
4. **Choose semantic label** (axon, dendrite, vesicle, PSD, etc.)
5. **Verify label is applied**

### Phase 3: Troubleshooting (If Needed)

If it doesn't work:

1. **Check console for errors** (F12 → Console)
2. **Look for script messages** (should see `[WK Semantic Bypass]`)
3. **Try hard refresh** (Ctrl+Shift+R)
4. **Check Tampermonkey dashboard** (script enabled?)
5. **Note specific error messages** or behavior
6. **Adjust script based on findings**

### Phase 4: Optional - Add Painting Bypass

If you also want volume painting at any zoom:

1. **Install one of the painting scripts**:
   - Start with `bypass-zoom-restriction.user.js` (standard)
   - Use `bypass-zoom-restriction-aggressive.user.js` if standard doesn't work

2. **Test painting** at low zoom levels

---

## Technical Approach

### How the Scripts Work

1. **CSS Injection**: Hides error messages and ensures UI elements are clickable
2. **DOM Observation**: Watches for new error messages and removes them in real-time
3. **Function Override**: Patches validation functions to always return "allowed"
4. **Event Interception**: Monitors context menu events and allows them
5. **Object Patching**: Modifies frozen configuration objects to remove zoom limits
6. **Console Filtering**: Blocks zoom-related warnings/errors from appearing

### Why Multiple Scripts?

- **Semantic labeling script**: Focused on context menu and labeling workflow (user's primary need)
- **Standard painting script**: Basic volume annotation bypass (secondary feature)
- **Aggressive painting script**: Fallback if standard doesn't work (secondary feature)

All can run simultaneously without conflicts.

---

## Known Limitations

### What the Scripts CAN Do

✅ Bypass client-side zoom restrictions
✅ Enable context menu at any zoom level
✅ Allow semantic labeling while zoomed out
✅ Enable painting/brush tools at low zoom
✅ Hide error messages about zoom restrictions

### What the Scripts CANNOT Do

❌ Bypass server-side validation (if WebKnossos server rejects low-zoom annotations)
❌ Improve rendering performance at extreme zoom levels
❌ Make clicking more accurate when zoomed out
❌ Change how WebKnossos loads or displays data

### Performance Considerations

- WebKnossos restricts zoom for good reasons (accuracy, performance)
- Working at extreme zoom levels may be slower
- Clicking precision decreases when zoomed out
- Use zoom-out for overview, zoom-in for precision

---

## Questions to Answer During Testing

1. **Does the context menu appear at low zoom?**
2. **Are semantic label options enabled in the menu?**
3. **Do labels apply successfully?**
4. **Are there any error messages still appearing?**
5. **Does the script work on all structure types?** (segments, skeletons, etc.)
6. **Is performance acceptable when working zoomed out?**
7. **Do any WebKnossos features break?**
8. **Are there any console errors?**

---

## Potential Adjustments Needed

Based on testing results, may need to:

1. **Add more CSS selectors** if error messages still appear
2. **Patch additional validation functions** if labeling is still blocked
3. **Adjust event interception** if context menu doesn't work
4. **Modify timing/delays** if script loads before WebKnossos is ready
5. **Update URL matching** if running on different WebKnossos instance
6. **Add more aggressive patching** if standard approach doesn't work

---

## Success Criteria

Project is complete when:

✅ User can zoom out to see full axon/dendrite paths
✅ User can right-click to open context menu while zoomed out
✅ User can select semantic labels (axon, dendrite, vesicle, PSD) from menu
✅ Labels apply successfully
✅ No zoom restriction errors appear
✅ Workflow is smooth and usable

---

## Resources

### Tampermonkey Installation
- Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
- Edge: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

### WebKnossos Local Instance
- URL: http://localhost:9090
- To start: `cd webknossos-development && docker-compose -f docker-compose-dev.yml up -d`

### Browser Console
- Open with: `F12` (Chrome/Firefox/Edge)
- Switch to "Console" tab
- Look for messages starting with `[WK Semantic Bypass]`

---

## Notes for Future Development

### If Scripts Don't Work Initially

1. **Inspect error messages**:
   - Right-click error → Inspect Element
   - Note exact class names and structure
   - Add to CSS hiding rules

2. **Find validation functions**:
   - Search WebKnossos source code
   - Look for zoom-related checks
   - Override the specific functions found

3. **Monitor network requests**:
   - F12 → Network tab
   - Look for API calls that might validate zoom
   - May need to intercept fetch/XHR

4. **Check Redux/Store structure**:
   - Console: `window.Store.getState()`
   - Look for zoom-related state
   - May need to patch state management

### Alternative Approaches (If Needed)

1. **Direct WebKnossos code modification**:
   - Fork WebKnossos repository
   - Remove zoom restrictions in source
   - Build custom version
   - More permanent but requires maintenance

2. **Browser extension (instead of Tampermonkey)**:
   - More powerful API access
   - Better performance
   - More complex to develop

3. **WebKnossos plugin system** (if exists):
   - Official way to extend functionality
   - May have hooks for validation
   - Most maintainable long-term

---

## Project Timeline

- **Started**: November 19, 2025
- **Scripts Created**: November 19, 2025
- **Status**: On hold, awaiting testing
- **Next Session**: TBD

---

## Contact/Resumption

When you're ready to resume:

1. **Read this document** to refresh context
2. **Review** `SEMANTIC-LABELING-BYPASS-GUIDE.md` for detailed instructions
3. **Install** the semantic labeling script first
4. **Test** in WebKnossos
5. **Report results** (what works, what doesn't)
6. **Iterate** based on findings

---

**Status**: 📋 **DOCUMENTED AND ON HOLD**

All scripts and documentation are complete and ready for testing.
When you return, start with the semantic labeling bypass script - it's designed specifically for your axon/dendrite examination workflow.

**Primary file to install**: `bypass-semantic-labeling-restriction.user.js`
**Primary guide to read**: `SEMANTIC-LABELING-BYPASS-GUIDE.md`
