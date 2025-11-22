# WK Keyboard Shortcuts - Keybind Remapping Feature

## Version Status

**v1.1-STABLE** ✅ Locked in DO_NOT_TOUCH
- Fixed keybinds (1-9, Q, W, E)
- Production ready

**v1.2-EXPERIMENTAL** 🧪 Testing rebinding
- User-customizable keybinds
- Right-click hints to remap
- Saves to localStorage

## How to Test v1.2

### Installation

1. **Disable v1.1** in Tampermonkey (if enabled)
2. **Install v1.2-EXPERIMENTAL** in Tampermonkey
3. **Refresh WebKnossos**

### Rebinding a Key

**Example: Change Dendrite from '1' to 'D'**

1. **Right-click** a segment to open menu
2. **Right-click** the `[1]` badge next to "🌲 Dendrite"
3. Badge turns **orange** and shows `[...]`
4. **Press 'D'** on keyboard
5. Badge turns **green** briefly, then shows `[D]`
6. **Done!** Now pressing D selects Dendrite

### Rebinding Multiple Keys

You can rebind all 12 items:

```
🌲 Dendrite       [1] → Right-click → Press D → [D]
⚡ Axon          [2] → Right-click → Press A → [A]
🧬 Soma          [3] → Right-click → Press S → [S]
```

After rebinding, your custom keys **persist** even after closing browser.

### Visual Feedback

- **Gray badge** `[1]` - Normal state
- **Orange pulsing** `[...]` - Waiting for key press
- **Green flash** `[D]` - Successfully rebound
- **Hover hint** - "Right-click to rebind"

### Reset to Defaults

At the bottom of menu:
- Click **🔄 Reset Keybinds**
- Confirm dialog
- All keys reset to 1-9, Q, W, E

## Technical Details

### What Gets Saved

**localStorage keys:**
- `wk-keyboard-shortcuts-map` - The KEY_MAP object
- `wk-keyboard-shortcuts-labels` - The KEY_LABELS array

**Example saved data:**
```json
{
  "d": 0, "D": 0,  // Dendrite
  "a": 1, "A": 1,  // Axon
  "s": 2, "S": 2,  // Soma
  "1": 3,          // Nucleus
  "2": 4,          // Glia
  ...
}
```

### Supported Keys

**Any keyboard key works:**
- Letters: A-Z
- Numbers: 0-9
- Special: -, =, [, ], etc.
- Function keys: F1-F12

**Both cases handled:**
- Rebind to 'D' → Both 'd' and 'D' work
- Rebind to '5' → Only '5' works

### Edge Cases

**Duplicate keys:**
- If you rebind two items to same key, **last one wins**
- Old mapping is automatically removed

**Empty keys:**
- After rebinding, some default keys may be unused
- This is fine - only assigned keys work

**Multiple menus:**
- Each menu instance gets fresh hints
- Rebinding updates ALL menus

## Testing Checklist

- [ ] Rebind one key (e.g., 1 → D)
- [ ] Close menu, reopen - custom key still works
- [ ] Refresh page - custom key persists
- [ ] Rebind same item to different key
- [ ] Rebind all 12 items to custom keys
- [ ] Use custom keys to select labels
- [ ] Reset to defaults
- [ ] Verify defaults restored (1-9, Q, W, E)

## Known Issues / To Test

- [ ] What happens if you press ESC during rebinding?
- [ ] What if you close menu during rebinding?
- [ ] Can you rebind to modifier keys (Ctrl, Alt, Shift)?
- [ ] Does it conflict with WK Quick Rename v2.4.0 hotkeys?

## Migration Path

If testing goes well:
1. Use v1.2 for 1 week
2. Fix any bugs found
3. Rename to v1.2-STABLE
4. Move to DO_NOT_TOUCH
5. Update main documentation

## Rollback

If it doesn't work:
1. Disable v1.2-EXPERIMENTAL
2. Enable v1.1-STABLE from DO_NOT_TOUCH
3. Clear localStorage:
   ```javascript
   localStorage.removeItem('wk-keyboard-shortcuts-map');
   localStorage.removeItem('wk-keyboard-shortcuts-labels');
   ```
