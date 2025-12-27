# Copilot Instructions for `digi` Codebase

## Project Overview

- **Purpose:** Compassionate, accessible web app for neurodivergent support and neuroscience education.
- **Modes:**
  - _Neurodivergent Support App_ (emotional support, coping tools, privacy-first) - Primary focus
  - _Neuroscience Game_ (brain training, educational quests) - Legacy feature in backup
- **Tech Stack:** Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No Build Required:** Direct browser execution, no transpilation, no bundler
- **Data Storage:** 100% client-side using browser LocalStorage only
- **Privacy First:** No external APIs, no analytics, no tracking, no backend servers

## Architecture & Key Files

### Neurodivergent Support App (Primary)
- `neurodivergent-app.html` — Main HTML entry point for support app
- `neurodivergent-app.js` — Core application logic (48KB, ~1400 lines)
- `neurodivergent-styles.css` — Complete styling with theme system
- `service-worker.js` — PWA offline support and caching
- `manifest.json` — PWA configuration (icons, theme, name)
- `audio/` — Optional meditation and grounding audio files (see `audio/README-AUDIO.md`)

### Neuroscience Game (Legacy/Backup)
- `index.html` — Game entry point (in root)
- `app.js` — Game application logic
- `styles.css` — Game styles
- `backup/js/game.js` — Legacy game engine
- `backup/js/quests.js` — Legacy quest data
- `backup/index.html` — Backup version
- `css/styles.css` — Additional game styles

### Configuration & Documentation
- `.github/copilot-instructions.md` — This file
- `README.md` — Main project documentation
- `README-NEURODIVERGENT.md` — Detailed app documentation
- `QUICK-START.md` — User quick start guide
- `package.json` — Project metadata and npm scripts

## Patterns & Conventions

### Code Style
- **No frameworks or libraries:** Use only vanilla JavaScript (ES6+), HTML5, CSS3
- **No build tools:** Code runs directly in browser without transpilation or bundling
- **Component-based:** Major features are organized as functions or modules (e.g., breathing exercises, quotes, progress tracking)
- **Naming:** Use camelCase for JavaScript functions/variables, kebab-case for CSS classes/IDs
- **Comments:** Add comments for complex logic, especially mental health-related features
- **Indentation:** Consistent 2-space or 4-space indentation (follow existing file patterns)

### Accessibility (Critical)
- **Semantic HTML:** Always use proper heading hierarchy (h1→h2→h3), landmarks (nav, main, aside)
- **ARIA Labels:** Add aria-label, aria-describedby for interactive elements
- **Keyboard Navigation:** Ensure all features work with Tab, Enter, Escape keys
- **Focus Management:** Visible focus indicators, logical tab order
- **Screen Readers:** Test critical flows with screen reader in mind
- **Color Contrast:** Maintain WCAG AA compliance (4.5:1 for text)
- **Motion Preferences:** Respect prefers-reduced-motion for animations

### User Customization
- **Theme System:** 6 themes (Default, Warm, Calm, Purple, Dark, High Contrast) via CSS custom properties
- **Font Options:** Sans-serif, Dyslexic-friendly (OpenDyslexic concept), Monospace
- **Text Size:** 4 levels (small, medium, large, extra-large) via CSS classes
- **Motion Settings:** Reduced motion option that disables/reduces animations
- **Emoji Control:** Option to reduce emoji usage for cleaner interface
- **LocalStorage Keys:** Prefix all keys with `youreok_` to avoid conflicts

### Privacy & Security (Non-Negotiable)
- **No External Calls:** Never add fetch(), XMLHttpRequest, or external script tags
- **No Analytics:** No Google Analytics, no tracking pixels, no metrics collection
- **No User Identification:** No cookies, no fingerprinting, no PII collection
- **LocalStorage Only:** All data stays on user's device
- **Export/Delete:** Always provide data export and clear data functionality
- **Crisis Resources:** Emergency button must always be visible and accessible

### Mental Health Sensitivity
- **Empathetic Tone:** All UI text should be supportive, validating, non-judgmental
- **AI Chatbot:** Responses must be empathetic, context-aware, never dismissive
- **Trigger Warnings:** Consider sensory sensitivities when adding visual/audio content
- **Emergency Support:** Crisis resources (988, Crisis Text Line) must remain prominent
- **Validation First:** Focus on validation and coping rather than "fixing" the user

## Developer Workflows

### Setup & Running
```bash
# Option 1: Direct browser open (simplest)
open neurodivergent-app.html  # or double-click the file

# Option 2: Local development server (recommended for testing)
npm start          # Opens http://localhost:8080 automatically
npm run dev        # Same as start but without auto-open

# Option 3: Python simple server
python -m http.server 8080
# Then visit: http://localhost:8080/neurodivergent-app.html

# Option 4: VS Code Live Server
# Right-click neurodivergent-app.html → "Open with Live Server"
```

### Testing
```bash
npm test           # Currently returns "No tests specified" - manual testing only
```

**Manual Testing Checklist:**
1. Open `neurodivergent-app.html` in multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test all theme options (Settings → Theme)
3. Test all font sizes and font families
4. Verify LocalStorage persistence (close/reopen browser)
5. Test with browser DevTools → Application → LocalStorage
6. Test keyboard navigation (Tab through all interactive elements)
7. Test with screen reader (NVDA, JAWS, VoiceOver)
8. Test offline mode (DevTools → Network → Offline)
9. Verify emergency button always visible and functional
10. Test AI chatbot responses for empathy and appropriateness
11. Check all breathing exercises work correctly
12. Verify export data functionality
13. Test responsive design (mobile, tablet, desktop)
14. Check prefers-reduced-motion works
15. Verify PWA install flow on mobile devices

### Adding New Features

#### Breathing Exercise
1. Add new exercise function to `neurodivergent-app.js`:
   ```javascript
   function newBreathingExercise() {
     // Pattern: inhale-hold-exhale-hold in seconds
     const pattern = { inhale: 4, hold1: 2, exhale: 6, hold2: 2 };
     // Use existing startBreathing() helper
   }
   ```
2. Add UI button in `neurodivergent-app.html` breathing section
3. Style in `neurodivergent-styles.css` if needed
4. Test with reduced motion settings

#### "It's OK" Message
1. Locate `itsOkLibrary` array in `neurodivergent-app.js`
2. Add new object:
   ```javascript
   {
     category: 'feelings|social|sensory|productivity|selfcare|communication',
     title: "It's OK to...",
     description: "Supportive, validating message here."
   }
   ```
3. Test search functionality includes new message

#### Theme
1. Add theme CSS custom properties in `neurodivergent-styles.css`:
   ```css
   [data-theme="newtheme"] {
     --primary-color: #value;
     --secondary-color: #value;
     --accent: #value;
     --background: #value;
     --text: #value;
     --card-bg: #value;
   }
   ```
2. Add option to theme selector in settings
3. Test color contrast ratios (use WebAIM contrast checker)
4. Verify all UI elements visible in new theme

#### Printable Template
1. Create new template section in HTML
2. Add to printable templates menu
3. Implement print styling in CSS
4. Test print preview in all browsers

### Modifying Existing Code
- **Read surrounding code first** to understand patterns and context
- **Minimal changes:** Make smallest possible modification to achieve goal
- **Test thoroughly:** Especially themes, accessibility, and LocalStorage
- **Preserve existing functionality:** Don't break working features
- **Update comments:** If logic changes significantly

## Common Tasks

### Debugging LocalStorage Issues
```javascript
// Check what's stored
console.log(localStorage);

// View specific key
console.log(localStorage.getItem('youreok_theme'));

// Clear all app data
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('youreok_')) {
    localStorage.removeItem(key);
  }
});
```

### Testing PWA Functionality
1. Open DevTools → Application → Service Workers
2. Check "Offline" and reload page
3. Verify app still works
4. Check "Update on reload" during development
5. Test manifest in Application → Manifest tab

### Checking Accessibility
```bash
# Use browser extensions:
# - axe DevTools (Chrome/Firefox)
# - WAVE (Chrome/Firefox)
# - Lighthouse (Chrome DevTools)

# Manual keyboard testing:
# Tab: Navigate forward
# Shift+Tab: Navigate backward  
# Enter/Space: Activate buttons
# Escape: Close modals
# Arrow keys: Navigate within components
```

### Performance Testing
- Keep `neurodivergent-app.js` under 50KB
- Minimize DOM manipulation
- Use event delegation for dynamic content
- Lazy-load audio files (only when needed)
- Test on low-end devices and slow connections

## File Organization

### What Goes Where
- **Core app logic:** `neurodivergent-app.js`
- **Core app styles:** `neurodivergent-styles.css`
- **Core app HTML:** `neurodivergent-app.html`
- **PWA config:** `manifest.json`, `service-worker.js`
- **Audio files:** `audio/` directory (optional, not in repo)
- **Icons:** `icon-192.svg`, `icon-512.svg` (SVG format)
- **Legacy/experiments:** `backup/` directory
- **Documentation:** Root directory markdown files

### LocalStorage Keys (all prefixed with `youreok_`)
- `youreok_theme` — Current theme selection
- `youreok_fontSize` — Font size setting
- `youreok_fontFamily` — Font family choice
- `youreok_userName` — Optional user's name
- `youreok_pronouns` — Optional user's pronouns
- `youreok_reducedMotion` — Motion preference
- `youreok_reducedEmoji` — Emoji preference
- `youreok_moodHistory` — Array of mood check-ins
- `youreok_journalEntries` — Array of journal entries
- `youreok_breathingSessions` — Count of breathing sessions
- `youreok_favoriteQuotes` — Array of saved quotes
- `youreok_daysUsed` — Days app has been used
- `youreok_firstVisit` — First visit timestamp

## Do Not

❌ **Never:**
- Add external JavaScript libraries or frameworks (React, Vue, jQuery, etc.)
- Add build tools (Webpack, Rollup, Parcel, etc.)
- Add CSS preprocessors (Sass, Less, Stylus)
- Add package dependencies beyond http-server
- Make external API calls or fetch from external URLs
- Add analytics, tracking, or telemetry of any kind
- Store or transmit user data to any server
- Remove or hide emergency support button
- Break keyboard navigation or screen reader compatibility
- Use non-accessible color combinations
- Add features that require internet connection
- Use localStorage for sensitive data like passwords
- Make assumptions about user's mental state
- Use judgmental or dismissive language in UI text
- Add auto-playing media without user consent
- Create cookie-based storage

✅ **Always:**
- Test accessibility with keyboard and screen reader
- Maintain color contrast ratios (WCAG AA minimum)
- Keep emergency resources visible and accessible
- Use empathetic, validating language
- Preserve user privacy and data control
- Provide data export functionality
- Test offline functionality
- Follow existing code patterns and style
- Update documentation when adding features
- Test on multiple browsers and devices
- Check LocalStorage limits (typically 5-10MB)
- Respect user's motion and emoji preferences
- Validate all user inputs
- Handle errors gracefully with helpful messages

## Troubleshooting

### App Not Loading
1. Check browser console for JavaScript errors
2. Verify file paths are correct (case-sensitive)
3. Clear browser cache and reload
4. Check if service worker is interfering (disable in DevTools)
5. Try incognito/private mode to rule out extensions

### LocalStorage Not Persisting
1. Check browser privacy settings (some browsers block in private mode)
2. Verify localStorage isn't full (quota typically 5-10MB)
3. Check for JavaScript errors before save operation
4. Confirm localStorage is enabled in browser settings

### PWA Not Installing
1. Must be served over HTTPS (or localhost for testing)
2. Check manifest.json is valid JSON
3. Verify service worker is registered
4. Check browser console for PWA install errors
5. Some browsers require user interaction first

### Themes Not Applying
1. Check CSS custom property syntax
2. Verify data-theme attribute is set on root element
3. Clear browser cache
4. Check for CSS specificity conflicts
5. Inspect element in DevTools to see applied styles

## Code Review Checklist

When reviewing or writing code for this project:

### Functionality
- [ ] Feature works as intended in all supported browsers
- [ ] No JavaScript errors in console
- [ ] LocalStorage operations work correctly
- [ ] Offline functionality not broken
- [ ] All interactive elements respond to user input

### Accessibility
- [ ] Proper semantic HTML used
- [ ] ARIA labels added where needed
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Works with screen reader (tested in at least one)
- [ ] Reduced motion preferences respected

### Privacy & Security
- [ ] No external network calls added
- [ ] No analytics or tracking code
- [ ] No PII collected or transmitted
- [ ] LocalStorage keys properly prefixed
- [ ] User can export/delete their data
- [ ] No inline event handlers (use addEventListener)

### Code Quality
- [ ] Follows existing code style and patterns
- [ ] Functions are reasonably sized and focused
- [ ] Complex logic has explanatory comments
- [ ] No console.log statements left in production code
- [ ] Variable and function names are descriptive
- [ ] No dead code or commented-out blocks

### User Experience
- [ ] Language is empathetic and supportive
- [ ] Error messages are helpful, not technical
- [ ] Loading states handled (if applicable)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works well with all theme options
- [ ] Works well with all font size options
- [ ] Emergency button remains visible and functional

### Testing
- [ ] Manually tested in Chrome/Edge
- [ ] Manually tested in Firefox
- [ ] Manually tested in Safari (if possible)
- [ ] Tested on mobile device (iOS and/or Android)
- [ ] Tested with keyboard only (no mouse)
- [ ] Tested offline (service worker)
- [ ] Tested with different theme/font settings
- [ ] Tested data persistence (close/reopen)

## AI Chatbot Guidelines

The AI chatbot in `neurodivergent-app.js` uses pattern matching. When modifying:

### Response Patterns
- **Validate feelings:** "It's completely understandable to feel..."
- **Provide coping:** "Here are some strategies that might help..."
- **Normalize experience:** "Many neurodivergent people experience..."
- **Offer resources:** "You might find the [Feature] helpful..."
- **Encourage self-care:** "Remember to be gentle with yourself..."

### Keywords to Recognize
- **Overwhelm:** overwhelmed, too much, can't handle, drowning
- **Sensory:** sensory, loud, bright, texture, sounds, smells
- **Social:** social, people, conversation, masking, exhausting
- **Focus:** focus, concentrate, attention, distracted, ADHD
- **Anxiety:** anxious, worried, panic, stress, nervous
- **Burnout:** burnout, exhausted, tired, drained, shutdown
- **Stimming:** stimming, fidget, pacing, rocking
- **Meltdown/Shutdown:** meltdown, shutdown, can't speak

### Never
- Diagnose or provide medical advice
- Dismiss or minimize feelings
- Use "just" (e.g., "just calm down")
- Provide toxic positivity
- Suggest the user is broken or needs fixing
- Replace professional help (always mention resources)

## Additional Resources

### Documentation
- `README.md` — Project overview and game features
- `README-NEURODIVERGENT.md` — Detailed app features and usage
- `QUICK-START.md` — User quick start guide
- `audio/README-AUDIO.md` — Audio file sources and setup
- `IMPLEMENTATION_COMPLETE.md` — Current implementation status

### External References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [LocalStorage Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Crisis Resources](https://988lifeline.org/)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+  
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

---

## Quick Reference

**Main App Entry Point:** `neurodivergent-app.html`  
**Start Development Server:** `npm start`  
**Test Offline:** DevTools → Network → Offline  
**View Storage:** DevTools → Application → LocalStorage  
**Accessibility Test:** Tab through entire app without mouse  
**Emergency Resources:** Always visible in top-right corner

**Most Important Rules:**
1. Privacy first - no external calls ever
2. Accessibility always - test with keyboard and screen reader
3. Empathy in all UI text - validate, never judge
4. No frameworks or build tools - keep it simple
5. LocalStorage only - user controls their data

---

*For questions or clarifications, refer to README files or examine existing code patterns.*
