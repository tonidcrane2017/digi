# Copilot Instructions for `digi` Codebase

## Project Overview

- **Purpose:** Compassionate, accessible web app for neurodivergent support and neuroscience education.
- **Modes:**
  - _Neurodivergent Support App_ (emotional support, coping tools, privacy-first)
  - _Neuroscience Game_ (brain training, educational quests)
- **Tech:** Pure HTML, CSS, JavaScript (no frameworks, no build step, no backend)
- **Data:** All user data is stored in browser LocalStorage. No external APIs or analytics.

## Architecture & Key Files

- `index.html` — Main entry point for both app/game
- `neurodivergent-app.html` + `neurodivergent-app.js` — Neurodivergent support UI & logic
- `neurodivergent-styles.css` — Styles for support app
- `js/game.js`, `js/quests.js` — Game engine and quest data (see `backup/js/` for legacy)
- `css/styles.css`, `styles.css` — Main and backup styles
- `manifest.json`, `service-worker.js` — PWA support
- `audio/` — Audio resources for meditation, grounding, etc.

## Patterns & Conventions

- **No frameworks:** Use only vanilla JS, HTML, CSS
- **Component logic:** Each major feature (e.g., breathing, quotes, progress) is a function or module in its own file
- **Accessibility:** Always use semantic HTML, ARIA labels, and keyboard navigation
- **Customization:** Theme, font, and motion settings are user-configurable and persisted in LocalStorage
- **Emergency support:** Always keep crisis resources visible and accessible
- **AI/Chatbot:** If editing chatbot logic, ensure responses are empathetic, context-aware, and never judgmental
- **Privacy:** Never add analytics, tracking, or external calls

## Developer Workflows

- **Run/Debug:** Open `index.html` or `neurodivergent-app.html` directly in browser. No build or test commands needed.
- **Add features:** Place new logic in a dedicated JS file or as a function in the relevant file. Update HTML to include new scripts.
- **Style changes:** Edit `neurodivergent-styles.css` or `css/styles.css` as appropriate.
- **Game content:** Add new quests in `js/quests.js` (see README for format)
- **Backup:** Use `backup/` for legacy or experimental versions

## Examples

- To add a new breathing exercise: create a function in `neurodivergent-app.js`, update UI in `neurodivergent-app.html`, and style in `neurodivergent-styles.css`.
- To add a new quest: append to the array in `js/quests.js` using the documented format.

## Do Not

- Do not introduce dependencies or build tools
- Do not send data externally
- Do not break accessibility or privacy guarantees

---

For more, see `README.md` and `README-NEURODIVERGENT.md`.
