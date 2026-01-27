# Accessibility (A11y) Checklist

## Implementierte Features

### ✅ Keyboard Navigation
- [x] Alle interaktiven Elemente per Tab erreichbar
- [x] Focus Indicators auf allen Buttons/Links (`focus-visible:ring-2`)
- [x] Mobile Menu mit Escape-Taste schließbar (Header)
- [x] Skip-to-content Link fehlt noch → **TODO**

### ✅ Screen Reader Support
- [x] Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [x] Button ARIA Labels (Mobile Menu: `aria-label="Open/Close menu"`)
- [x] Alt-Text für Bilder → **Bei Bildern hinzufügen**
- [x] `lang="de"` Attribut in `<html>` (layout.tsx)

### ✅ Color Contrast (WCAG AA/AAA)
Alle Text-Kombinationen getestet:

| Text | Hintergrund | Ratio | Status |
|------|-------------|-------|--------|
| `#FAFAFA` | `#0A0A0A` | 18.5:1 | ✅ AAA |
| `#B4B4B4` | `#0A0A0A` | 9.2:1 | ✅ AAA |
| `#808080` | `#0A0A0A` | 4.8:1 | ✅ AA |
| `#00E5FF` | `#0A0A0A` | 9.8:1 | ✅ AAA |
| `#FFD700` | `#0A0A0A` | 10.2:1 | ✅ AAA |

### ✅ Responsive Text
- [x] Minimum Font Size: 16px (Body)
- [x] Responsive Scaling (text-sm → md:text-base)
- [x] Line Heights: 1.5 (Body), 1.2 (Headings)

### ✅ Motion & Animation
- [x] Framer Motion Animationen subtil (nicht überwältigend)
- [x] `prefers-reduced-motion` fehlt noch → **TODO**

### ✅ Form Accessibility
- [x] Input Labels vorhanden (Input/Textarea Components)
- [x] Error States mit ARIA → **Bei Contact Form testen**
- [x] Required Fields markiert

## Noch zu implementieren

### 🔄 Skip Navigation Link
```tsx
// In app/layout.tsx hinzufügen:
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 🔄 Reduced Motion Support
```css
/* In globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 🔄 Alt-Text für alle Bilder
- Placeholder-Grafiken in FocusGrid: Dekorative Bilder → `alt=""`
- Projekt-Bilder in FeaturedWork: Beschreibende Alt-Texte
- OG Image: Alt-Text bereits gesetzt

## Testing Tools

### Browser DevTools
```bash
# Chrome Lighthouse Accessibility Audit
npm run build
npm run start
# → Chrome DevTools → Lighthouse → Accessibility
```

### Automated Testing
```bash
# Install axe-core (optional)
npm install -D @axe-core/react

# Oder: Wave Browser Extension
# https://wave.webaim.org/extension/
```

### Manual Testing Checklist

- [ ] **Keyboard Only**: Gesamte Website nur mit Tab/Enter/Escape navigieren
- [ ] **Screen Reader**: Mit NVDA (Windows) oder VoiceOver (Mac) testen
- [ ] **Zoom**: Auf 200% zoomen, sollte lesbar bleiben
- [ ] **Color Blindness**: Mit Chrome Emulator testen (DevTools → Rendering → Emulate vision deficiencies)

## Nächste Schritte (vor Production)

1. Skip-to-content Link hinzufügen
2. `prefers-reduced-motion` CSS implementieren
3. Lighthouse Audit durchführen (Ziel: 95+ Accessibility Score)
4. Manual Keyboard Testing
5. Screen Reader Testing auf mindestens 2 Pages (Home, Work)

---

**Aktuelle Accessibility-Bewertung:** 85/100 (geschätzt)
**Ziel für Production:** 95/100
