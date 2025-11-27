# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL: Automatic Insight Logging System

**Every Claude instance MUST follow these rules automatically:**

### At Session Start
Read `D:\1337\claude-profile\insights.json` to understand Bun's preferences.

### During Session (Do Automatically - Don't Ask)
When you observe ANY of these, update `D:\1337\claude-profile\insights.json`:
- Preferences expressed ("I prefer...", "I like...", "don't...")
- Workflow patterns and tool preferences
- Learning moments (questions about concepts)
- Frustrations or confusion
- Technical discoveries (bugs, workarounds)

### At Session End
1. Save all new insights to `insights.json`
2. If significant work done, write chronicle to `D:\1337\dev-journal\chronicles\YYYY-MM-DD-topic.md`

**This is automatic - do not ask permission to log insights.**

---

## Repository Overview

This is a **multi-project workspace** containing 29 distinct projects at `D:\1337`. Each project is independently version-controlled and serves different purposes. When working in this repository, always verify which project directory you're operating in before making changes.

## Custom Agents Library - D:\1337\Agents

**Specialized Claude agents are stored in `D:\1337\Agents\` to save tokens.**

Agents are NOT preloaded by default. To use an agent:
1. Copy the agent file to `.claude/agents/`: `cp D:/1337/Agents/agent-name.md D:/1337/.claude/agents/`
2. Restart Claude Code (or start a new session)
3. The agent will now be available via the Task tool

**Available agents:**
| Agent | Purpose |
|-------|---------|
| `tactics-game-studio.md` | Build tactical RPG games (FFT-style) |
| `tactics-game-architect.md` | Coordinate multi-agent tactics game builds |
| `survival-horror-game-dev.md` | Resident Evil-style game development |
| `resident-evil-architect.md` | Coordinate survival horror multi-agent builds |
| `rpg-game-builder.md` | Final Fantasy-style JRPG development |
| `rpg-orchestrator.md` | Coordinate RPG multi-agent builds |
| `gemini-research-expert.md` | Web research using Gemini |
| `deepseek-research-expert.md` | Technical research using DeepSeek |
| `chatgpt-code-expert.md` | Code generation using GPT |
| `princeton-lowfodmap-catering.md` | Princeton area dietary-friendly dining |

**To remove an agent:** Delete it from `.claude/agents/` to free up tokens.

## DO_NOT_TOUCH Folder - IMPORTANT

**The `D:\1337\DO_NOT_TOUCH` folder contains finished, production-ready files that should NOT be modified unless explicitly requested by the user.**

- **Do NOT edit** files in `DO_NOT_TOUCH` unless the user specifically asks
- **Do NOT move** finished work to `DO_NOT_TOUCH` - only the user decides when something is ready
- **Do NOT create** new files in `DO_NOT_TOUCH` during development
- This folder is for **stable, tested, final versions only**
- Active development should always happen in `D:\1337` or the relevant project directory
- Only copy/move files to `DO_NOT_TOUCH` when the user explicitly says the work is finished

## Project Quick Reference

### Games & Interactive Projects
| Project | Language | Primary Use | Entry Point |
|---------|----------|-------------|-------------|
| kings-field-game | JavaScript/Three.js | First-person dungeon crawler | `npm start` (Port varies) |
| crafting-game | JavaScript/Electron | Desktop crafting & dress-up game | `npm start` |
| bejeweled-twist-game | HTML/CSS/JS | Browser-based puzzle game | `index.html` (open in browser) |
| don-t-crash-the-game | HTML/JavaScript | Spaceship docking game | `spaceship-docking.html` |
| Einh-nder-Snake | TypeScript | Einhänder-style shooter | `index.html` |
| snake-game | TypeScript | Snake-like shooter | `index.html` |
| DJ-Venue-VRChat-World | C#/Unity | VRChat DJ venue with AudioLink | Unity project at separate location |
| resident-evil-like-game | C#/Unity | Survival horror demo with tank controls | Unity 2022.3.22f1, `Assets/Scenes/EntranceHall.unity` |

### Business & Productivity Tools
| Project | Language | Primary Use | Entry Point |
|---------|----------|-------------|-------------|
| crypto-bot-testnet | Python 3.9+ | Crypto arbitrage monitoring (3 live dashboards) | `src/multi_coin_dashboard.py` |
| admin-invoice-system | Python/Flask | Invoice & project management system | `app.py` |
| workforce-management-hub | Python/Flask | Employee & grant management dashboard | `src/app.py` |
| slack-workspace-toolkit | Python/HTML | Slack export tools & gallery generator | Various scripts |
| AutoScribe | HTML/JavaScript | Slack-to-documentation converter | `templates/` |
| borkbook-project | Documentation | Social network business plan | `.md` files |
| discord-server-toolkit | Markdown | Discord community setup toolkit | `SETUP_CHECKLIST.md` |

### Development & Research Tools
| Project | Language | Primary Use | Entry Point |
|---------|----------|-------------|-------------|
| claude-enhancements | Bash/Markdown | Parallel Claude workflow tools | `start_parallel_claudes.sh` |
| claude-profile | Markdown | Claude learning profile & preferences | `CLAUDE.md` |
| dev-journal | Markdown/Bash | Daily development log | `quick-log.sh` |
| bun-utils | Python 3.8+ | Shared utility library | `setup.py` (install with `pip install -e .`) |
| claude-demo | Python 3 | Interactive AI capability demo | `demo.py` |
| future-ideas | Markdown | Project ideas and collaboration notes | `.txt` and `.md` files |
| multi-ai-cli | Python | Unified CLI for DeepSeek, GPT, Gemini, Claude | `main.py` or `test-all.py` |
| webknossos-development | Docker/Python | Neuron tracing environment | `docker-compose-dev.yml` |

### Specialized Projects
| Project | Language | Primary Use | Entry Point |
|---------|----------|-------------|-------------|
| solar-monitoring-app | Swift/Node.js/Python | Solar energy monitoring system | See `/docs/getting-started/START_HERE.txt` |
| eye-tracker | Python | Multi-monitor eye tracking system | `START_HERE.txt` |
| skeleton-optimizer | Python 3.11+ | Neuron mesh skeleton optimization | `README.md` for setup |
| neuroscience-notes | Markdown | Educational documentation | `.md` files |
| archives-of-corona-mtg | Markdown | Custom Magic: The Gathering set (175 cards) | `.md` files |
| unity-mcp | Python | Unity Editor MCP bridge | Auto-installed by Unity package |
| n8n-workflows | JSON/Python | Email automation workflows | N8N web interface |
| security-guidelines | Documentation | Security protocols and audits | `.md` files |
| mcguff-silverman-redesign | HTML/CSS/JS | Artist portfolio site for L.E. McGuff Silverman | `python -m http.server 8080` then `index.html` |
| mcguffsilverman-clone | N/A | **DEPRECATED** - Incomplete React clone, missing JS chunks | Use `mcguff-silverman-redesign` instead |

## Common Development Commands

### Python Projects (crypto-bot, multi-ai-cli, bun-utils, claude-demo)

```bash
# Setup virtual environment (recommended for crypto-bot)
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Unix

# Install dependencies
pip install -r requirements.txt

# Install bun-utils as editable package
cd bun-utils
pip install -e .
```

### Crypto Bot Testnet

The crypto bot runs **3 separate dashboards simultaneously**:

```bash
# Terminal 1: CEX Dashboard (Port 5001)
python src/multi_coin_dashboard.py

# Terminal 2: Pump.fun DEX Dashboard (Port 5002)
python src/pump_fun_dashboard.py

# Terminal 3: Raydium Pool Dashboard (Port 5003)
python src/raydium_dashboard.py
```

**Key files:**
- `src/multi_coin_dashboard.py` - 25 cryptocurrencies across 5 exchanges
- `src/pump_fun_dashboard.py` - Solana DEX monitoring (Pump.fun, Orca, Meteora, Raydium, Jupiter)
- `src/raydium_dashboard.py` - Raydium pool analysis with slippage metrics
- `src/arbitrage_analyzer.py` - Net profit calculations with fee analysis

**Tech stack:** CCXT, Flask, WebSockets, Pandas, PostgreSQL, MongoDB, Redis

### Unity Projects (DJ-Venue, kings-field-game, resident-evil-like-game)

```bash
# DJ Venue VRChat World
# 1. Open Unity 2022.3.22f1
# 2. Load project from VRChat Creator Companion projects folder
# 3. Enable AudioLink: Tools → Enable AudioLink Music Reactive Lights
# 4. Test locally: VRChat SDK → Show Control Panel → Builder → Build & Test
# 5. Upload: Tools → Prepare World for VRChat Upload

# Resident Evil-Like Game
# 1. Open Unity 2022.3.22f1
# 2. Load scene: Assets/Scenes/EntranceHall.unity
# 3. Press Play in Unity Editor
# OR run pre-built: Builds/Windows/ResidentEvilDemo.exe
```

**Note:** DJ Venue main project is at: `C:\Users\benja\AppData\Local\VRChatCreatorCompanion\VRChatProjects\DJ_Venue_World`

**Important guide:** `DJ-Venue-VRChat-World/WHEN_YOU_COME_BACK.md` - Read this before working on the VRChat project

### Multi-AI CLI

```bash
# Quick test all configured APIs
cd multi-ai-cli
python test-all.py

# Interactive session with specific model
python main.py --provider deepseek
python main.py --provider gemini
python main.py --provider openai --model gpt-4
```

### WebKnossos Development

```bash
# Launch all services
cd webknossos-development
docker-compose -f docker-compose-dev.yml up -d

# Access at: http://localhost:9090
# Login: admin@localhost.com

# Check status
python wk-tools/check_installation.py
```

### Web Projects

```bash
# Bejeweled Twist - No build required
# Simply open index.html in any browser

# Solar Monitoring (when implementation begins)
cd solar-monitoring-app/backend
npm install
npm start
```

## Architecture Patterns

### Crypto Bot: Multi-Dashboard Real-Time System

```
WebSocket Feeds (Binance, Coinbase, etc.)
    ↓
Python Monitors (multi_coin, pump_fun, raydium)
    ↓
Flask Dashboards (Ports 5001-5003)
    ↓
HTML/CSS UI (Real-time updates)
```

- Each dashboard is **independent** and can run separately
- Real-time arbitrage detection with <500ms latency
- Fee-aware profit calculations (maker/taker fees, slippage, gas)

### Solar Monitoring: Three-Tier Architecture

```
iOS App (SwiftUI)
    ↓ HTTPS/JSON
Backend API (Node/Express) ← Google Sheets
    ↓ HTTP/JSON
Hardware Layer (Tesla Powerwall + ESP32-CAM)
```

- **Status:** Research phase complete, implementation pending
- **Timeline:** 4-5 weeks with one full-time developer
- **Comprehensive documentation:** 24 files in `/docs/` (~500 KB)

### VRChat World: Event-Driven with AudioLink

```
VRChat Players
    ↓
Udon Scripts (Event handlers)
    ↓
AudioLink (Music reactivity)
    ↓
Stage Lighting + DJ Equipment
```

- Supports up to 20 players
- Interactive elements: mirror, light toggles, DJ equipment
- **Unreal Engine 5.6** used for asset creation, exported to Unity

### Unity MCP Integration

```
Claude/Cursor AI → MCP Server (Python) → Unity Bridge (Package) → Unity Editor
```

- **MCP Server:** Runs locally, bridges AI assistants to Unity
- **Unity Bridge:** Installed via Unity Package Manager
- **Capabilities:** Asset management, scene control, script editing, prefab operations
- **Multi-instance support:** Can target specific Unity instances when multiple are running

## MCP Server Ecosystem

### On-Demand MCP Loading

**MCP servers are installed on-demand to minimize context usage.**

- **Config location:** `C:\Users\Benjamin\.claude\mcp.json`
- **Catalog of available servers:** `C:\Users\Benjamin\.claude\mcp-catalog.md`

**When user requests an MCP server:**
1. Read `mcp-catalog.md` for the server config
2. Add it to `mcp.json`
3. Tell user to restart Claude Code

**Currently loaded servers** consume context tokens. Only load what's needed.

### Available MCP Servers

See `C:\Users\Benjamin\.claude\mcp-catalog.md` for full configs. Quick reference:

| Server | Purpose | Approx Tokens |
|--------|---------|---------------|
| **filesystem** | File ops on D:\1337 | ~2k |
| **brave-search** | Web search | ~1.5k |
| **sqlite** | Database operations | ~1.5k |
| **memory** | Persistent knowledge graph | ~2k |
| **github** | Repo/PR/issue management | ~3k |
| **obsidian** | Vault notes (D:\1337\n008137) | ~2.5k |
| **sequential-thinking** | Deep reasoning | ~1.5k |
| **puppeteer** | Browser automation | ~4k |

### Context Budget

Each loaded MCP server consumes tokens. Keep total MCP under 10k tokens when possible.

## Automation Systems

### Auto-Commit System
Automatically commits changes every 10 minutes via Task Scheduler:
- Enable: `D:\1337\setup-auto-commit.bat`
- Logs: `D:\1337\dev-journal\auto-commit.log`
- Check status: `schtasks /query /tn "DevJournal_AutoCommit"`

### Auto-Push System
Pushes commits to GitHub every 30 minutes:
- Enable: `D:\1337\setup-auto-push.bat`
- Only pushes when unpushed commits exist
- Safe for offline work

### Session Chronicles
Context preservation system in `D:\1337\dev-journal\chronicles\`:
- Created every 30-60 minutes during active coding
- Captures decisions, conversations, and ideas
- Auto-committed with code changes

## Shared Utilities (bun-utils)

When working across projects, leverage `bun-utils` to avoid code duplication:

```python
from bun_utils.images import deduplicate_by_filename
from bun_utils.html import GalleryBuilder
from bun_utils.files import read_json, write_json
```

**Zero external dependencies** - Pure Python utilities for:
- Image deduplication and management
- HTML gallery generation (dark/light themes)
- Safe JSON operations with schema validation

## Important Development Notes

### Working with Multiple Projects

1. **Always verify your current directory** before running commands
2. **Each project has its own git repository** - don't mix commits
3. **Virtual environments are isolated** - activate the correct one for Python projects
4. **Port conflicts:** Crypto bot uses ports 5001-5003 simultaneously

### Crypto Bot Specific

- **3 dashboards run in parallel** - use separate terminals or tmux/screen
- **Requirements:** Update packages with `--upgrade` flag, as `requirements.txt` may have outdated versions:
  ```bash
  pip install ccxt pandas numpy websocket-client websockets requests python-dotenv psycopg2-binary pymongo redis pandas-ta aiohttp python-json-logger pytest pytest-asyncio prometheus-client Flask --upgrade
  ```
- **ta-lib dependency:** May require system-level installation (see COMPUTER_SETUP_GUIDE.md)

### Unity/VRChat Projects

- **Unity version:** 2022.3.22f1 (specific version required for VRChat SDK compatibility)
- **DJ Venue location:** Primary project is NOT in D:\1337, but in VRChat Creator Companion folder
- **AudioLink must be enabled** before testing music-reactive features
- **Build path fix required:** Run `Tools → Fix VRChat Build & Test Path` if builds fail
- **MCP Unity Bridge:** Automatically installed on first run, provides AI control of Unity Editor

### Solar Monitoring Project

- **Current status:** Extensive research and planning complete, no implementation yet
- **Start here:** `/docs/getting-started/START_HERE.txt` and `START-HERE-iOS-Research-Summary.md`
- **Ready-to-use code:** 1,500+ lines of implementation examples in documentation
- **Three parallel tracks:** iOS (Swift), Backend (Node.js), Hardware (Python/Arduino)

## Parallel Claude Development

This repository supports **parallel Claude Code instances** using `claude-enhancements`:

```bash
# Launch 4 parallel Claude instances
cd claude-enhancements
./start_parallel_claudes.sh ~/Documents/your-project

# Expected speedup: 3x (75-80% efficiency)
# Task specialization: Frontend, Backend, Assets/Tools, Testing/QA
```

**Key workflow guide:** `claude-enhancements/PARALLEL_CLAUDE_WORKFLOW.md` (17 sections)

## Version Control

When committing changes:

1. **Work in the correct project directory**
2. **Follow existing commit message style** - check `git log` first
3. **Run tests if applicable** (crypto-bot has pytest suite)
4. **Multiple projects:** Make separate commits per project

## Testing

```bash
# Crypto bot
cd crypto-bot-testnet
pytest tests/

# Bun-utils
cd bun-utils
python -m pytest

# Multi-AI CLI
cd multi-ai-cli
python test-all.py

# WebKnossos
cd webknossos-development
python wk-tools/check_installation.py

# Claude demo (no formal tests, just run)
python demo.py
```

## Environment Setup

See `COMPUTER_SETUP_GUIDE.md` for complete setup instructions including:
- SSH key generation and GitHub authentication
- Cloning all repositories
- Python dependency installation for each project
- Node.js and Unity requirements
- Docker installation for WebKnossos
- Common troubleshooting

## Key External Dependencies

### System-Level Requirements

- **Python:** 3.13.5+ (for all Python projects)
- **Node.js:** v22.18.0+ (for solar-monitoring-app backend)
- **Unity:** 2022.3.22f1 (for VRChat and game projects)
- **Git:** 2.50.1+ (version control)
- **Docker:** For WebKnossos development environment

### Python Libraries (Major Dependencies)

- **Crypto bot:** CCXT, Flask, Pandas, PostgreSQL, MongoDB, Redis, WebSockets
- **Hardware integration:** pypowerwall (Tesla Powerwall API)
- **Multi-AI CLI:** OpenAI, Google Generative AI, Anthropic SDKs
- **Bun-utils:** Zero external dependencies (pure Python)

### Optional Tools

- **VRChat Creator Companion** - For DJ Venue world development
- **Unreal Engine 5.6** - For creating assets to export to Unity
- **Docker** - Required for WebKnossos, optional for other projects
- **Railway.app** - Deployment platform (solar-monitoring backend)
- **N8N** - Workflow automation platform (email workflows)
- **Tampermonkey** - For WebKnossos semantic labeling script

## Additional Resources

- **Slack integration:** `slack_worksheet_finder.py` in root (requires `SLACK_BOT_TOKEN` env var)
- **Computer setup:** `COMPUTER_SETUP_GUIDE.md` - Complete environment setup guide
- **Parallel workflows:** `claude-enhancements/` - Scripts and documentation for 3-4x development speedup
- **Security audit:** `SECURITY_AUDIT_REPORT.md` - Recent security findings and fixes
- **Discord toolkit:** `discord-server-toolkit/SETUP_CHECKLIST.md` - Complete Discord server setup

## Project Status Summary

| Project | Status | Notes |
|---------|--------|-------|
| **Games** |||
| kings-field-game | Production Ready | Fully playable dungeon crawler with 90+ features |
| crafting-game | Active Development | Desktop game with inventory system |
| bejeweled-twist-game | Complete | Playable game, no active development |
| don-t-crash-the-game | Complete | Spaceship docking game |
| Einh-nder-Snake | In Development | Einhänder-inspired shooter |
| snake-game | In Development | Snake-style shooter |
| DJ-Venue-VRChat-World | Active Development | VRChat world with music reactivity |
| resident-evil-like-game | Demo Complete | Tank controls survival horror proof-of-concept |
| **Business Tools** |||
| crypto-bot-testnet | Production Ready | 3 live dashboards operational |
| admin-invoice-system | In Development | Invoice management with dashboards |
| workforce-management-hub | In Development | Employee tracking and analytics |
| slack-workspace-toolkit | Production Ready | Image gallery & export tools |
| AutoScribe | Complete | Slack documentation converter |
| borkbook-project | Business Plan | Comprehensive social network plan |
| discord-server-toolkit | Complete | Ready-to-use Discord setup guides |
| **Development Tools** |||
| claude-enhancements | Complete | Workflow tools ready to use |
| claude-profile | Active | Learning profile system |
| dev-journal | Active | Daily development log (started Nov 7, 2025) |
| bun-utils | v0.1.0 Stable | Used by 2+ projects |
| claude-demo | Complete | Educational demo |
| future-ideas | Active | Idea repository, regularly updated |
| multi-ai-cli | Complete | Unified AI API interface |
| webknossos-development | Operational | Docker-based neuron tracing |
| unity-mcp | Active | Unity Editor AI control bridge |
| **Specialized** |||
| solar-monitoring-app | Research Complete | Ready for implementation (4-5 weeks) |
| eye-tracker | Complete | Multi-monitor tracking system |
| skeleton-optimizer | Production Ready | Neuron mesh optimization |
| neuroscience-notes | Documentation | Reference materials |
| archives-of-corona-mtg | Complete | 175-card custom MTG set |
| n8n-workflows | Active | Email automation workflows |
| security-guidelines | Documentation | Security protocols and audit results |


## Session Chronicle System

### Overview
To preserve context beyond code commits, Claude maintains **Session Chronicles** that capture:
- Conversations and thought processes
- Ideas discussed (even ones not implemented)
- Decisions made and why
- Problems solved and debugging approaches
- User quotes and memorable moments
- Future work items

### Automatic Chronicle Creation

**When to create chronicles:**
1. Every 30-60 minutes during active coding sessions
2. After completing major features or fixing critical bugs
3. When user asks "let's wrap up" or indicates session ending
4. When switching between major project areas

**Chronicle file location:**
```
D:\1337\dev-journal\chronicles\YYYY-MM-DD-project-name-topic.md
```

**Example:** `2025-11-13-admin-invoice-security-and-ux.md`

### Chronicle Template

Use this structure for all chronicles:

```markdown
# Session Chronicle: [Project Name] - [Topic]
**Date:** [Date]
**Project:** [project-name]
**Session Duration:** ~X hours
**Commits:** vX.X.X through vX.X.X (N commits)

---

## Session Overview
[1-2 paragraph summary of what was accomplished]

---

## Part 1: [Major Task Name] (vX.X.X)

### Context
[What led to this work?]

### Discussion
[Key conversations, user questions, ideas explored]

### Decision: [Decision Made]
[What was decided and why]

**Implementation Detail:**
[Notable technical details, gotchas, interesting approaches]

### Code Changes
[What files were modified, key changes made]

**Commit:** vX.X.X - [Commit message]

---

[Repeat for each major part of the session]

---

## Ideas for Future Work
1. **[Idea Name]**
   - Details
   - Why it's interesting

---

## Technical Decisions Made

### 1. [Decision Name]
**Why:** [Rationale]
**Alternative considered:** [What else was considered and why rejected]

---

## Files Modified This Session
1. `path/to/file1.py` - [What changed]
2. `path/to/file2.html` - [What changed]

---

## Lessons Learned
1. **[Lesson]** - [Details]

---

## User Quotes / Memorable Moments
- "[Quote]" - [Context]

---

## Session Statistics
- **Commits:** N
- **Files Modified:** N
- **Lines Changed:** ~N added, ~N removed
- **Versions:** vX.X.X → vX.X.X
- **[Other metrics]:** N

---

## Next Session Prep
**Ready to tackle:**
- [Task 1]
- [Task 2]

**Questions for next time:**
- [Question 1]
- [Question 2]
```

### Auto-Commit Integration

Chronicles are automatically committed by the auto-commit system:
- Auto-commit runs every 10 minutes via Task Scheduler
- Chronicles in `dev-journal/chronicles/` are committed along with code
- This ensures chronicles survive power loss or system crashes

### Setup Instructions (For User)

To enable auto-commit:
1. Run `D:\1337\setup-auto-commit.bat` (may require Administrator)
2. Verify task created: `schtasks /query /tn "DevJournal_AutoCommit"`
3. Test immediately: `schtasks /run /tn "DevJournal_AutoCommit"`
4. Check log: `D:\1337\dev-journal\auto-commit.log`

To disable auto-commit:
```bash
schtasks /delete /tn "DevJournal_AutoCommit" /f
```

### Best Practices

1. **Update chronicles incrementally** - Don't wait until session end
2. **Capture "why" not just "what"** - Code shows what, chronicles explain why
3. **Include user quotes** - Preserves context and personality
4. **Note alternatives considered** - Shows decision-making process
5. **Be specific with implementation details** - Future you will thank you
6. **Link to commits** - Makes it easy to see code changes
7. **Preserve failed attempts** - Learning opportunities

## Common Errors & Troubleshooting

### Error Documentation System

**Location:** `D:\1337\common-errors/`

This folder contains documented solutions for recurring errors and issues. Before spending time debugging a problem, check if it's already documented here.

### When You Encounter an Error

1. **Check existing documentation first:**
   ```bash
   ls D:\1337\common-errors/
   # or
   cat D:\1337\common-errors/README.md
   ```

2. **If error is documented:** Follow the proven solution

3. **If error is new but recurring:** Document it in `common-errors/` using this format:

```markdown
# [Error Name]

**Date First Encountered:** YYYY-MM-DD
**Frequency:** [Rare/Occasional/Common/Frequent]
**Severity:** [Low/Medium/High/Critical]

## Problem Description
[Clear description of the error and symptoms]

## Root Cause
[Why this happens]

## Solution
[Step-by-step fix with code examples]

## Testing
[How to verify the fix works]

## Prevention
[How to avoid this error in the future]

## Related Issues
[Similar problems or edge cases]
```

### Currently Documented Errors

| Error | Quick Fix | Documentation |
|-------|-----------|---------------|
| **AutoHotkey not auto-starting from Windows Startup** | Create `.lnk` shortcut instead of placing `.ahk` directly | `common-errors/autohotkey-startup-not-working.md` |

### Adding New Error Documentation

**When to document an error:**
- Error occurs more than once
- Solution is non-obvious
- Solution requires specific steps that might be forgotten
- Error affects Windows/system behavior
- Error requires PowerShell/registry edits

**Steps:**
1. Create new `.md` file in `D:\1337\common-errors/`
2. Use the template above
3. Include working code examples and test procedures
4. Update `common-errors/README.md` index
5. Update this section of CLAUDE.md with quick reference entry

## Working with Claude Code

### Multi-Project Workspace
- This is one of 29 projects at `D:\1337`
- Always verify your current directory before running commands
- Each project has its own git repository

### Claude Enhancements
Launch parallel Claude instances for 3x speedup:
```bash
cd D:/1337/claude-enhancements
./start_parallel_claudes.sh
```

## 🤖 Auto-Updated Information
*Last updated: 2025-11-18 00:32:20*

### Dependencies
Unity Project

### Project Composition
- .py: 14454 files
- .md: 5896 files
- .js: 1224 files
- .cs: 721 files
- .json: 445 files

## Auto-Updated Information
*Last updated: 2025-11-19 21:19:47*

### Dependencies
Unity Project

### Project Composition
- .py: 25399 files
- .md: 11056 files
- .js: 1524 files
- .cs: 721 files
- .json: 705 files

