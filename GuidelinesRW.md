# Design System

This project uses the following design system packages. Please read them before anything else.


# Rightway Member App — Design System Guidelines

> **Source file:** `01 Mobile Web - Member Library` (Figma file key: `5r1Jj8okimVP0wIaGGCKh5`)
> **Parent system:** `00 Global Library` (file key: `kiaK8hxoUQyeDN9Qilho9B`)
> **Scope:** The Rightway Member App — iOS, Android, mobile web, and desktop web. Covers all three product modes (PBM, Nav, Unity), the full screen architecture, component inventory, and mode-specific behavior.
> **Audience:** Designers, engineers, Figma Make, Code Connect agents, and any tool generating UI from this library.

---

## 0. How to Read This Document

This file is the single source of truth for generating Member App UI. It inherits all foundations (color primitives, typography scale, spacing, radius) from the Global Library `guidelines.md` and adds the **member-app-specific layer**: modes, layouts, mode-aware components, and screen patterns.

### 0.0 Mandatory Code References — Read Before Generating UI

> **STOP:** If the requested screen matches one of the three references below, do not begin implementation from prose, screenshots, Figma-generated snippets, or the component descriptions later in this document. Fetch and inspect the **entire matching runnable project**, including root `index.html`, `package.json`, `src/main.jsx`, `src/App.jsx`, and `styles.css`. These files are production-build-verified executable specifications and are the highest-authority source for project structure, markup hierarchy, layout, responsive behavior, asset selection, and interaction structure.

**Repository folder:** [reference-implementations](https://github.com/uxrightway/assets/tree/main/reference-implementations)

**Moving raw base:** `https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/`

**Verified pinned base:** `https://raw.githubusercontent.com/uxrightway/assets/1aba094/reference-implementations/`

| Requested screen or closely related screen | Mandatory React source | Mandatory CSS source | README / runnable folder |
| --- | --- | --- | --- |
| PBM mobile home, medication home, Pharmacy Guide home, or any request to recreate the approved mobile home | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/styles.css) | [mobile-home](https://github.com/uxrightway/assets/tree/main/reference-implementations/mobile-home) |
| Mobile internal page, Prior Authorization detail, request detail, or a screen using the back/avatar/call internal shell | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/styles.css) | [mobile-prior-authorization](https://github.com/uxrightway/assets/tree/main/reference-implementations/mobile-prior-authorization) |
| Nav-mode desktop web home, desktop side-navigation home, or desktop Guide/requests home | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/styles.css) | [web-nav-home](https://github.com/uxrightway/assets/tree/main/reference-implementations/web-nav-home) |

**Required agent procedure:**

1. Classify the request as mobile PBM home, mobile internal, web Nav home, or another screen.
2. If it matches or extends a reference above, fetch or copy the **complete matching folder**, not only `App.jsx` and `styles.css`.
3. Determine the execution environment. In Figma Make, Lovable, or another managed React generator, preserve and use the platform's existing scaffold, entry point, routing, dependencies, and build workflow. For a new standalone/local project only, confirm the project has the entry files required by its selected toolchain.
4. Reuse the component hierarchy and CSS behavior. Adapt content only where the requested screen requires different data.
5. Use this Markdown for tokens, product-mode rules, accessibility, and behavior not expressed in the reference code.
6. Validate using the commands or preview workflow supported by the current environment. For the standalone reference folders, run `npm install`, `npm run dev`, and `npm run build`. Resolve implementation errors before handoff.

**Failure rule:** An agent response is incomplete if it claims to reproduce one of these screens without first reading the matching runnable project. Do not recreate the reference from memory, from a screenshot alone, or from copied prose in this file. Do not substitute a generic component library when the reference supplies the component. Do not claim that Figma Make or Lovable needs a newly created Vite shell when the platform already owns the React scaffold. Use the platform's native preview/build workflow and modify only the application files needed for the requested screen.

#### 0.0.1 Execution Environment Rules

First identify which of these environments is active:

1. **Managed React generator — Figma Make, Lovable, or similar:** The platform already creates and manages the React project. Keep its existing entry files, router, package configuration, component conventions, and preview/build setup. Implement the screen inside that scaffold. Do **not** initialize a second project, force Vite, replace the platform configuration, or require the user to supply `index.html`.
2. **Existing user repository:** Inspect and preserve the repository's current framework and toolchain. Add the screen using its existing structure. Do not convert the project to Vite unless the user explicitly requests that migration.
3. **New standalone/local reference with no application scaffold:** Create a complete runnable project using the chosen toolchain. The GitHub reference implementations use Vite, so a newly copied standalone reference should preserve this minimum structure:

```text
project-root/
├── index.html
├── package.json
├── src/
│   ├── main.jsx
│   └── App.jsx
└── styles.css
```

For the **standalone Vite case only**, the root `index.html` is mandatory because Vite uses it as the application entry module:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rightway Member App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

For the **standalone Vite case only**, the minimum `src/main.jsx` must mount the screen and load its stylesheet:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

The standalone `package.json` must include working `dev` and `build` scripts and the React/Vite dependencies used by the implementation.

**Required verification behavior:**

- In Figma Make or Lovable, use the platform's native preview, diagnostics, and build/publish checks. Do not run or report a standalone Vite build unless that command is actually supported by the generated project.
- In an existing repository, use the scripts and package manager already defined by that repository.
- In a standalone Vite reference, run `npm run build`. If Vite reports `Could not resolve entry module "index.html"`, restore the root `index.html` shown above and rerun the build.
- Never present a toolchain mismatch as a UI implementation failure. State which environment-specific verification was actually performed.

#### 0.0.2 Prototype Output Format — Zero-Setup HTML + Framework Source

This guide is used in Cursor, VS Code, Claude, ChatGPT, and other general AI tools by people with mixed technical experience. A prototype should be viewable without Node.js, package installation, or terminal commands.

**Default for a new prototype in a general AI/code tool:**

- Generate a self-contained index.html that opens directly in a browser.
- For one screen, prefer embedded style and script blocks. For multiple screens, index.html, styles.css, and app.js are acceptable when all paths are relative and no server is required.
- Use semantic HTML and standard browser JavaScript. Do not require React, Vite, npm, pnpm, a bundler, or a local server merely to preview the design.
- Preserve keyboard behavior, screen-reader labels, focus states, hover/pressed states, and card/CTA interactions.
- Use direct raw.githubusercontent.com asset URLs or a relative assets folder. Never use GitHub blob URLs as image sources.

**Managed prototyping platforms:**

- In Figma Make, Lovable, or another platform that already runs React, preserve the platform's native project and preview. Do not request static HTML, initialize Vite, or replace its scaffold unless the user explicitly asks for an export.

**Existing product repositories:**

- Preserve the repository's framework. React repositories remain React. Do not replace production framework code with standalone HTML merely because a zero-setup prototype exists.

**Recommended GitHub reference structure — keep both formats:**

1. prototype/index.html — zero-setup preview for broad AI-tool compatibility and nontechnical review.
2. react/ or the existing framework folder — componentized, production-oriented source.
3. README.md — explains which file opens instantly and which commands apply only to the framework version.

The HTML and framework versions must share the same copy, tokens, asset paths, accessibility behavior, and visual measurements. HTML is the preview and accessibility baseline; React is the component and application-integration reference. Do not keep only generated dist output because hashed filenames are difficult for humans and AI agents to understand and maintain.

**Availability fallback:** If external URL access is unavailable, explicitly report that the mandatory code reference could not be fetched. Then use the detailed specifications in this document as a fallback and state that exact parity is not verified. Never silently skip the reference.

**Order of resolution when generating code:**

1. Does a matching executable reference exist in `reference-implementations/`? → Fetch and follow its React and CSS source.
2. Does the Member Library define additional or screen-specific guidance here? → Apply it without contradicting the executable reference.
3. Does the Global Library define an otherwise unspecified foundation? → Inherit from Global.
4. None of the above? → Flag as a gap; do not invent.

**Critical rule — mode awareness:** Every screen in the Member App renders under one of three modes (PBM, Nav, Unity). Generators must know the active mode before selecting copy, icons, navigation, quick actions, or tab structure. Section 2 defines these modes completely.

### 0.1 Parent Global Library Source

The parent Figma file is `00 Global Library`:

- **Figma file key:** `kiaK8hxoUQyeDN9Qilho9B`
- **Reference URL:** `https://www.figma.com/design/kiaK8hxoUQyeDN9Qilho9B/00-Global-Library`
- **Observed page:** `📸 Cover` (`7:2`)
- **Reference frame:** `cover` (`5122:300`)
- **Library type:** Foundation
- **Status:** Live
- **Library feature set:** Component, Documentation, Themes, Styles, Sticker sheet

This Member App document must treat the Global Library as the parent foundation for role colors, type styles, spacing, radius, accessibility, and shared component behavior. When a Global token is listed here and a Member token is also listed, the Member token is an extension or product-specific override, not a replacement for the entire Global system.

### 0.2 Web Redesign Source

The desktop web layout is documented from the `Redesign Final` Figma file:

- **Figma file key:** `GBnpZ4Q7farD7jFw5MZKjM`
- **Home reference:** `Home` (`143:68750`) — top actions header + left menu + home content with Guide banner
- **Internal reference:** `In Progress Collapsed` (`10499:24433`) — top actions header + left menu + internal content card with back button
- **Reference URLs:**
  - `https://www.figma.com/design/GBnpZ4Q7farD7jFw5MZKjM/Redesign-Final?node-id=143-68750`
  - `https://www.figma.com/design/GBnpZ4Q7farD7jFw5MZKjM/Redesign-Final?node-id=10499-24433`

**Critical rule — platform awareness:** Mobile and desktop web share brand, tokens, copy conventions, and mode rules, but they do **not** share chrome. Mobile uses status bar, hero, and bottom navigation. Desktop web uses a blue top actions header, persistent left side menu, and centered 1280px workspace. Do not generate a phone-frame layout for desktop web.

---

## 1. Product Overview

### 1.1 What the Member App Does

The Rightway Member App is the front door for members (employees of Rightway's client companies) to:

- Access their pharmacy benefits and find lowest drug prices (PBM)
- Get help from a human Pharmacy Guide or Health Guide
- Find providers, schedule care, ask billing questions, and manage benefits (Nav)
- See medication and care information together in one experience (Unity)

### 1.2 The Guide is the Product

Every home screen in every mode leads with a **Guide panel** — a human-first module with Chat / Call / Inbox actions and a real photograph of the member's guide. This is not decoration. It is the brand promise rendered as UI. Generators should never demote, collapse, or move the Guide panel below the fold on the home screen.

---

## 2. The Three Modes

The Member App runs in one of three modes. The mode is determined by the member's employer's plan configuration and is known at app launch. It changes:

| Layer         | What changes by mode                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Navigation    | Mobile bottom nav by mode; desktop web `Menu / Web / Side` with active page row                  |
| Guide copy    | "Pharmacy Guides" (PBM) vs "Health Guides" (Nav, Unity)                                         |
| Quick actions | Pharmacy-themed (PBM), Care-themed (Nav), Mixed with overflow (Unity)                           |
| Search bar    | Present (PBM, Unity Medications tab); absent (Nav)                                              |
| Home sections | Medications (PBM), Active Requests (Nav), Segmented tabs over both (Unity)                      |
| Tabs          | None (PBM, Nav); 2-segment tab (Unity home only)                                                |

Unless a section explicitly says "desktop web", the mode structures below describe the mobile / mobile-web implementation. Desktop web uses the same mode logic but the web shell and layout rules in §4.6–§4.9.

### 2.1 PBM Only Mode

**Who it's for:** Members whose employer has purchased only Rightway's pharmacy benefits management.
**Scope:** Medication pricing, mail order, prescription help. No general care navigation.

**Home screen structure (top to bottom):**

1. Hero (dark blue, 207px tall)
   - Status bar + dynamic island
   - Top actions row: Logo (left), ID card icon, User Profile icon
   - Guide panel: "Our **Pharmacy Guides** are humans, here to help. ❤" + Chat / Call / Inbox + Pharmacy Guide portrait
2. Search section: "Find the lowest drug prices" title + search input "Search for the best drug price..."
3. Quick Actions ("How Can We Help You Today?") — **3 cards**: Price a drug, Mail order, (third pharmacy action)
4. Medications section:
   - Empty state: "Once we have information about your current medications, they'll appear here." with a pill icon
   - With data: stacked `Feature Cards / Medications Snapshot / Mobile` (variants 152px and 231px tall) with a "See All" link in the header
5. Recommended for you — `Feature Cards / Recommended` horizontal carousel
6. Bottom nav: `Navigation / Mobile / PBMOnly`

**Guide copy convention:** Always "Pharmacy Guide(s)" in PBM-only. Never "Health Guide" or "Care Guide" in this mode.

**Bottom nav tabs (PBMOnly):** Home, Medications, Benefits, Bill Support, (4 tabs total, centered — no "Get Care").

### 2.2 Nav Only Mode

**Who it's for:** Members whose employer has purchased only care navigation (no pharmacy benefits).
**Scope:** Finding providers, scheduling appointments, understanding benefits, billing questions, clinical guidance.

**Home screen structure:**

1. Hero (same structure as PBM, but copy changes)
   - Guide panel: "Our **Health Guides** are humans, here to help. ❤"
2. **No search bar.** (Nav does not have drug price search.)
3. Quick Actions ("How Can We Help You Today?") — **5 cards with horizontal scroll + chevron**: Find a Provider, Schedule Appointment, Benefits, Bill Question, Clinical Guidance
4. Active Requests section (when requests exist):
   - Section title + "See All" link
   - Stacked `Feature Cards / Requests` (heights: 168, 128, 207 — variable per request type)
5. Recommended for you
6. Bottom nav: `Navigation / Mobile / NavOnly`

**Empty state:** Skips the Active Requests section entirely, going Hero → Quick Actions → Recommended.

**Get Care sub-screen (accessed via nav):** 3 full-width cards stacked vertically:

- Recommend a Provider (with "Let Rightway do the work. Your health guide will find you three high quality providers." + chip tag)
- Provider Search (with "Explore thousands of doctors and facilities who take your insurance." + chip tag)
- Saved Providers (with "Your saved providers and facilities.")

**Guide copy convention:** Always "Health Guide(s)" in Nav-only. The heart emoji ❤ is retained.

**Bottom nav tabs (NavOnly):** Home, Get Care, Benefits, Bill Support, (4 tabs).

### 2.3 Unity Mode

**Who it's for:** Members whose employer has purchased both PBM and Nav. This is the full Rightway product.
**Scope:** Everything — medications, care, benefits, bills, clinical guidance, partner solutions.

**Home screen structure — key difference:** A **2-segment tab** (`Tabs / 2 segment V2`) appears directly below the Hero, letting the member switch between a **Medications tab** and a **Requests tab**.

**Unity home — Medications tab:**

1. Hero (with "Our **Health Guides** are humans, here to help. ❤")
2. 2-segment tab: [Medications | Requests] — Medications active
3. Search bar: "Find lowest drug prices"
4. Quick Actions — **3 pharmacy-themed cards** (same as PBM)
5. Medications list: stacked `Feature Cards / Medications Snapshot / Mobile`
6. Recommended for you
7. Bottom nav: `Navigation / Mobile / Unity`

**Unity home — Requests tab:**

1. Hero (same)
2. 2-segment tab: Requests active
3. **No search bar.**
4. Quick Actions — **5 care-themed cards with overflow chevron** (same as Nav)
5. Active Requests (or empty state)
6. Recommended for you
7. Bottom nav: `Navigation / Mobile / Unity`

**Bottom nav tabs (Unity):** Home, Medications, Get Care, Benefits, Bill Support (5 tabs — the full set).

### 2.4 Mode Selection Rules for Generators

When generating any screen, the agent must:

1. **Know the mode.** If unknown, assume Unity (the most feature-complete) and flag it.
2. **Pick the right navigation for the platform.** Mobile uses the mode-correct bottom-nav instance. Desktop web uses `Menu / Web / Side` with the active row matching the current page.
3. **Use the right Guide copy.** "Pharmacy Guide" for PBM; "Health Guide" for Nav and Unity.
4. **Respect the search-bar presence rule.** Search appears on PBM home and Unity Medications tab. Never on Nav.
5. **Respect the tabs rule.** On mobile, the 2-segment tab appears **only** on the Unity home screen. On desktop web, only add a segment control when the web redesign defines it.
6. **Respect the Quick Actions count rule.** Mobile PBM = 3 cards; mobile Nav/Unity Requests = 5 cards with horizontal scroll and a visible chevron affordance. Desktop web uses the action labels and layout defined in §4.8.

---

## 3. Foundations (Member Library tokens)

The Member Library extends the Global Library color primitives with a richer palette. These tokens are resolved from actual Figma variable definitions on the Member Library screens.

### 3.1 Color — Global + Member Foundation Primitives

These palettes come from the `00 Global Library` color page (`5:104`, frame `6:271`) plus the Member-specific extensions already used by the Member App.

#### Global Role Colors (inherited)

These role colors come from the parent `00 Global Library` Figma file and should be available to Member App generators before applying Member-specific extensions.

| Token              | Hex       | Use                                                     |
| ------------------ | --------- | ------------------------------------------------------- |
| `Text / Primary`   | `#282828` | Default readable text on light surfaces                 |
| `Text / Secondary` | `#747474` | Secondary labels, metadata, captions, subdued copy      |
| `Text / Disabled`  | `#A7A7AC` | Disabled text and inactive controls                     |
| `Icon / Primary`   | `#282828` | Default icon color when an icon accompanies primary text |

**Rule:** Use role tokens (`Text / Primary`, `Text / Secondary`, `Icon / Primary`) for generic UI text/icons. Use foundation colors only when a component specifically calls for brand, semantic, mode, or feature styling.

#### Foundation Color Ramps

| Step | Blue | Olive | Orange | Black | White |
| ---- | ---- | ----- | ------ | ----- | ----- |
| `50`  | `#E7E9EF` | `#FDFFFC` | `#FFF4F0` | `#E6E6E6` | `#FFFFFF` |
| `100` | `#B6BCCD` | `#F9F9F7` | `#FEDED0` | `#B0B0B0` | `#FFFFFF` |
| `200` | `#848CA0` | `#F6F7F3` | `#FECDB9` | `#8A8A8A` | `#FFFFFF` |
| `300` | `#606E93` | `#F2F3EE` | `#FEB798` | `#545454` | `#FFFFFF` |
| `400` | `#41527E` | `#F0F1EA` | `#FDA985` | `#333333` | `#FFFFFF` |
| `500` | `#12275E` | `#ECEDE5` | `#FD9366` | `#000000` | `#FFFFFF` |
| `600` | `#102356` | `#D7D8D0` | `#E6865D` | `#000000` | `#E8E8E8` |
| `700` | `#0D1C43` | `#A8A8A3` | `#B46848` | `#000000` | `#B5B5B5` |
| `800` | `#0A1534` | `#82827E` | `#8B5138` | `#000000` | `#8C8C8C` |
| `900` | `#081027` | `#636460` | `#633A2B` | `#000000` | `#6B6B6B` |

**Common use:** `blue-500` is the primary Member brand blue. `blue-700` is the deepest hero-gradient stop. `orange-500` is the primary orange accent for badges and recommendation highlights. `olive-200` is the soft Global page/background wash.

#### Feature Color Ramps

These colors tag content categories within cards and recommendations. They are **decorative accents**, not state signals.

| Step | feature1 | feature2 | feature3 | feature4 |
| ---- | -------- | -------- | -------- | -------- |
| `50`  | `#F9FBFF` | `#ECEDE5` | `#FBF8FB` | `#FFFBF2` |
| `100` | `#EBF4FF` | `#E8F1DE` | `#F2E8F3` | `#FFF4D5` |
| `200` | `#EEF2F2` | `#DDE7CE` | `#EBDDED` | `#FFEEC1` |
| `300` | `#D4E7FF` | `#CEDCB7` | `#E2CDE4` | `#FFE7A5` |
| `400` | `#CCE2FF` | `#C5D5A9` | `#DDC4DF` | `#FFE294` |
| `500` | `#BFDBFF` | `#B6CB94` | `#D4B5D7` | `#FFDB79` |
| `600` | `#AEC7E8` | `#A6B987` | `#C1A5C4` | `#E8C76E` |
| `700` | `#899BB5` | `#819069` | `#978199` | `#B59B56` |
| `800` | `#69788C` | `#647051` | `#756476` | `#8C7843` |
| `900` | `#505C6B` | `#4C553E` | `#594C5A` | `#6B5C33` |

**Rule:** When a card uses a feature color, pair it with the same feature family (e.g. feature1-200 background + feature1-900 caption). Never mix families within a single card.

#### Semantic Color Ramps

| Step | Alert | Success | Disabled |
| ---- | ----- | ------- | -------- |
| `50`  | `#FBEEEE` | `#F2F5EE` | `#F3F3F3` |
| `100` | `#FBE5E5` | `#D8E0CB` | `#D9D9D9` |
| `200` | `#F8D0D0` | `#C5D1B2` | `#C6C6C6` |
| `300` | `#F1B0B0` | `#ABBB8F` | `#ACACAC` |
| `400` | `#E78282` | `#9AAE79` | `#9C9C9C` |
| `500` | `#D85151` | `#819A58` | `#838383` |
| `600` | `#B40707` | `#1A642C` | `#777777` |
| `700` | `#993A3A` | `#12471F` | `#5D5D5D` |
| `800` | `#751414` | `#0E3718` | `#484848` |
| `900` | `#5B2222` | `#0B2A12` | `#373737` |

Use `alert-600` for destructive/error text, `success-500` for resolved/positive state, and `disabled-700` for disabled text on disabled backgrounds unless a component defines a more specific semantic step.

### 3.2 Gradients

The redesign introduces two shared gradients for React Native CLI, Expo, and web. Use the same stop values across platforms. Start/end values are approximate mappings from the Figma gradient transform; validate each platform visually.

| Source token/style          | Implementation alias | Colors                          | Locations        | Web CSS                                                             | Native start/end                                   | Radius | Use                                                |
| --------------------------- | -------------------- | ------------------------------- | ---------------- | ------------------------------------------------------------------- | -------------------------------------------------- | ------ | -------------------------------------------------- |
| `PrimaryDark`               | `hero`               | `#0D1C43`, `#142C6B`, `#102356` | `[0, 0.5039, 1]` | `linear-gradient(225deg, #0D1C43 0%, #142C6B 50.39%, #102356 100%)` | `start: { x: 1, y: 0 }`, `end: { x: 0, y: 1 }`    | `16px` | Hero gradient, dark promotional cards              |
| `Gradients/SecondaryLight`  | `latestUpdate`       | `#ECCB6A`, `#FFA278`            | `[0, 1]`         | `linear-gradient(135deg, #ECCB6A 0%, #FFA278 100%)`                 | `start: { x: 0.15, y: 0 }`, `end: { x: 1, y: 1 }` | `16px` | Latest Update cards, warm highlight/decision cards |

The `00 Global Library` color page (`5:104`) also shows these gradient swatches:

| Source swatch | Colors | CSS approximation | Use |
| ------------- | ------ | ----------------- | --- |
| Background gradient | `#FFFFFF`, `#F5F5F5` | `linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)` | Light page/section washes |
| Primary Dark gradient | `#11255B`, `#224291`, `#0F1B3D` | `linear-gradient(105deg, #11255B 13.17%, #224291 80.51%, #0F1B3D 117.07%)` | Parent Global dark gradient swatch |
| Secondary Light gradient | `#ECCB6A`, `#FFA278` | `linear-gradient(58deg, #ECCB6A 20.12%, #FFA278 91.83%)` | Parent Global warm highlight swatch |

For Member App implementation, prefer the shared `hero` and `latestUpdate` token values above unless a task explicitly asks to reproduce the parent Global color page swatches.

**Implementation token:**

```ts
export const gradients = {
  hero: {
    colors: ['#0D1C43', '#142C6B', '#102356'],
    locations: [0, 0.5039, 1],
    native: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
    web: 'linear-gradient(225deg, #0D1C43 0%, #142C6B 50.39%, #102356 100%)',
  },
  latestUpdate: {
    colors: ['#ECCB6A', '#FFA278'],
    locations: [0, 1],
    native: { start: { x: 0.15, y: 0 }, end: { x: 1, y: 1 } },
    web: 'linear-gradient(135deg, #ECCB6A 0%, #FFA278 100%)',
  },
  radius: 16,
};
```

**Platform rule:** React Native CLI should use `react-native-linear-gradient`; Expo should use `expo-linear-gradient`; web should use native CSS `linear-gradient`. Apply `borderRadius: 16` and `overflow: hidden` on the same container that owns the gradient so background, image, and children clip together.

### 3.3 Typography (inherited)

The Member App uses the **full Global Library type scale** unchanged. Plus Jakarta Sans for H1–H5, Inter for everything else. See Global `guidelines.md` §3 for the complete scale.

#### Global Text Styles (inherited)

| Style                    | Font  | Weight    | Size | Line height | Letter spacing | Use                                                        |
| ------------------------ | ----- | --------- | ---- | ----------- | -------------- | ---------------------------------------------------------- |
| `Ω / Content / Overline` | Inter | Semi Bold | 16px | 16px        | 1px            | Uppercase section labels, metadata labels, library badges |

**Most-used styles in the Member App, for quick reference:**

| Style                        | Where it appears                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `Heading 6` (16/600 Inter)   | Card titles, section titles ("Medications", "Recommended for you")                      |
| `Heading 8` (14/600 Inter)   | Sub-card titles, guide panel heading ("Our Health Guides are humans, here to help. ❤") |
| `Heading 9` (12/600 Inter)   | Bottom nav section labels, chip tags                                                    |
| `Text Link 4` (14/700 Inter) | Primary CTA button labels                                                               |
| `Text link 5` (12/600 Inter) | Guide panel action labels ("Chat", "Call", "Inbox")                                     |
| `Text 2` (14/400 Inter)      | Card body copy, description text                                                        |
| `Text 3` (12/400 Inter)      | Helper text, metadata                                                                   |
| `Text 4` (11/400 Inter)      | Captions inside cards, legal lines                                                      |
| `Nav Tab 1` (10/700 Inter)   | Bottom tab bar labels                                                                   |

### 3.4 Shadows / Elevation

| Token   | Value                                                                                    | Use                                                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `drop1` | `type: DROP_SHADOW, color: #22183F @ 6% alpha, offset: (0, 32), radius: 51, spread: -13` | **Signature Member App card shadow.** Soft, diffuse, with a purple-tinted black. Used on elevated cards (Feature Cards, Activity Card, Partner Solution Card). |

This shadow is more diffuse and tinted than a typical Material shadow. Preserve the purple-black tint (`#22183F`) — do not substitute pure black.

CSS equivalent:

```css
box-shadow: 0 32px 51px -13px rgba(34, 24, 63, 0.06);
```

---

## 4. Screen Architecture

The Member App has a consistent screen chrome. Every primary screen follows this vertical stack:

```
┌──────────────────────────┐
│ Status Bar + Dynamic     │  44pt safe area (iOS)
│ Island                   │
├──────────────────────────┤
│                          │
│  HERO (blue)             │  Home screens: 207px
│  — top actions row       │  Internal screens: 90px (header only)
│  — (on home) guide panel │
│                          │
├──────────────────────────┤
│  (optional) Tabs         │  50px — Unity home only
│  (optional) Search       │  72px — PBM home + Unity Medications tab
├──────────────────────────┤
│                          │
│  CONTENT                 │  Scrollable.
│  — Quick Actions         │
│  — Section 1             │
│  — Section 2             │
│  — Recommended for you   │
│                          │
├──────────────────────────┤
│  BOTTOM NAV (80px)       │  Mode-specific instance
│  Home Indicator (34px)   │
└──────────────────────────┘
```

### 4.1 Canvas Dimensions

- **Design viewport:** 393×902 (iPhone 14/15 Pro width class). All components are designed at this width and stretch fluidly on wider phones (max 430) or compress down to 375.
- **Horizontal padding:** 16px on both sides at the screen edge. All cards and sections live inside a 361px content column.
- **Home indicator:** Always 34px at the bottom of the screen, with a 134×5 pill shape centered in it.

### 4.2 Hero Component (`Hero`)

The hero is the single most distinctive element of the Member App. It appears on every "primary" screen (Home for each mode + certain landing screens like Bill Support and Coverage).

**Specs:**

- Width: 393px (full-bleed)
- Height: **207px** on primary/home screens. **90px** on internal screens (top nav only).
- Background: **Rectangle 1** — `#12275E` (blue-500), rounded bottom corners (the shape extends to 174px with the remaining 33px being the rounded curve into the content below)

**Internal layout of the 207px home hero:**

```
┌─────────────────────────────────────┐  y=0
│  Status bar (54pt)                  │
│  — Dynamic island (127×36)          │
│  — Battery, WiFi, Cellular, Time   │
├─────────────────────────────────────┤  y=44
│  Top Actions (40px tall)            │
│  [Logo 128×24]          [ID] [👤]  │  16px side padding
│                          40×40 taps │
├─────────────────────────────────────┤  y=92
│  Guide Panel (115px, 361×115)       │
│  "Our [Mode] Guides are humans,     │  H8 white
│   here to help. ❤"                  │
│  [💬 Chat] [📞 Call] [📥 Inbox¹]    │  Guide portrait
│   40×40 icon circles                │  64×78 rounded
│   Text link 5 labels                │  with status dot
└─────────────────────────────────────┘  y=207
```

**Top Actions elements (left to right):**

| Element                                  | Size                     | Spec                                                       |
| ---------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| Horizontal Lockup (Rightway logo, white) | 128×24                   | White version of `Horizontal Lockup` component from Global |
| ID icon button                           | 40×40 (24px icon inside) | `Icons / Misc / IDv2` — opens digital insurance ID card    |
| User Profile icon button                 | 40×40 (24px icon inside) | `Icons / Misc / UserProfileV2` — opens Profile & Settings  |

**Guide Panel elements:**

| Element        | Spec                                                                                                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Heading        | `Heading 8` (14/SemiBold Inter), white. Text: "Our **Pharmacy Guides** are humans, here to help. ❤" (PBM) or "Our **Health Guides** are humans, here to help. ❤" (Nav, Unity). |
| Chat action    | 40×40 circle (outlined on blue bg) + `Chat` icon (15×15) + `Chat` label (Text link 5, white)                                                                                     |
| Call action    | 40×40 circle + `Call` icon + `Call` label                                                                                                                                        |
| Inbox action   | 40×40 circle + `Inbox` icon + `Inbox` label + **notification badge** (18×18 circle, orange `#FD9366`, contains numeric count in 11px white)                                      |
| Guide portrait | 64×78 rounded image + 16×16 status dot at bottom-right (green `#819A58` when guide is online)                                                                                    |

**Rules:**

- The portrait is **a real photograph of the member's assigned guide**, not a placeholder or avatar illustration.
- The status dot is present when the guide is currently available (online indicator).
- The notification badge on Inbox only appears when unread count > 0.
- The heart emoji ❤ is part of the copy — do not substitute it for a colored heart or remove it.

### 4.3 Internal Screen Header

When not on a primary home screen, the hero collapses to a **90px top header**:

- Height: 90px (status bar 50 + 40px top nav)
- Background: blue (`Internal screens` variant) or white (`Internal screens in white` variant)
- Content: `Headers / Top Nav V2` — typically a back chevron, screen title, and optional right action
- No guide panel, no search, no quick actions

**Variant selection rule:**

- **Blue header** (`Internal screens`) — when the screen is a deep dive from a hero section (e.g. medication detail, request detail)
- **White header** (`Internal screens in white`) — when the screen is settings-adjacent or content-heavy (Profile & Settings, Coverage detail)

### 4.3.1 Mobile Internal Screen Shell — Prior Authorization Example

> **Mandatory implementation reference:** Before building this shell or a related mobile internal screen, read [mobile-prior-authorization/App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/src/App.jsx) and [mobile-prior-authorization/styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/styles.css). The React reference overrides conflicting examples below.

The Prior Authorization screen in Figma [`Provider Search Filters`, node `29:1164`](https://www.figma.com/design/19LnRZ3mcwS9S1uBV4CG3h/Provider-Search-Filters?node-id=29-1164&m=dev) is the canonical example of a **mobile internal screen**. It is a drill-down destination, not a primary app section and not a bottom-navigation destination. Users reach it from contextual links, medication/request cards, alerts, or other parent screens and return through the back button.

For current internal-screen implementations, this subsection takes precedence over Section 4.3 where the older generic description conflicts with the approved example.

#### Stable internal-screen shell

The shell remains consistent while the content below it changes according to the screen's purpose:

```txt
Mobile internal screen
├── safe-area / empty status spacing
├── top action bar
│   ├── back button — left
│   └── guide actions — right
│       ├── Rightway guide avatar + availability/unread state
│       └── call button
├── screen title
└── purpose-specific content
```

- Reference width: `393 px`; use `16 px` left/right content insets.
- Default internal-screen background: olive-200 `#F6F7F3`. A purpose-specific approved design may use the blue-header variant, but it must retain the same navigation relationships.
- Preserve top safe-area spacing without drawing phone status-bar graphics unless the target platform supplies them natively.
- Top region uses `50 px` top padding followed by a `40 px` action row.
- Left control: `40 × 40` white circle, radius `90`, shadow `0 1px 12px rgba(0,0,0,.15)`, containing `Back.svg` at `24 × 24`.
- Right group: guide avatar and call button, both `40 × 40`, separated by `12 px`.
- Avatar: use `RightwayAvatarCircle.png`, cropped circularly with `object-fit: cover`. Retain the green availability dot and show the red unread badge only when its count is greater than zero.
- Call control: `40 × 40` white circle with the approved `Call.svg`, centered, and the same shadow as the back control.
- The top bar contains navigation/actions only. Place the page title below it, normally after `16 px` vertical spacing.
- Default title: Plus Jakarta Sans `24/28.8`, weight `800`, black.
- Do not render the home Guide card, home search, quick actions, recommendations, or bottom navigation automatically. Include any of these only if the specific internal-screen design explicitly requires them.
- The back control returns to the actual parent in the user's navigation history. It must not be used as a shortcut to a hard-coded home page.
- Give every icon-only control an accessible name and at least a `40 × 40` tap target.

#### Variable content rule

Everything below the title is purpose-specific. Reuse the shell without copying the Prior Authorization content into unrelated internal screens. The content region may contain summaries, forms, timelines, educational cards, provider details, scheduling controls, medication information, or other task-specific modules. Preserve the `16 px` page inset and use the standard card, type, color, spacing, and accessibility tokens from this document.

#### Canonical example: Prior Authorization detail

Reference frame: `393 × 1400`, with `40 px` bottom padding and `16 px` vertical gaps between its major modules.

1. **Title:** “Prior Authorization”.
2. **Case summary:** navy gradient card, radius `16`, padding `16`; DENIED badge; Ozempic product details; provider/phone chips; and a two-column Case ID/Request Date panel.
3. **Activity card:** white surface, radius `20`, `1 px` blue-50 border, padding `16px 16px 24px`, containing the Latest Update and expanded activity timeline.
4. **Latest Update:** orange/gold gradient card, radius `16`, padding `16`; denial message, supporting letter image, date, divider, and Explore Your Options action.
5. **Activity Timeline:** Show/Hide control and a vertical sequence of dated events. The chevron rotates with the expanded state; hiding the timeline collapses its occupied space.
6. **Education card:** “What is a prior authorization?” explanation with Learn More action.

Use the exact assets mapped in Section 11.2.3: `RightwayAvatarCircle.png`, `Back.svg`, `Call.svg`, `Denied.svg`, `Denied-1.svg`, `Provider Icon.svg`, `CallOutline.svg`, `CaseFolder.svg`, `Calnder.svg`, `PriorAuthNotApproveSupportingImage.png`, `ChatOutline.svg`, `Chevron.svg`, `Fax.svg`, `RequestInfo.svg`, `CalledProvider.svg`, `PriorAuthorizationRequest.svg`, `Layer_23.svg`, and `arrow-left-regular 1.svg`. Do not replace these with Unicode characters, generic icon libraries, CSS drawings, or screenshot crops.

#### Internal-screen classification test

Treat a mobile screen as internal when it is subordinate to another experience, has a clear parent/back destination, and is not one of the app's persistent primary navigation destinations. The presence of a page title, complex content, or a long scroll does not make it a main section. When classified as internal, start with the shell above, then implement only the content required for that screen's task.

### 4.4 Search Section

Appears between the hero and the quick actions on:

- PBM home
- Unity Medications tab

**Specs:**

- Height: 72px (19px title row + 8px gap + 45px input field)
- Title: `Heading 8` (14/600), text "Find the lowest drug prices" (PBM) or "Find lowest drug prices" (Unity)
- Search input: 361×45, white background, `radius/md` (8px), with `Icons / Misc / Search` (15×15) at 12px left padding, placeholder "Search for the best drug price..." (`Text 2`, 14/400, color `#B0B0B0`)

### 4.5 2-Segment Tab (Unity only)

**Component:** `Tabs / 2 segment V2`

- Width: 393px (full-bleed)
- Height: 50px
- Placed immediately below the 207px hero on Unity home only
- Segments: `Medications` | `Requests`
- Active segment: blue underline + `Text Link 3 Bold` (16/700) in blue-500
- Inactive segment: `Text Link 3 Bold` in blue-100 (`#B6BCCD`)
- Divider line below the tabs: 1px, color `#F2F2F2`

### 4.5.1 Approved PBM Mobile Home — Exact Current Reference

> **Mandatory implementation reference:** Before generating or editing this screen, read [mobile-home/App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/src/App.jsx) and [mobile-home/styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/styles.css). The React reference—including the corrected full Guide portrait, live recommendation overlays, three-row medication cards, and bottom-anchored active-tab indicator—overrides conflicting or superseded snippets below.

Use this subsection as the authoritative source for recreating the current populated PBM mobile home in Figma [`Provider Search Filters`, node `28:743`](https://www.figma.com/design/19LnRZ3mcwS9S1uBV4CG3h/Provider-Search-Filters?node-id=28-743&m=dev). For `platform=mobile`, `mode=PBM`, `screen=Home`, and the eligible/populated state, this section overrides conflicting guidance in Sections 2.1, 4.1, 4.2, 4.4, and 8.2.

#### Frame and required hierarchy

- Reference viewport: **393 × 1629 px**; page background olive-300 `#F2F3EE`.
- Preserve an empty **28 px status-bar spacer**, but render no time, notch/Dynamic Island, cellular, Wi-Fi, or battery graphics.
- Do not wrap the page in a large white container. Only individual cards and controls are white.
- Required order: empty spacer → gradient header/Pharmacy Guide → drug search → eligibility card → quick actions → medications → recommendations → floating bottom navigation.
- A desktop phone preview may use a 393 px centered shell and 35 px outer radius; that radius is preview chrome, not in-app content.

#### Exact geometry and styling

| Region | Approved specification |
|---|---|
| Header | `393 × 174`; `linear-gradient(153deg,#0D1C43 3%,#142C6B 44%,#102356 85%)`; bottom radius `24`. Top row begins after the 28 px spacer, is `45 px` high, and has `16 px` side insets. Logo `128 × 24`; ID/profile icons `24 × 24` in `40 × 40` targets. |
| Pharmacy Guide | `left:16; top:83; width:361; height:140`; white; radius `24`; padding `16`; shadow `0 4px 20px rgba(0,0,0,.15)`. |
| Guide copy | Max-width `300`; Plus Jakarta Sans `14/21`, weight `500`; “Pharmacy Guides” weight `600`; keep the approved two-line wrap and heart. |
| Guide actions | Chat, Call, Inbox; `24 px` gap; icon circles `40`; labels Inter `12/14.4`, weight `600`. Inbox badge `18`, red `#B40707`, white Inter `12/18`, weight `600`. |
| Guide portrait | `64 × 78`; radii `11 11 8 0`; image width about `181.67%`, left offset about `-71.91%`; crop, never stretch. |
| Search | `75 px` top padding after the guide/header region; `16 px` side inset. Heading Inter `16/19.2`, weight `600`, text “Find the lowest drug prices”; `8 px` gap. Field `361 × 45`, white, `1 px #FD9366`, radius `16`, shadow `0 1px 6px rgba(0,0,0,.15)`, padding `12`; search icon `15`; placeholder “Enter drug name”, Inter `14`. |
| Eligibility card | `361 × 132`; margin `24px 16px 0`; padding `16`; radius `20`; `linear-gradient(70deg,#ECCB6A 0%,#FFA278 100%)`; shadow `0 12px 51px -12px rgba(34,24,63,.15)`. |
| Quick actions | Margin-top `32`; side inset `16`; heading Inter `16/19.2` 600; `8 px` gap; three `112 × 98` white cards, `12 px` gaps, radius `20`, padding `12`, shadow `0 4px 12px rgba(34,24,63,.12)`. |
| Medications | Margin-top `24`; side inset `16`; three cards with `16 px` gaps. Cards: white, radius `16`, padding `12`, `1 px` blue-50 border, shadow `0 8px 18px rgba(34,24,63,.08)`. |
| Recommendations | Margin-top `24`; side inset `16`; horizontally scrollable/clipped rail, `12 px` gap; cards `305 × 152`, radius `20`, approved artwork covering each card. |
| Bottom navigation | Floating overlay at `left:16; bottom:34`; `361 × 80`; white; radius `24`; padding `12px 16px`; four equal tabs. Icons `24`; labels Inter `10` 700. Active Home is blue with a `32 × 4` orange indicator. |

#### Pharmacy Guide content

- Text: **“Our Pharmacy Guides are humans, here to help. ❤”**
- “Our” and “are humans, here to help. ❤” use weight `500`; “Pharmacy Guides” uses `600`.
- Place the three action stacks along the lower left and the portrait flush to the lower right.
- Use `avatarPharmacyHealthGuide.png` (or the production member-assigned guide portrait) with the crop above.

##### Pharmacy Guide/avatar geometry

The Guide card is one fixed component, not a loose collection of independently positioned elements. Build it as a `361 × 140 px` white card with `16 px` padding, `24 px` radius, and two vertical rows. Do not allow its content to determine a taller card.

```txt
Guide card: 361 × 140
┌─────────────────────────────────────────┐
│ Message row: 329 × 42                   │
│ “Our Pharmacy Guides”                   │
│ “are humans, here to help. ❤”           │
├─────────────────────────────────────────┤
│ Chat        Call        Inbox   Portrait│
│ 40 icon     40 icon     40 icon  64×78  │
│ label       label       label    + dot   │
└─────────────────────────────────────────┘
```

- Outer card: `box-sizing: border-box; width: 361px; height: 140px; padding: 16px; display: grid; grid-template-rows: 42px 78px; row-gap: 4px; overflow: hidden`.
- Message row: width `300 px`, Plus Jakarta Sans `14/21`. Keep the sentence as one natural text flow. At the approved 393 px viewport it wraps after **“to”**, producing line 1 **“Our Pharmacy Guides are humans, here to”** and line 2 **“help. ❤”**. Do not force a break after “Pharmacy Guides”.
- The heart is part of the sentence and follows `help.` on line 2. Do not place the heart in a separately forced third line.
- Lower row: `height: 78px; display: flex; align-items: flex-end; justify-content: space-between`.
- Actions group: three `40 × 68 px` stacks in the order Chat, Call, Inbox; group gap `24 px`. Each stack is `display:flex; flex-direction:column; align-items:center; gap:8px`.
- Action circle: exactly `40 × 40`, blue-50 `#E7E9EF`, `1 px` blue-100 border, fully circular. Center the approved `Chat.svg`, `Call.svg`, or `Inbox.svg`; do not scale icons beyond their component dimensions.
- Action label: Inter `12/14.4`, weight `600`, blue-500 `#12275E`, centered, single line.
- Inbox badge: absolute to the circle, `18 × 18`, top `-4 px`, right `-4 px`, red `#B40707`, white Inter `12/14.4` 600. Do not let the badge change circle or stack dimensions.
- Portrait column: fixed `64 × 78`, aligned to the card's right and bottom edges. It must reserve its full width in layout; the action group must not overlap it.
- Portrait frame: `position:relative; width:64px; height:78px; overflow:hidden; flex:0 0 64px; border-radius:11px 11px 8px 0`.
- When using the already prepared `avatarPharmacyHealthGuide.png`, render it as `width:100%; height:100%; object-fit:cover; object-position:center top`. Do not also apply the Figma source-bitmap `181.67%/-71.91%` crop to this prepared repository image.
- Apply the `181.67%` image width and `-71.91%` left offset only when the source is the original uncropped Figma bitmap. These values belong to the image inside the 64 × 78 clipping frame—not to the frame itself.
- Availability dot: `16 × 16`, absolute `right:-2px; bottom:-2px`, green `#819A58`, white `3 px` border, radius `50%`. Keep it visually attached to the portrait, not to the outer card corner.
- A result showing only a narrow strip of the person, an empty portrait frame, a dot separated from the portrait, or the heart on its own line is incorrect.

##### Superseded forced-wrap Guide example — do not implement

The following earlier forced-wrap example is retained only to explain the failed interpretation. It is **not** the approved home implementation. Use the final source-of-truth snippet in “Approved home containers copied from `index.html`” below.

```html
<section class="pharmacy-guide" aria-label="Your Pharmacy Guide">
  <p class="pharmacy-guide__message">
    <span>Our <strong>Pharmacy Guides</strong></span>
    <span>are humans, here to help.&nbsp;❤</span>
  </p>

  <div class="pharmacy-guide__body">
    <div class="pharmacy-guide__actions">
      <button class="guide-action" type="button" aria-label="Chat with your Pharmacy Guide">
        <span class="guide-action__icon">
          <img src="https://raw.githubusercontent.com/uxrightway/assets/main/Chat.svg" alt="">
        </span>
        <span>Chat</span>
      </button>

      <button class="guide-action" type="button" aria-label="Call your Pharmacy Guide">
        <span class="guide-action__icon">
          <img src="https://raw.githubusercontent.com/uxrightway/assets/main/Call.svg" alt="">
        </span>
        <span>Call</span>
      </button>

      <button class="guide-action" type="button" aria-label="Open your Pharmacy Guide inbox, 1 unread">
        <span class="guide-action__icon">
          <img src="https://raw.githubusercontent.com/uxrightway/assets/main/Inbox.svg" alt="">
          <b class="guide-action__badge">1</b>
        </span>
        <span>Inbox</span>
      </button>
    </div>

    <div class="pharmacy-guide__portrait">
      <img
        src="https://raw.githubusercontent.com/uxrightway/assets/main/avatarPharmacyHealthGuide.png"
        alt="Your Pharmacy Guide"
      >
      <span class="pharmacy-guide__online" aria-label="Available"></span>
    </div>
  </div>
</section>
```

```css
.pharmacy-guide {
  box-sizing: border-box;
  width: 361px;
  height: 140px;
  padding: 16px 16px 0;
  overflow: hidden;
  display: grid;
  grid-template-rows: 42px 78px;
  row-gap: 4px;
  color: #000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.pharmacy-guide__message {
  width: 300px;
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  font: 500 14px/21px "Plus Jakarta Sans", sans-serif;
}

.pharmacy-guide__message > span { white-space: nowrap; }
.pharmacy-guide__message strong { font-weight: 600; }

.pharmacy-guide__body {
  min-width: 0;
  height: 78px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.pharmacy-guide__actions {
  height: 78px;
  padding-bottom: 4px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.guide-action {
  width: 40px;
  height: 68px;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #12275e;
  background: transparent;
  font: 600 12px/14.4px Inter, sans-serif;
}

.guide-action__icon {
  position: relative;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: #e7e9ef;
  border: 1px solid #b6bccd;
  border-radius: 50%;
}

.guide-action__icon img { width: 15px; height: 15px; }

.guide-action__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  color: #fff;
  background: #b40707;
  border-radius: 50%;
  font: 600 12px/18px Inter, sans-serif;
  text-align: center;
}

.pharmacy-guide__portrait {
  position: relative;
  flex: 0 0 64px;
  width: 64px;
  height: 78px;
  overflow: visible;
}

.pharmacy-guide__portrait > img {
  width: 64px;
  height: 78px;
  display: block;
  object-fit: cover;
  object-position: center top;
  border-radius: 11px 11px 8px 0;
}

.pharmacy-guide__online {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 16px;
  height: 16px;
  background: #819a58;
  border: 3px solid #fff;
  border-radius: 50%;
}

@media (max-width: 392px) {
  .pharmacy-guide { width: calc(100vw - 32px); }
}
```

#### Eligibility card content

- Use `curveimageWeightManagment.png` on the right, clipped by the card radius.
- Copy column `285 px` wide and vertically centered within `111 px` content height.
- “You’re Eligible”: Inter `12/14.4`, 600.
- “Weight management” + line break + “Program”: Inter `16/19.2`, 600; `4 px` below eyebrow.
- “Enter Program”: blue-500 `#12275E`, Inter `14/18.2`, 700; `10 px` gap to `15 px` arrow.
- Close control: `20 × 20` white circle, top/right inset `16`, shadow `0 2px 8px rgba(206,206,206,.5)`.
- Show only for eligible members. Dismissal removes the card and collapses its space.

#### Quick actions and populated medication state

1. `PharmacyCoverage.svg` — “Find a Pharmacy”; `35 px` circle, `#BFDBFF`.
2. `Mailorder.svg` — “Switch to Mail Order”; `35 px` circle, `#E2CDE4`.
3. `TransferMedication.svg` — “Transfer a Medication”; `35 px` circle, `#FFDB79`.

Quick-action labels use Inter `12/14.4`, 600. The approved populated reference contains exactly:

1. **Enalapril 2.5mg** — orange “PRIOR AUTHORIZATION NOT APPROVED”; “Options may be available”; blue “Learn More”; `medications/enalapril.png`.
2. **Ozempic 4mg** — yellow “READY TO REFILL”; “Refills Left 1”; Walgreens logo; blue “Call”; `medications/ozempic.png`.
3. **Ozempic 4mg** — blue “NEW MEDICATION”; “Refills Left 1”; Walgreens logo; blue “Call”; `medications/ozempic.png`.

Medication image tile: `50 × 45`, blue-50, radius `12`. Drug name: Inter `16/19.2`, 600; metadata: Inter `12`; status labels: uppercase Inter `10/12`, 700, padding `4px 8px`, radius `6`. Use `PharmacyLogos/WalgreensLogo.png`, not typed replacement text.

##### Rejected compact medication-card interpretation

The compact `361 × 98` interpretation below corresponds to the incorrect `10:31` screenshots. Do **not** use it for the approved home screen. The approved `index.html` card is the taller three-row component documented later in this section.

```txt
Medication card: 361 × 98 minimum
┌─────────────────────────────────────────┐
│ ┌────────┐  Drug name                   │
│ │ 50×45  │  STATUS BADGE                │
│ │ image  │  metadata/logo       CTA     │
│ └────────┘                               │
└─────────────────────────────────────────┘
```

- Card: `width:361px; min-height:98px; padding:12px; display:grid; grid-template-columns:50px minmax(0,1fr) auto; column-gap:12px; background:#FFF; border:1px solid #E7E9EF; border-radius:16px; box-shadow:0 8px 18px rgba(34,24,63,.08)`.
- The medication image tile occupies column 1 and stays top-aligned. It is `50 × 45`, radius `12`, blue-50, `overflow:hidden`, and uses `display:grid; place-items:center`.
- Product artwork must use the medication asset from `medications/`, `max-width:100%`, `max-height:100%`, and `object-fit:contain`. Do not crop, stretch, enlarge, recolor, or replace it with circles/placeholders.
- Content occupies column 2. CTA occupies column 3 and is bottom-aligned. The CTA must never push the status badge or metadata onto a narrower artificial column.
- Drug name: first row, Inter `16/19.2`, weight `600`, black, single line; margin-bottom `8 px`.
- Status badge: second row, intrinsic width (`width:max-content`), padding `4px 8px`, radius `6`, uppercase Inter `10/12`, weight `700`; it must not stretch across the card.
- Bottom row begins `8 px` below the badge and spans content plus CTA columns. Use `display:flex; align-items:center; justify-content:space-between; gap:12px`.
- Metadata: Inter `12/18`, weight `400`, feature1-900 `#505C6B`. CTA: Inter `14/18.2`, weight `700`, blue-500 `#12275E`, aligned to the card's right edge and baseline of the metadata.
- First card state: `medications/enalapril.png`; badge text **“PRIOR AUTHORIZATION NOT APPROVED”**, orange-50 `#FFF3EE` background and dark orange/brown text; metadata **“Options may be available”**; CTA **“Learn More”**. Do not display a pharmacy logo on this card.
- Ready-to-refill state: `medications/ozempic.png`; badge **“READY TO REFILL”**, pale yellow background; the label **“Refills Left 1”** must begin with `Refill.svg` at `15 × 15` with a 4px gap; pharmacy identity remains `PharmacyLogos/WalgreensLogo.png` in the pharmacy row; CTA **“Call”**.
- New-medication state: `medications/ozempic.png`; badge **“NEW MEDICATION”**, blue-50/blue-100 background with blue-700 text; use the same `Refill.svg` + “Refills Left 1” metadata and Call CTA.
- Keep `16 px` vertical space between medication cards. Do not merge them into a list with shared dividers.
- The header above the stack is a separate row: “Medications” at left and “See All” at right. Neither belongs inside the first medication card.
- At narrow widths, keep the fixed `50 px` image and intrinsic CTA columns; only the center content column may shrink. Do not reduce icon, image, or type sizes.
- A result is incorrect if cards have unequal horizontal insets, the CTA floats at the top, badges span full width, medication artwork is cropped, Walgreens is rendered as plain text, or the metadata and CTA are not on the same bottom row.

##### Superseded compact medication markup — do not implement

This compact markup corresponds to the failed reproduction and is not authoritative. Use the final source-of-truth `med-card`, `status-row`, `drug-row`, and `option-row`/`pharmacy-row` implementation below.

```html
<section class="medications" aria-labelledby="medications-title">
  <header class="medications__header">
    <h2 id="medications-title">Medications</h2>
    <a href="#">See All</a>
  </header>

  <div class="medications__list">
    <article class="medication-card">
      <div class="medication-card__image">
        <img src="https://raw.githubusercontent.com/uxrightway/assets/main/medications/enalapril.png" alt="">
      </div>
      <div class="medication-card__content">
        <h3>Enalapril 2.5mg</h3>
        <span class="medication-status medication-status--denied">Prior authorization not approved</span>
        <div class="medication-card__bottom">
          <span class="medication-card__meta">Options may be available</span>
          <a class="medication-card__cta" href="#">Learn More</a>
        </div>
      </div>
    </article>

    <article class="medication-card">
      <div class="medication-card__image">
        <img src="https://raw.githubusercontent.com/uxrightway/assets/main/medications/ozempic.png" alt="">
      </div>
      <div class="medication-card__content">
        <h3>Ozempic 4mg</h3>
        <span class="medication-status medication-status--refill">Ready to refill</span>
        <div class="medication-card__bottom">
          <span class="medication-card__meta medication-card__pharmacy">
            <img src="https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/WalgreensLogo.png" alt="Walgreens">
            Refills Left 1
          </span>
          <a class="medication-card__cta" href="tel:18000000000">Call</a>
        </div>
      </div>
    </article>

    <article class="medication-card">
      <div class="medication-card__image">
        <img src="https://raw.githubusercontent.com/uxrightway/assets/main/medications/ozempic.png" alt="">
      </div>
      <div class="medication-card__content">
        <h3>Ozempic 4mg</h3>
        <span class="medication-status medication-status--new">New medication</span>
        <div class="medication-card__bottom">
          <span class="medication-card__meta medication-card__pharmacy">
            <img src="https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/WalgreensLogo.png" alt="Walgreens">
            Refills Left 1
          </span>
          <a class="medication-card__cta" href="tel:18000000000">Call</a>
        </div>
      </div>
    </article>
  </div>
</section>
```

```css
.medications { width: 100%; padding: 0 16px; }

.medications__header {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.medications__header h2 {
  margin: 0;
  font: 600 16px/19.2px Inter, sans-serif;
}

.medications__header a,
.medication-card__cta {
  color: #12275e;
  text-decoration: none;
  font: 700 14px/18.2px Inter, sans-serif;
}

.medications__list { display: grid; gap: 16px; }

.medication-card {
  box-sizing: border-box;
  width: 361px;
  min-height: 98px;
  padding: 12px;
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  column-gap: 12px;
  background: #fff;
  border: 1px solid #e7e9ef;
  border-radius: 16px;
  box-shadow: 0 8px 18px rgba(34, 24, 63, 0.08);
}

.medication-card__image {
  width: 50px;
  height: 45px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #e7e9ef;
  border-radius: 12px;
}

.medication-card__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.medication-card__content { min-width: 0; }

.medication-card__content h3 {
  margin: 0 0 8px;
  color: #000;
  font: 600 16px/19.2px Inter, sans-serif;
}

.medication-status {
  width: max-content;
  max-width: 100%;
  padding: 4px 8px;
  display: block;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.16px;
  font: 700 10px/12px Inter, sans-serif;
}

.medication-status--denied { color: #6a3e2b; background: #fff3ee; }
.medication-status--refill { color: #7b6630; background: #fff9ea; }
.medication-status--new { color: #12275e; background: #e7e9ef; }

.medication-card__bottom {
  min-width: 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.medication-card__meta {
  min-width: 0;
  color: #505c6b;
  font: 400 12px/18px Inter, sans-serif;
}

.medication-card__pharmacy {
  display: flex;
  align-items: center;
  gap: 5px;
}

.medication-card__pharmacy img {
  flex: 0 0 15px;
  width: 15px;
  height: 15px;
  object-fit: contain;
}

.medication-card__cta { flex: 0 0 auto; }

@media (max-width: 392px) {
  .medication-card { width: 100%; }
}
```

The superseded snippets above must not be used for the approved PBM home.

##### Approved home containers copied from `index.html` — FINAL SOURCE OF TRUTH

For the PBM home, use the following component structure and CSS. This block overrides every earlier Guide or medication-card example in this document. The correct visual references are the `10:38–10:39` screenshots of `outputs/mobile-pbm/index.html`: a naturally wrapped Guide sentence and tall, three-row medication cards. The compact `10:31` medication cards are rejected.

**Approved Guide HTML:**

```html
<section class="guide">
  <p>
    Our <strong>Pharmacy Guides</strong> are humans, here to help.
    <span>♥</span>
  </p>
  <div class="guide-body">
    <div class="guide-actions">
      <button type="button">
        <i><img src="https://raw.githubusercontent.com/uxrightway/assets/main/Chat.svg" alt=""></i>
        Chat
      </button>
      <button type="button">
        <i><img src="https://raw.githubusercontent.com/uxrightway/assets/main/Call.svg" alt=""></i>
        Call
      </button>
      <button type="button">
        <i>
          <img src="https://raw.githubusercontent.com/uxrightway/assets/main/Inbox.svg" alt="">
          <b>1</b>
        </i>
        Inbox
      </button>
    </div>
    <div class="portrait">
      <img src="assets/guide-portrait.png" alt="Your Pharmacy Guide">
      <span class="portrait-status" aria-label="Available"></span>
    </div>
  </div>
</section>
```

```css
.guide {
  position: absolute;
  top: 83px;
  left: 16px;
  box-sizing: border-box;
  width: 361px;
  height: 140px;
  padding: 16px 16px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.guide > p {
  width: 300px;
  min-height: 42px;
  margin: 0;
  white-space: normal;
  font: 500 14px/21px "Plus Jakarta Sans", sans-serif;
}

.guide > p strong { font-weight: 600; }
.guide > p span { color: #e44; }

.guide-body {
  flex: 0 0 78px;
  width: 100%;
  height: 78px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.guide-actions {
  align-self: stretch;
  height: 78px;
  padding-bottom: 4px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.guide-actions button {
  height: 68px;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #12275e;
  background: none;
  font: 600 12px/14.4px Inter, sans-serif;
}

.guide-actions i {
  position: relative;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: #e7e9ef;
  border-radius: 50%;
}

.guide-actions img { width: 15px; height: 15px; }

.guide-actions b {
  position: absolute;
  top: -3px;
  right: -5px;
  width: 18px;
  height: 18px;
  color: #fff;
  background: #b40707;
  border-radius: 50%;
  text-align: center;
  font: 600 12px/18px Inter, sans-serif;
}

.portrait {
  position: relative;
  flex: 0 0 64px;
  width: 64px;
  height: 78px;
  align-self: flex-end;
  overflow: hidden;
  border-radius: 11px 11px 8px 0;
}

.portrait > img {
  position: absolute;
  top: 0;
  left: -71.91%;
  width: 181.67%;
  height: 100%;
  max-width: none;
}

.portrait-status {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  background: #819a58;
  border: 3px solid #fff;
  border-radius: 50%;
}
```

`assets/guide-portrait.png` is the prepared Figma portrait used by the approved local page. If that file is unavailable, download the exact approved portrait before rendering; do not substitute a generic avatar. Keep the natural paragraph flow—do not split it into forced `<span>` lines.

**Approved medication HTML structure:**

```html
<section class="medications">
  <div class="section-head">
    <h2>Your medications</h2>
    <a href="#">See All</a>
  </div>
  <div id="medicationList"></div>
</section>
```

```js
const ASSET_BASE = "https://raw.githubusercontent.com/uxrightway/assets/main/";

const medications = [
  {
    name: "Enalapril 2.5mg",
    image: "medications/enalapril.png",
    status: "Prior authorization not approved",
    kind: "not-approved",
    option: true
  },
  {
    name: "Ozempic 4mg",
    image: "medications/ozempic.png",
    status: "Ready to refill",
    kind: "refill",
    pharmacy: "Walgreens",
    logo: "PharmacyLogos/WalgreensLogo.png"
  },
  {
    name: "Ozempic 4mg",
    image: "medications/ozempic.png",
    status: "New medication",
    kind: "new",
    pharmacy: "Walgreens",
    logo: "PharmacyLogos/WalgreensLogo.png"
  }
];

document.querySelector("#medicationList").innerHTML = medications.map((medication) => `
  <article class="med-card">
    <div class="status-row">
      <span class="status-label ${medication.kind}">${medication.status}</span>
      <a href="#" aria-label="Open ${medication.name}">→</a>
    </div>

    <div class="drug-row">
      <img src="${ASSET_BASE + medication.image}" alt="">
      <div class="drug-info">
        <h3>${medication.name}</h3>
        ${medication.option ? "" : `<p class="refill-meta"><img src="${ASSET_BASE}Refill.svg" alt="">Refills Left 1</p>`}
      </div>
    </div>

    ${medication.option ? `
      <div class="option-row">
        <span>Options may be available</span>
        <a href="#">Learn More</a>
      </div>
    ` : `
      <div class="pharmacy-row">
        <span>
          <img src="${ASSET_BASE + medication.logo}" alt="">
          ${medication.pharmacy}
        </span>
        <a class="call" href="#">⌕ Call</a>
      </div>
    `}
  </article>
`).join("");
```

```css
.medications { margin-top: 24px; padding: 0 16px; }

.section-head {
  display: flex;
  justify-content: space-between;
}

.section-head h2 {
  margin: 0 0 8px;
  font: 600 16px/19.2px Inter, sans-serif;
}

.section-head a {
  color: #12275e;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}

#medicationList { display: grid; gap: 16px; }

.med-card {
  padding: 12px;
  display: grid;
  gap: 12px;
  background: #fff;
  border: 1px solid #e7e9ef;
  border-radius: 16px;
  box-shadow: 0 8px 18px rgba(34, 24, 63, 0.08);
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-label {
  width: max-content;
  padding: 4px 8px;
  background: #d4e7ff;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.16px;
  font-size: 10px;
  font-weight: 700;
}

.status-label.not-approved { background: #feded0; }
.status-label.refill { background: #fff4d5; }
.status-row > a { color: #12275e; text-decoration: none; }

.drug-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 12px;
}

.drug-row > img {
  width: 50px;
  height: 45px;
  padding: 4px 0;
  object-fit: contain;
  background: #e7e9ef;
  border-radius: 12px;
}

.drug-info h3 { margin: 0; font-size: 16px; line-height: 19.2px; }
.drug-info p { margin: 7px 0 0; color: #505c6b; font-size: 12px; }

.option-row,
.pharmacy-row {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e7e9ef;
  border-radius: 12px;
  font-size: 12px;
}

.option-row a,
.call {
  padding: 7px 13px;
  color: #fff;
  background: #12275e;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
}

.pharmacy-row > span { display: flex; align-items: center; gap: 5px; }
.pharmacy-row img { width: 25px; height: 25px; object-fit: contain; }
```

**Required visual result:** each medication card has three clearly separated vertical rows: status/disclosure, medication identity, and a bordered action/pharmacy panel. It is intentionally taller than the rejected compact card. Do not collapse the third row into the drug-information row.

#### Recommendation rail

- First card: `recommendedforyou/Activity_card_Medical_Benefit.png`.
- Second card: `recommendedforyou/Activity_card_Mindfulness.png`.
- Preserve full-cover artwork, black/white category tag, `20 px` dismiss control, Inter `14` title, Inter `12` body, and white pill CTA with Inter `14` 700.
- Show part of the next card as a continuation cue.
- The PNG is the card background only. It does **not** contain the tag, title, description, dismiss control, or CTA. These must be rendered as live HTML above the image.
- Every recommendation `<article>` must contain, in order: top row with category tag and dismiss button; heading; description; CTA. A card showing only the background artwork is incomplete and must be rejected.
- Keep overlay content above the artwork with `.recommend-scroll article > * { position: relative; z-index: 1; }`.

##### Bottom-navigation active indicator

The orange Home indicator belongs at the bottom of the Home tab, below its icon and label. It must not appear above the icon or at the top edge of the navigation container. Anchor it independently of flex/DOM order:

```css
.bottom-nav a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8px;
}

.bottom-nav .active i {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 32px;
  height: 4px;
  margin: 0;
  background: #fd9366;
  border-radius: 100px;
}
```

The tab child order remains icon → label → indicator. Absolute bottom anchoring is mandatory so framework-generated spacing cannot move the indicator above the icon.

#### Required assets and raw URLs

Raw base: `https://raw.githubusercontent.com/uxrightway/assets/main/`

```text
RightWayLogo.svg
Navigation/ID.svg
Navigation/UserProfile.svg
Chat.svg
Call.svg
Inbox.svg
avatarPharmacyHealthGuide.png
Search.svg
curveimageWeightManagment.png
PharmacyCoverage.svg
Mailorder.svg
TransferMedication.svg
medications/enalapril.png
medications/ozempic.png
PharmacyLogos/WalgreensLogo.png
recommendedforyou/Activity_card_Medical_Benefit.png
recommendedforyou/Activity_card_Mindfulness.png
Navigation/Home.svg
Navigation/Medication.svg
Navigation/Benefits.svg
Navigation/Inbox.svg
```

Preserve capitalization. Encode spaces as `%20` only when constructing a raw URL. Never use the deleted `meds/` path.

#### Behavior and responsive rules

- Search is a semantic search input. All actions, dismiss controls, links, CTAs, and tabs must be keyboard focusable and have accessible names.
- Below 393 px, retain `16 px` side insets and make 361 px regions `calc(100% - 32px)`; do not scale type or icons.
- Above 393 px in a mobile preview, center a 393 px canvas rather than expanding to tablet.
- Add enough bottom content padding that the floating `80 px` navigation never hides the final card.
- Bottom-tab order: Home, Medications, Benefits, Inbox; Home is active.

#### Exact-match rejection checks

Reject a recreation if status-bar graphics are visible; the empty 28 px spacer is missing; the body is white instead of olive; the Guide card is not exactly 140 px high; the Guide copy is force-broken after “Pharmacy Guides” instead of wrapping naturally like `index.html`; the portrait frame loses its reserved 64 px width; only a sliver of the portrait is visible; the availability dot is detached from the portrait; the eligibility illustration is absent; medication images use `meds/`; medication cards use the rejected compact 98 px layout; the status/disclosure row is missing; the bordered option/pharmacy third row is missing; medication artwork is cropped; the three populated reference medication cards are missing; recommendation cards show artwork without live text/actions; recommendation artwork is replaced with generic gradients; the active indicator appears above the Home icon; or bottom navigation sits in normal document flow.

### 4.6 Desktop Web App Shell

Desktop web uses a different shell than the mobile app. It is not a widened mobile screen.

**Observed source:** `Redesign Final` / `Home` (`143:68750`) and `In Progress Collapsed` (`10499:24433`).

**Canvas and background:**

- Design workspace: **1280px centered** inside the browser viewport.
- Page background: `#EBEDF1`.
- Main page stack gap: **40px** between top actions and the web workspace.
- Page bottom padding: **60px**.
- Desktop content uses card radius **16px**, not the mobile 8–12px default, when matching these redesign frames.

**Top actions header:**

- Present on **all desktop web pages**.
- Full-bleed blue bar: `Foundation/Blue/blue-500` (`#12275E`).
- Inner container: 1280px wide, centered, `24px` horizontal padding.
- Header vertical padding: `24px` top, `16px` bottom.
- Left: white `Horizontal Lockup` logo, **187×35**.
- Right: 40×40 circular action buttons for `IDv2` and `UserProfileV2`.
- The top actions header is not a hero. It does not contain page title, guide copy, search, tabs, or breadcrumbs.

**Main workspace:**

```
┌──────────────────────────────────────────────────────────────┐
│ Top actions header (blue, full width)                         │
├──────────────────────────────────────────────────────────────┤
│ 1280px centered workspace                                     │
│ ┌──────────────┐  ┌─────────────────────────────────────────┐ │
│ │ Side menu    │  │ Page content                            │ │
│ │ 284px wide   │  │ White cards / page modules              │ │
│ └──────────────┘  └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- Workspace width: **1280px**.
- Workspace horizontal padding: `24px` left, `12px` right in the source frames.
- Gap between side menu and content column: **12px**.
- Side menu column: **284px** wide.
- Content column: remaining width, with an internal `12px` horizontal inset and **24px** vertical gaps between major modules.

### 4.7 Desktop Web Side Menu

**Component:** `Menu / Web / Side`

- Width: **284px**.
- Background: white.
- Radius: **16px**.
- Padding: **24px**.
- Gap between menu buttons: **12px**.
- Shadow: `drop1`.
- Menu button width: **236px**.
- Menu button height: **58px** (`Hug` in Figma).
- Menu button auto layout: horizontal row, vertically centered.
- Menu button gap: **16px**.
- Menu button padding: **16px** horizontal and vertical, except `Focused` where the selected variant wrapper reports `0px` padding and the visible interior spacing is owned by the nested content.
- Menu button radius: **16px**.
- Icon: 24×24, left aligned.
- Label: `Text Link 1` (20/SemiBold Inter), line-height 1.3.

**PBM web side menu items from the redesign frames:**

1. Home
2. Medications
3. Benefits
4. Profile & Settings
5. Inbox

**Button / Web / Menu state parameters:**

| State                  | Fill                                    | Stroke                                  | Text / icon color                         | Notes                                                                          |
| ---------------------- | --------------------------------------- | --------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| `Style=Active`         | `Foundation/Blue/blue-500` (`#12275E`)  | None                                    | `Foundation/White/white-500`              | Current page.                                                                  |
| `Style=Hover`          | `Foundation/Blue/blue-400` (`#41527E`)  | None                                    | `Foundation/White/white-500`              | Hover state for an active or primary-blue menu row.                            |
| `Style=Pressed`        | `Foundation/Blue/blue-700` (`#0D1C43`)  | None                                    | `Foundation/White/white-500`              | Mouse/touch down state.                                                        |
| `Style=Focused`        | `Foundation/White/white-500`            | `Foundation/Blue/blue-500`, 3px outside | `Foundation/Blue/blue-500`                | Keyboard focus ring. Inspector shows no fill and outside stroke weight `3`.    |
| `Style=Inactive`       | `Foundation/White/white-500`            | None                                    | `Foundation/Blue/blue-500`                | Default non-current row.                                                       |
| `Style=Inactive Hover` | `Foundation/Blue/blue-50` (`#E7E9EF`)   | None                                    | `Foundation/Blue/blue-500`                | Hover state for a non-current row.                                             |
| `Style=Disabled`       | `Semantic/Disabled/disabled-100`        | None                                    | `Semantic/Disabled/disabled-700`          | Disabled row. Exact token inferred from the visible grey state in the source.  |

**State behavior rules:**

- Use `Style=Active` only for the current section/page in the left rail.
- Use `Style=Focused` for keyboard focus; do not replace it with hover styling.
- Use `Style=Pressed` only while the pointer/touch is down.
- Use `Style=Inactive Hover` for pointer hover on non-current rows.
- Use `Style=Hover` for hover treatment on rows that are already active/blue.
- Disabled rows keep the same layout, icon slot, label slot, and radius, but do not show hover, focus, or pressed states.

**Inbox badge:**

- Use `Semantic/Alert/alert-600` (`#B40707`) red pill/circle.
- Badge text: white, 12/SemiBold.
- Badge stays visible across all enabled states.
- Badge position is inline after the label within the 16px-gap row; it does not float over the button.

**Powered by Rightway footer:**

- Appears beneath the side menu in the left rail.
- Place with `24px` padding.
- Text: "Powered by" + Rightway wordmark.

### 4.8 Desktop Web Home Layout

> **Mandatory implementation reference:** Before generating the Nav-mode desktop home, read [web-nav-home/App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/src/App.jsx) and [web-nav-home/styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/styles.css). Use the prose below only to supplement that executable reference.

Desktop web home screens use the top actions header + side menu shell and place home content in the right content column.

**Observed source:** `Redesign Final` / `Home` (`143:68750`).

**Desktop PBM home structure:**

1. Top actions header.
2. Main workspace with `Menu / Web / Side` active on Home.
3. `HeroBanner` Guide module.
4. Drug price search module.
5. Quick Actions module.
6. Medications module.
7. Recommended for you module.

**HeroBanner Guide module:**

- Background: white.
- Radius: **16px**.
- Shadow: `drop1`.
- Overall card height: **140px**. The 125px measurement belongs only to the portrait container.
- Left portrait container: **125×125px**, aligned to the bottom of the card.
- Portrait: avatarPharmacyHealthGuide.png at **104×127px**, aligned to the bottom of the portrait container.
- Online indicator: 16×16 dot at the lower-right of the portrait.
- Right content padding: **24px**; vertical gap between copy and actions: **16px**.
- Approved Navigation-mode copy: "Our **Pharmacy Guides** are humans, here to help. ❤".
- Copy style: Plus Jakarta Sans, **22px / 32px**. The sentence is Black-500 at Medium weight, “Pharmacy Guides” is Bold, and only the 18px Regular heart is Blue-500.
- Actions: Chat, Call, Inbox in a horizontal row with 44×44 blue-50 circular icon chips and 20px icons.
- Gap between actions: **36px**; icon-to-label gap: **10px**.
- Action labels: `Text Link 1` (20/SemiBold), blue-500.

**Drug price search module:**

- Background: white.
- Radius: **16px**.
- Padding: **24px**.
- Title: "Find lowest drug prices" (`Heading 3`, 22/SemiBold Plus Jakarta Sans).
- Input: full-width, white, **2px blue-200 border**, 16px radius, 12px left padding, 8px right padding.
- Search icon: 20×20.
- Placeholder: "Enter drug name" (`Text 1`, 16/Regular), black-300/400.

**Quick Actions module:**

- Background: white.
- Radius: **16px**.
- Padding: **24px**.
- Title: "How can we help you today?" (`Heading 3`, 22/SemiBold Plus Jakarta Sans). Note sentence case on desktop web.
- PBM action cards in source: Find a Pharmacy, Switch to Mail Order, Transfer a Medication.
- Cards are arranged in a single horizontal row.
- Card backgrounds use feature color fills; icon chip sits top-left; labels use 16px Inter.

**Medications module:**

- Background: white.
- Radius: **16px**.
- Padding: **24px**.
- Header: "Your medications" + "See All".
- Web medication cards use `Feature Cards / Medications Snapshot / Web`.
- Source layout uses a 2-column row when space allows.
- Card radius: **16px**.
- Card border: blue-100 / blue-50 depending on state.
- Status label: uppercase status chip, 10–16px depending on variant.
- Include pharmacy identity and phone/action metadata in the footer.

**Recommended for you module:**

- Section title outside the white card stack: "Recommended for you".
- Web cards: **450×200** in source, horizontal row with 24px gap.
- Cards may use image backgrounds, black category chip, close/dismiss button, and a white pill CTA.

The desktop row is a fixed-width horizontal carousel, not a responsive two-column grid. The first card is 450×200px; following cards are 451×200px; the gap is 24px. Each card uses `justify-content: space-between`: a top content region with `16px 16px 12px` padding and 8px internal gap, followed by a bottom action region with 12px right/bottom padding. Required populated examples are Healthcare Benefits, Wellness, and Health Management. Cards, dismiss controls, and CTA controls are separate keyboard targets.

#### 4.8.1 Approved Navigation-Mode Web Home — Requests and Medicine Cards

**Primary Figma source:** Requests and Medicine Cards, file 7m43rg5foSETl7lVVcHrNB.

- Full screen: Choice 1, node 172:11904.
- Guide banner: HeroBanner, node 172:11920.

This subsection overrides earlier generic desktop-home guidance for the Navigation-mode website.

**Exact shell:**

- Page background: Olive-300, #F2F3EE.
- Header: Blue-500, #12275E, **80px** tall.
- Outer workspace: **1280px**.
- Workspace padding: **24px left**, **12px right**.
- Side navigation: **284px**.
- Grid gap: **12px**.
- Content rail: **948px** including 12px inset on both sides, yielding **924px inner content width**.
- Major content gap: **24px**.

**Navigation-mode menu and assets:**

| Menu item | Asset path | State color |
| --- | --- | --- |
| Home | Navigation/Home.svg | Active White-500; inactive Blue-500 |
| Get Care | Navigation/Get Care.svg | Active White-500; inactive Blue-500 |
| Benefits | Navigation/Benefits.svg | Active White-500; inactive Blue-500 |
| Bill Support | Navigation/Bill.svg | Active White-500; inactive Blue-500 |
| Profile & Settings | UserProfile.svg | Active White-500; inactive Blue-500 |
| Inbox | Navigation/Inbox.svg | Active White-500; inactive Blue-500 |

Do not trust an SVG's embedded fill for state color. Normalize every inactive icon to Blue-500 and every active icon to White-500 with currentColor, masks, SVG theming, or a tested monochrome filter. Gray Benefits/Inbox icons and the white Profile source are incorrect when inactive.

**Mandatory direct asset URLs — do not substitute generic icons, Unicode symbols, emoji, CSS-drawn shapes, or icons from another library:**

| Label | Required raw asset URL |
| --- | --- |
| Home | https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Home.svg |
| Get Care | https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Get%20Care.svg |
| Benefits | https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Benefits.svg |
| Bill Support | https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Bill.svg |
| Profile & Settings | https://raw.githubusercontent.com/uxrightway/assets/main/UserProfile.svg |
| Inbox | https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Inbox.svg |

**Required menu-icon color implementation:**

The source SVG files contain mixed colors. Loading them without recoloring is a failed implementation. When the files are rendered with img elements, this tested CSS normalizes every source before applying the state color:

```css
.menu-item:not(.active) img {
  /* Foundation/Blue/blue-500: #12275E */
  filter: brightness(0) saturate(100%) invert(16%) sepia(24%)
    saturate(2948%) hue-rotate(189deg) brightness(84%) contrast(99%);
}

.menu-item.active img {
  /* Foundation/White/white-500: #FFFFFF */
  filter: brightness(0) saturate(100%) invert(100%);
}
```

If the implementation inlines SVGs or uses masks, set currentColor to #12275E for inactive items and #FFFFFF for active items instead.

- Active row: Blue-500 background with White-500 label and icon.
- Inactive row: white background with Blue-500 label and icon.
- Inactive hover: Blue-50 background.
- Keyboard focus: 3px Blue-500 outline. On an active Blue-500 row, use a white inset outline for contrast.
- Inbox badge: Alert-600 #B40707 with white 12/SemiBold text.
- Footer: “Powered by” in Blue-400 followed by WordmarkRightway.svg at **64×15px**.

**How can we help you today?:**

All icons render Black-500 while the circular backgrounds retain their feature colors.

| Action | Asset | Circle |
| --- | --- | --- |
| Find a Doctor or Facility | Find Doctor Icon.svg | Feature1-500 blue |
| Schedule Appointment | Calnder.svg | Purple feature fill |
| Benefits Support | Benefits Support Icon.svg | Yellow feature fill |
| Billing Questions | Billing Questions Icon.svg | Orange feature fill |
| Clinical Guidance | Clinical Guidance Icon.svg | Feature2-500 green |

**Mandatory direct quick-action asset URLs:**

| Label | Required raw asset URL |
| --- | --- |
| Find a Doctor or Facility | https://raw.githubusercontent.com/uxrightway/assets/main/Find%20Doctor%20Icon.svg |
| Schedule Appointment | https://raw.githubusercontent.com/uxrightway/assets/main/Calnder.svg |
| Benefits Support | https://raw.githubusercontent.com/uxrightway/assets/main/Benefits%20Support%20Icon.svg |
| Billing Questions | https://raw.githubusercontent.com/uxrightway/assets/main/Billing%20Questions%20Icon.svg |
| Clinical Guidance | https://raw.githubusercontent.com/uxrightway/assets/main/Clinical%20Guidance%20Icon.svg |

Do not replace Schedule Appointment with a square/calendar placeholder, Benefits Support with a shield, or Clinical Guidance with a plus sign. Those substitutions are explicitly incorrect. All five required SVGs must load successfully before handoff.

- Quick-action card: **158px** high.
- Icon circle: **64×64px**; icon: **32×32px**.
- Label: Plus Jakarta Sans, **18px / 21.6px**, SemiBold.
- Each card is a native button or link with a 3px Blue-500 focus outline.

**Required focus CSS:**

```css
:where(a, button, [tabindex]):focus-visible {
  outline: 3px solid #12275E;
  outline-offset: 4px;
}

.menu-item.active:focus-visible {
  outline: 3px solid #FFFFFF;
  outline-offset: -6px;
}

.recommendation-card-link:focus,
.recommendation-card-link:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 3px #12275E;
}

/* Blue-500 outlines disappear on the Blue-500 header, so header controls use
   the approved high-contrast surface exception. */
.logo-link:focus-visible,
.header-actions button:focus-visible {
  outline: 3px solid #FFFFFF;
  outline-offset: 4px;
  box-shadow: 0 0 0 7px #12275E;
}
```

Do not use #60A5FA, browser-default blue, Feature1 blue, or any other light blue for focus. The approved keyboard focus color is exactly Foundation/Blue/blue-500, #12275E.

**Current requests:**

- Header: “Current requests (3)” and “Past Requests”.
- Card: white, 16px radius, 16px padding, shadow 0 1px 12px rgba(0,0,0,.15).
- Appointment card uses Calnder.svg. Date uses Appointment Date.svg and time uses clock-filled.svg. Metadata icons are **15×15px** with 4px label gap.
- Dental Care Recommendations uses Find Doctor Icon.svg on a Feature1-500 circle.
- November Pharmacy Bill Support uses Billing Questions Icon.svg on an Orange-300 circle.
- Status sequence: Submitted → In Progress or Action Needed → Completed.
- Action-needed CTA: “More information needed. Continue in Bill Support Chat.”
- Every request card is fully clickable/tappable and keyboard focusable.
- When a CTA exists, card and CTA are separate interactive targets. Never nest a button inside a link. Use a sibling full-card link plus a higher-layer CTA or an equivalent accessible structure.
- Card and CTA focus: 3px Blue-500.
- Screen-reader labels must distinguish opening the request from performing its CTA.
- Exact container node 172:11966 is **924×513px** with 24px padding. Its inner stack is 876×465px: 26px header, 16px header-to-card gap, then cards separated by 24px.
- Appointment card is 876×116px. Its inner row is a fixed 402px title area, 8px gap, and a flexible 434×84px Blue-50 provider panel. The provider group is 224×60px; portrait is 60×60px; date/time icons are 15×15px.
- Dental progress card is 876×103px and splits its 844px inner row into two 422px halves. The progress half is 71px high.
- Bill Support card is 876×156px. Its 844×45px alert CTA sits 8px below the 71px content row.

**Recommended for you:**

- Cards: **450–451×200px**, 16px radius, 24px gap.
- Category chip: black with white 14/SemiBold text.
- Title: Plus Jakarta Sans, 18px / 21.6px, SemiBold.
- Body: Inter, 16px / 20.8px, Medium.
- White CTA pill: Inter, 16px / 20.8px, SemiBold.
- The entire card is clickable/tappable and keyboard focusable.
- Dismiss and CTA buttons remain independent controls above the full-card target.
- Because the card clips overflow, render focus as a **3px inset Blue-500 ring**.
- Announce dismissals through a polite aria-live status region.
- Render a horizontal flex row with overflow scrolling and 24px gaps; never stretch cards into equal fluid columns. Use repository backgrounds `recommendedforyou/Activity_card_Medical_Benefit.png`, `Activity_card_Mindfulness.png`, and `Activity_card_PBM_Benefit.png` for the three approved examples.

**Accessibility baseline:**

- Visible-on-focus “Skip to main content” link.
- One descriptive h1 and h2 headings for major sections.
- Primary navigation label and aria-current=page on the active menu link.
- Accessible names for icon-only header buttons.
- The Rightway wordmark is a keyboard-focusable Home link. Member ID and Profile are native buttons. All three top-bar targets use the white high-contrast focus exception above because a Blue-500 ring is invisible on the Blue-500 header.
- Empty alt text for decorative icons and concise alt text for meaningful portraits.
- Guide availability announced as “Available”.
- Request progress exposed as meaningful status text, not color alone.
- All pointer actions keyboard operable.
- Standard focus: 3px Blue-500, with a visible contrast exception on Blue-500 surfaces.
- Do not rely on color alone for active, progress, alert, or focus state.

**Reject the generated page if any of these are true:**

- Get Care displays a generic doctor/person icon instead of Navigation/Get Care.svg.
- Benefits or Inbox appears gray instead of Blue-500 while inactive.
- Profile & Settings has no visible icon because the white source SVG was not recolored.
- Schedule Appointment displays a square placeholder.
- Benefits Support displays the navigation shield instead of Benefits Support Icon.svg.
- Clinical Guidance displays a plus sign instead of Clinical Guidance Icon.svg.
- Keyboard focus is light blue rather than exactly #12275E.

### 4.9 Desktop Web Internal Page Layout

Internal desktop pages keep the top actions header and side menu but **do not display the home HeroBanner**.

**Observed source:** `Redesign Final` / `In Progress Collapsed` (`10499:24433`).

**Internal page structure:**

1. Top actions header.
2. Main workspace with `Menu / Web / Side`; active item matches the current product area.
3. Main content area as a white page card.
4. Back button at the top-left of the page card.
5. Page title and page-specific content.

**Internal page content card:**

- Background: white.
- Radius: **16px**.
- Padding: **24px**.
- Width: fills remaining content column.
- Do not render the Guide module, search module, quick actions, recommendations, or home hero unless the specific internal screen explicitly defines them.

**Back button:**

- Use `Icons / Navigation / White BG`.
- Size: **40×40**.
- Position: first element inside the white content card, above the page title/content.
- It returns to the previous list or home surface.

**Internal content example — Prior Authorization:**

- Page title: "Prior Authorization" (`Heading 3`, 22/SemiBold Plus Jakarta Sans).
- Primary detail card can use `PrimaryDark` gradient.
- Latest Update callout uses `Gradients/SecondaryLight`.
- Supporting explainer/sidebar cards can use feature backgrounds such as feature4-50.

**Do not:**

- Do not show the Guide `HeroBanner` on internal pages.
- Do not put the back button inside the blue top actions header.
- Do not replace the persistent side menu with mobile bottom navigation on desktop web.

---

## 5. Core Modules

These are the repeatable content sections that appear across screens.

### 5.1 Quick Actions ("How Can We Help You Today?")

**Mobile container spec:**

- Width: 361px
- Heading: `Heading 6` (16/SemiBold), 19px tall
- Content row height: 95px

**Mobile card spec (each):**

- Dimensions: 120×95
- Gap between cards: 12px
- Background: white
- Radius: `radius/lg` (12px)
- Shadow: `drop1`
- Icon container: 35×35, centered at top (12px from top, 12px from left)
- Icon: 20–24px inside the container
- Label: `Title` style (14/600 Inter), 2-line max, 96px wide, 55px from top of card

**Mode-specific action sets:**

| PBM (3 cards, no scroll)      | Nav (5 cards, horizontal scroll)             | Unity Medications (3 cards) | Unity Requests (5 cards) |
| ----------------------------- | -------------------------------------------- | --------------------------- | ------------------------ |
| Price a drug                  | Find a Provider                              | Price a drug                | Find a Provider          |
| Mail order (`Mailorder` icon) | Schedule Appointment (`Calendar` icon)       | Mail order                  | Schedule Appointment     |
| (third pharmacy action)       | Benefits (`BenefitsV2` icon)                 | (third pharmacy action)     | Benefits                 |
|                               | Bill Question (`Bill Question` icon)         |                             | Bill Question            |
|                               | Clinical Guidance (`Clinical Guidance` icon) |                             | Clinical Guidance        |

**Scroll affordance (Nav / Unity Requests):** When there are 5 cards, the row is horizontally scrollable. A 30×25 chevron button (using `Icons / Misc / Chevron 16px`) is placed at the trailing edge (right side, x=347 within the 361px container) to signal scrollability.

**Desktop web variant:** Use §4.8. Desktop web quick actions sit inside a white 16px-radius module with 24px padding. The PBM redesign labels are "Find a Pharmacy", "Switch to Mail Order", and "Transfer a Medication".

### 5.2 Guide Panel (see §4.2)

On mobile, the guide panel is a sub-component of the 207px Hero. On desktop web home, the same product promise is rendered as the white `HeroBanner` module in §4.8. Internal desktop pages do not render the Guide panel / `HeroBanner`.

### 5.3 Medications Section

- Section title: `Heading 6` (16/600), text "Medications"
- Optional "See All" link on the right: `Text link 5` (12/600) in blue-500
- Mobile content: stacked `Feature Cards / Medications Snapshot / Mobile` instances, 12px vertical gap
- Mobile card variants by height: **152px** (standard), **231px** (with expanded info), **252px** (with refill action), **148px** (compact)
- Desktop web content: `Feature Cards / Medications Snapshot / Web`; source layout uses two cards per row when space allows.

### 5.4 Active Requests Section (Nav, Unity Requests tab)

- Section title: `Heading 6`, text "Active Requests"
- Optional header right-side link
- Content: stacked `Feature Cards / Requests`, 12px vertical gap
- Card height variants: **168px** (standard request), **128px** (compact), **207px** (with status timeline)

### 5.5 Recommended for You

Appears on nearly every mobile home screen as the last section above the nav. Desktop web home uses the web variant from §4.8.

- Section title: `Heading 6`, text "Recommended for you"
- Mobile content: `Feature Cards / Recommended` — a **horizontally scrolling carousel** (internal width 939px in a 361px viewport, so it scrolls)
- Mobile height: 153px
- Desktop web content: `Feature Cards / Recommended / Web`, 450×200 cards in the source frame.
- Cards use feature colors (§3.1) to differentiate categories

### 5.6 Partner Solution Cards (Coverage screen)

- Container: `Card / Partner Solution Card`
- Width: 343px
- Height variants: 212, 236
- Structure:
  - Partner logo (left, ~109×28) + Partner Type tag (right)
  - Title (`Heading 6`)
  - Description (`Text 2`, 2–3 lines)
  - Divider line
  - Bottom row: CTA button(s) with external link icon (`Icons / Misc / External Link`, 20×20)

### 5.7 Bill Summary Box (Bill Support)

Appears at the top of Bill Support / Active screen.

- Width: 361, Height: 92
- 3-column layout:
  - **Filed** count: label in caps (11/700), number in Plus Jakarta Sans 32+
  - **Resolved** count: same format
  - **Total savings**: dollar amount (e.g. `$1,455`) in Plus Jakarta Sans SemiBold

### 5.8 Get Care Cards (Nav / Unity Get Care screen)

- Container: `Card / Get Care Card`
- Width: 343px, Height: 83px
- Structure: icon + title + right chevron, single tap target
- Stacked vertically with 12px gap

---

## 6. Screen Catalog

The following screens are formally designed in the Screens section of the Member Library. Generators should reference these as source-of-truth layouts:

### 6.1 PBM Mode

| Screen               | Frame name                        | State                                 |
| -------------------- | --------------------------------- | ------------------------------------- |
| PBM Empty State      | `PBM empty State` (393×902)       | Home, no medications yet              |
| PBM With Medications | `PBM With Medications` (393×2161) | Home, populated                       |
| Basic Layout         | `Basic Layout` (393×902)          | Bare-bones template (hero + nav only) |

### 6.2 Nav Mode

| Screen              | Frame name                             | State                           |
| ------------------- | -------------------------------------- | ------------------------------- |
| Nav Empty State     | `Nav Empty State` (393×852)            | Home, no active requests        |
| Nav Active Requests | `Nav Active requests final` (393×1273) | Home, populated with 3 requests |
| Nav Get Care        | `Nav Get Care` (393×852)               | Get Care landing with 3 cards   |

### 6.3 Unity Mode

| Screen                                | Frame name                                         | State                                   |
| ------------------------------------- | -------------------------------------------------- | --------------------------------------- |
| Unity Medication Tab With Medications | `Unity Medication Tab With Medications` (393×1895) | Home, Medications tab active, populated |
| Unity Requests Tab with Requests      | `Unity Requests Tab with Requests` (393×1424)      | Home, Requests tab active, populated    |

### 6.4 Shared Screens (render in Unity; Nav and PBM render subsets)

| Screen                | Frame name                        | Notes                                                                                       |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| Profile & Settings    | `Profile & Settings` (393×1059)   | Accessed via user profile icon. White internal header. Sections: Profile, Settings, Logout. |
| Bill Support / Active | `Bill Support / Active` (393×796) | Tabbed (Active / Past). Bill Summary Box at top, then Activity Cards.                       |
| Coverage - Home       | `Coverage - Home` (393×2819)      | Covers: Benefits cards + Partner Solutions list.                                            |

### 6.5 Templates

| Frame                       | Use                                                        |
| --------------------------- | ---------------------------------------------------------- |
| `Internal screens`          | Blue-header template for drill-downs                       |
| `Internal screens in white` | White-header template for settings and content-heavy pages |

### 6.6 Desktop Web Redesign Frames

These frames define the desktop web shell and must be used when `platform == web-desktop`.

| Screen                 | Frame name                | Node ID       | Notes                                                                 |
| ---------------------- | ------------------------- | ------------- | --------------------------------------------------------------------- |
| Web PBM Home           | `Home`                    | `143:68750`   | Top actions header, side menu, Guide `HeroBanner`, search, modules    |
| Web Internal - PA case | `In Progress Collapsed`   | `10499:24433` | Internal page with top actions, side menu, back button, no Guide hero |

---

## 7. Components (Member Library inventory)

This section lists every named component instance that appears in the Screens section, so generators know the canonical component to reach for.

### 7.1 Navigation

| Component                       | Mode             | Tabs                                 |
| ------------------------------- | ---------------- | ------------------------------------ |
| `Navigation / Mobile / PBMOnly` | PBM              | 4 tabs                               |
| `Navigation / Mobile / NavOnly` | Nav              | 4 tabs                               |
| `Navigation / Mobile / Unity`   | Unity            | 5 tabs                               |
| `Headers / Top Nav V2`          | Internal screens | Back + title + optional right action |
| `Menu / Web / Side`             | Desktop web      | Persistent left rail menu            |
| `Button / Web / Menu`           | Desktop web      | Individual side-menu row             |
| `top actions`                   | Desktop web      | Blue header with logo, ID, profile   |

### 7.2 Tabs

| Component             | Use                                                         |
| --------------------- | ----------------------------------------------------------- |
| `Tabs / 2 segment V2` | Unity home only — switches between Medications and Requests |

### 7.3 Cards

| Component                                       | Use                                                           |
| ----------------------------------------------- | ------------------------------------------------------------- |
| `Feature Cards / Medications Snapshot / Mobile` | Medication list items (152 / 231 / 252 / 148 height variants) |
| `Feature Cards / Medications Snapshot / Web`    | Desktop medication list/grid items                            |
| `Feature Cards / Requests`                      | Active request items (168 / 128 / 207 height variants)        |
| `Feature Cards / Recommended`                   | Horizontal carousel of recommendations (153 tall)             |
| `Feature Cards / Recommended / Web`             | Desktop recommended cards (450×200 source size)               |
| `Card / Get Care Card`                          | Get Care landing items (83 tall)                              |
| `Card / Partner Solution Card`                  | Coverage partner solutions (212 / 236 height)                 |
| `Card / Activity Card`                          | Bill Support activity items (170 tall)                        |
| `HeroBanner`                                    | Desktop home Guide panel only                                 |

### 7.4 List Items

| Component                        | Use                                                              |
| -------------------------------- | ---------------------------------------------------------------- |
| `List Item / With Icon`          | Profile & Settings rows (65 or 77 tall)                          |
| `Components / List Item / Title` | Profile items with title + embedded CTA + helper text (175 tall) |

### 7.5 Buttons

| Component       | Use                             |
| --------------- | ------------------------------- |
| `Buttons / CTA` | Full-width primary CTA (327×48) |

### 7.6 Labels

| Component            | Use                                                          |
| -------------------- | ------------------------------------------------------------ |
| `Labels / Chip Tags` | Small category tags inside cards (24px tall, variable width) |

### 7.7 Icons (most-used in screens)

Every icon is from the `Icons / Misc` set and is 24×24 unless noted.

**Top-nav icons:** `IDv2`, `UserProfileV2`

**Guide panel icons (15×15):** `Chat`, `Call`, `Inbox`

**Quick action icons:** `Mailorder`, `Provider`, `Calendar`, `BenefitsV2`, `Bill Question`, `Clinical Guidance`, `Search`, `Heart`, `Double Pills`

**Wayfinding icons:** `Chervon 16px` (note: "Chervon" is the actual file spelling — a typo to preserve in lookups), `Arrow`, `External Link`

**Containers:** `Icons / Containers / Size 32 Sq` — a 32×32 square icon chip used in list items

---

## 8. Layout Rules

### 8.1 Spacing Inside Screens

Using the Global Library 4pt scale (see Global `guidelines.md` §5):

| Gap type                           | Value  | Example             |
| ---------------------------------- | ------ | ------------------- |
| Screen edge → content              | 16px   | `space/5`           |
| Section title → first content item | 8–12px | `space/3`–`space/4` |
| Between sections                   | 16px   | `space/5`           |
| Between stacked cards              | 12px   | `space/4`           |
| Between quick action cards         | 12px   | `space/4`           |
| Inside a card (padding)            | 16px   | `space/5`           |

### 8.2 Vertical Order on Mobile Home Screens

Generators **must preserve this vertical order** on mobile home screens:

1. Hero (mandatory)
2. Tabs (Unity only)
3. Search (PBM and Unity Medications only)
4. Quick Actions (mandatory)
5. Primary content section — Medications (PBM, Unity Medications) OR Active Requests (Nav, Unity Requests)
6. Recommended for you (mandatory)
7. Bottom nav (mandatory)

Reordering these is a **structural violation** on mobile — do not swap their positions to fit a different content hierarchy. Desktop web home uses the order defined in §4.8.

### 8.3 Responsive Behavior

- The 361px content column is the standard. On narrower phones (down to 375 device width), the column compresses to 343px.
- Cards inside the content column stretch to fill; they do not have fixed widths.
- The Hero always takes 100% of device width (full-bleed).
- The Quick Actions row is the primary horizontal scroll zone on Nav/Unity Requests. Other sections are vertical-scroll only.

### 8.4 Desktop Web Layout Rules

When generating desktop web, use the web shell from §4.6–§4.9 instead of the mobile screen stack.

| Rule                     | Desktop web value                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Page background          | `#EBEDF1`                                                                          |
| Workspace width          | 1280px centered                                                                    |
| Top actions              | Full-width blue header, always present                                             |
| Primary navigation       | Persistent left side menu, 284px wide                                              |
| Mobile bottom nav        | Not used                                                                           |
| Mobile status bar        | Not used                                                                           |
| Home Guide presentation  | White `HeroBanner` in the content column                                           |
| Internal page header     | White content card with 40×40 back button                                          |
| Internal hero behavior   | No home hero / Guide banner on internal pages                                      |
| Card radius              | 16px for the redesign web shell and modules                                        |
| Major content gaps       | 24px inside the content column; 12px between side menu and content                 |

**Responsive fallback:** Below tablet/desktop widths, the desktop web shell may collapse to a single column, but it must remain a web layout. Do not add iOS status bars, dynamic islands, home indicators, or mobile bottom navigation as a responsive fallback for desktop web.

---

## 9. Mode-Aware Code Generation

This section gives the generator explicit instructions for producing mode-correct output.

### 9.1 Decision Tree

```
Given: platform (mobile | web-desktop), screen_type, mode (PBM | Nav | Unity), data_state

1. Pick the platform shell:
   - platform == mobile → mobile screen chrome with hero/header + bottom nav.
   - platform == web-desktop → top actions header + Menu / Web / Side + centered 1280px workspace.

2. Pick the hero / page header:
   - mobile Home screen? → 207px Hero with guide panel.
   - mobile Internal? → 90px top header (blue or white variant).
   - web-desktop Home? → white HeroBanner Guide module in the content column.
   - web-desktop Internal? → no HeroBanner; render a white content card with a 40×40 back button.

3. Pick guide copy:
   - mode == PBM → "Pharmacy Guides"
   - mode in (Nav, Unity) → "Health Guides"

4. Pick navigation:
   - platform == mobile AND mode == PBM → Navigation / Mobile / PBMOnly (4 tabs)
   - platform == mobile AND mode == Nav → Navigation / Mobile / NavOnly (4 tabs)
   - platform == mobile AND mode == Unity → Navigation / Mobile / Unity (5 tabs)
   - platform == web-desktop → Menu / Web / Side; active row matches the current page.

5. Add search bar?
   - mode == PBM AND screen == Home → yes
   - mode == Unity AND tab == Medications → yes
   - else → no

6. Add 2-segment tab?
   - platform == mobile AND mode == Unity AND screen == Home → yes, below hero
   - platform == web-desktop AND mode == Unity AND screen == Home → only if the web redesign defines it
   - else → no

7. Quick Actions set:
   - mode == PBM OR (mode == Unity AND tab == Medications) → 3 pharmacy cards
   - mode == Nav OR (mode == Unity AND tab == Requests) → 5 care cards with chevron

8. Primary content section:
   - mode == PBM → Medications section (empty or populated)
   - mode == Nav → Active Requests section (may be omitted when empty)
   - mode == Unity AND tab == Medications → Medications section
   - mode == Unity AND tab == Requests → Active Requests section

9. End chrome:
   - platform == mobile → Recommended for you + bottom nav for the mode + home indicator.
   - platform == web-desktop Home → Recommended for you if designed for that home page.
   - platform == web-desktop Internal → no automatic recommendations/footer unless the specific internal design includes them.
```

### 9.2 Mode Prop Pattern (React reference)

```tsx
type Mode = "pbm" | "nav" | "unity";
type UnityTab = "medications" | "requests";

interface HomeScreenProps {
  platform: "mobile" | "web-desktop";
  mode: Mode;
  unityTab?: UnityTab; // required if mode === 'unity'
  guideName: string;
  guidePortraitUrl: string;
  guideIsOnline: boolean;
  inboxUnreadCount: number;
  medications?: Medication[]; // shown in PBM + Unity/Medications
  activeRequests?: Request[]; // shown in Nav + Unity/Requests
  recommendations: Recommendation[];
}

const guideLabel = mode === "pbm" ? "Pharmacy" : "Health";
const navComponent = {
  pbm: "PBMOnly",
  nav: "NavOnly",
  unity: "Unity",
}[mode];
```

### 9.3 What NOT to Do

- ❌ Do not use "Pharmacy Guide" copy in Unity mode — use "Health Guide".
- ❌ Do not show a search bar in Nav mode — Nav has no drug price search.
- ❌ Do not show the mobile 2-segment tab on PBM or Nav home screens.
- ❌ Do not use `Navigation / Mobile / Unity` on a non-Unity mobile screen (it has extra tabs that won't map).
- ❌ Do not use mobile bottom navigation, status bars, dynamic islands, or home indicators on desktop web.
- ❌ Do not show the desktop home `HeroBanner` on desktop internal pages; use the internal back-button layout.
- ❌ Do not demote the Guide panel below the Quick Actions. The Guide is the lead, always.
- ❌ Do not substitute pure black `#000` for the tinted card shadow `#22183F` at 6%.
- ❌ Do not place Quick Actions in 2 rows — always a single horizontal row (scroll if > 3).

---

## 10. Content & Copy Rules (Member App)

### 10.1 Product Copy Rules

Apply these rules only when the design or product requirements do not provide approved copy. Approved Figma strings and authoritative reference-implementation strings override general writing rules and must be reproduced verbatim.

- Use sentence case, plain language, active voice, and familiar terminology.
- Do not rewrite approved product terminology or established interface strings.
- Full-sentence headings may end with a period.
- Buttons, tabs, labels, chips, navigation items, section titles, and numerical statistics do not end with a period.
- A control's accessible name and visible label must clearly describe its action.
- Keep action terminology consistent through the flow: “Publish” → “Published”.
- Supporting text should explain why information or action is needed.
- Errors must state what happened and provide a useful recovery action.
- Do not blame the member or use vague apologies.
- Use skeleton placeholders for structured loading states when supported by the prototype. Otherwise use a concise accessible loading announcement.
- Do not add celebratory emoji unless the approved design explicitly includes it.
- The approved heart character, ❤, is intentional and must be preserved.

| Context | Avoid | Prefer |
| --- | --- | --- |
| Error | “Error: Invalid input” | “That didn't go through. Check the highlighted field and try again.” |
| Empty state | “No medications found” | “Once we have information about your current medications, they'll appear here.” |
| Success | “Operation complete! 🎉” | “Done. Your request is with your guide.” |
| Button | “Submit” | “Save changes” |
| Loading | Replacing content with “Loading…” | Skeleton placeholders plus an accessible loading announcement |

### 10.2 Approved Strings by Platform and Mode

Do not substitute one mode's or platform's terminology for another. When a linked Figma node or mandatory reference implementation differs from this table, that named source is authoritative for its specific surface.

| Surface | Approved string |
| --- | --- |
| PBM mobile home Guide | “Our Pharmacy Guides are humans, here to help. ❤” |
| Navigation-mode web HeroBanner, Figma `172:11920` | “Our Pharmacy Guides are humans, here to help. ❤” |
| Other Navigation/Unity Guide surfaces | Use the exact string from the referenced Figma node or authoritative implementation; do not infer terminology from the mode name alone |
| Mobile quick-actions heading | “How Can We Help You Today?” |
| Desktop quick-actions heading | “How can we help you today?” |
| PBM medication section | “Medications” |
| Navigation web requests, Figma `172:11966` | “Current requests (3)” |
| Recommendations section | “Recommended for you” |
| Guide actions | “Chat”, “Call”, “Inbox” |
| Primary Navigation-mode web navigation | “Home”, “Get Care”, “Benefits”, “Bill Support”, “Profile & Settings”, “Inbox” |

The heart character is brand-intentional on the Guide panel heading. It softens the healthcare context and signals human warmth. Do not strip it from approved copy. Status chips are separate from general eyebrow rules: reproduce their approved capitalization, typography, and tracking exactly—for example, “READY TO REFILL” and “NEW MEDICATION”.

### 10.3 Action Labels

- Guide actions: “Chat”, “Call”, “Inbox” — single-word, no punctuation.
- Quick action labels: verb-led, two lines maximum. Mobile examples include “Price a drug”, “Mail order”, “Find a Provider”, “Schedule Appointment”, and “Clinical Guidance”. Desktop web PBM examples include “Find a Pharmacy”, “Switch to Mail Order”, and “Transfer a Medication”.
- Prefer a specific verb-and-object CTA such as “Save changes” over a generic label such as “Submit”.
- A control keeps the same action name through confirmation, status, and success feedback.

### 10.4 Empty States

Every section with dynamic data has an empty-state message. Examples:

- Medications empty: "Once we have information about your current medications, they'll appear here." (paired with a `Double Pills` icon)
- Active Requests empty: the entire section is hidden (Nav) — the screen collapses directly from Quick Actions to Recommended.

Empty states should:

- Lead with the outcome, not the lack ("Your medications will appear here" is better than "No medications found").
- Include an icon or illustration (single-color stroke, 40px in the message block).
- Never show a CTA to "add" medications — Rightway ingests them automatically from claims data.

---

## 11. Image & Icon Assets (GitHub)

Production-ready SVG icons and image assets for the Member App are hosted publicly at:

**Repo:** `https://github.com/uxrightway/assets`
**Moving raw base URL (tracks `main`):** `https://raw.githubusercontent.com/uxrightway/assets/main/`
**Pinned raw base URL (permalink commit):** `https://raw.githubusercontent.com/uxrightway/assets/1aba094/`
**Directory API base:** `https://api.github.com/repos/uxrightway/assets/contents`

Generators should **pull assets from the raw URL pattern** rather than re-exporting them from Figma. Use the moving `main` URL when product code should receive asset updates automatically. Use the pinned commit URL when a generated artifact must be reproducible or match a design snapshot exactly.

GitHub page URLs are for review only. If a designer shares a permalink such as `https://github.com/uxrightway/assets/blame/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg`, convert it before using it in code:

```txt
GitHub review URL:
https://github.com/uxrightway/assets/blame/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg

Fetchable raw URL:
https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg
```

URL shape:

```txt
https://raw.githubusercontent.com/uxrightway/assets/{ref}/{path}
```

Where `{ref}` is `main` or a commit SHA, and `{path}` is the case-sensitive repo path, for example `Call.svg`, `Navigation/Home.svg`, `PharmacyLogos/CVSLogo.png`, or `medications/metformin.png`.

### 11.1 Root Assets

These are the primary icons and brand marks used across Member App screens.

| Asset                    | Moving raw URL path             | Pinned raw URL path                  | Maps to (Figma component)               | Typical use                                          |
| ------------------------ | ------------------------------- | ------------------------------------ | --------------------------------------- | ---------------------------------------------------- |
| `RightWayLogo.svg`       | `…/main/RightWayLogo.svg`       | `…/{commit}/RightWayLogo.svg`        | `Horizontal Lockup` (wordmark + symbol) | Top of hero, email headers                           |
| `Icon.svg`               | `…/main/Icon.svg`               | `…/{commit}/Icon.svg`                | Symbol-only plus mark                   | Favicons, tight spaces under 80px                    |
| `Call.svg`               | `…/main/Call.svg`               | `…/{commit}/Call.svg`                | `Icons / Misc / Call`                   | Guide panel - Call action                            |
| `Chat.svg`               | `…/main/Chat.svg`               | `…/{commit}/Chat.svg`                | `Icons / Misc / Chat`                   | Guide panel - Chat action                            |
| `Inbox.svg`              | `…/main/Inbox.svg`              | `…/{commit}/Inbox.svg`               | `Icons/Misc/Inbox`                      | Guide panel - Inbox action                           |
| `ID.svg`                 | `…/main/ID.svg`                 | `…/{commit}/ID.svg`                  | `Icons / Misc / IDv2`                   | Top-nav ID card button                               |
| `UserProfile.svg`        | `…/main/UserProfile.svg`        | `…/{commit}/UserProfile.svg`         | `Icons / Misc / UserProfileV2`          | Top-nav profile button                               |
| `Search.svg`             | `…/main/Search.svg`             | `…/{commit}/Search.svg`              | `Icons / Misc / Search`                 | Search field, provider search card                   |
| `Doctor.svg`             | `…/main/Doctor.svg`             | `…/{commit}/Doctor.svg`              | `Icons / Misc / Provider`               | Quick action - Find a Provider, Recommend a Provider |
| `LocationMarker.svg`     | `…/main/LocationMarker.svg`     | `…/{commit}/LocationMarker.svg`      | `Icons / Misc / LocationMarker`         | Provider location and map/list metadata              |
| `Mailorder.svg`          | `…/main/Mailorder.svg`          | `…/{commit}/Mailorder.svg`           | `Icons / Misc / Mailorder`              | Quick action - Mail order                            |
| `PharmacyCoverage.svg`   | `…/main/PharmacyCoverage.svg`   | `…/{commit}/PharmacyCoverage.svg`    | (pharmacy benefits icon)                | Coverage / benefits surfaces                         |
| `Savings.svg`            | `…/main/Savings.svg`            | `…/{commit}/Savings.svg`             | (savings icon)                          | Bill Summary Box, savings callouts                   |
| `TransferMedication.svg` | `…/main/TransferMedication.svg` | `…/{commit}/TransferMedication.svg`  | (transfer medication icon)              | Medication detail, refill flows                      |
| `Reminder.svg`           | `…/main/Reminder.svg`           | `…/{commit}/Reminder.svg`            | (reminder - off state)                  | Medication cards, refill reminders (inactive)        |
| `ReminderOn.svg`         | `…/main/ReminderOn.svg`         | `…/{commit}/ReminderOn.svg`          | (reminder - on state)                   | Medication cards, refill reminders (active)          |
| `avatarPharmacyHealthGuide.png` | `…/main/avatarPharmacyHealthGuide.png` | `…/{commit}/avatarPharmacyHealthGuide.png` | Guide portrait mock/fallback | Pharmacy or Health Guide design mocks only |
| Find Doctor Icon.svg | …/main/Find%20Doctor%20Icon.svg | …/{commit}/Find%20Doctor%20Icon.svg | Find Doctor / provider action | Nav quick action and recommendation request |
| Benefits Support Icon.svg | …/main/Benefits%20Support%20Icon.svg | …/{commit}/Benefits%20Support%20Icon.svg | Benefits Support | Nav quick action |
| Clinical Guidance Icon.svg | …/main/Clinical%20Guidance%20Icon.svg | …/{commit}/Clinical%20Guidance%20Icon.svg | Clinical Guidance | Nav quick action |
| Appointment Date.svg | …/main/Appointment%20Date.svg | …/{commit}/Appointment%20Date.svg | Appointment date metadata | Request cards |
| clock-filled.svg | …/main/clock-filled.svg | …/{commit}/clock-filled.svg | Appointment time metadata | Request cards |
| WordmarkRightway.svg | …/main/WordmarkRightway.svg | …/{commit}/WordmarkRightway.svg | Rightway wordmark | Powered-by footer |

### 11.1.1 Authoritative React Reference Implementations

The repository contains three independently runnable React/Vite screen references. When recreating one of these screens, agents must copy or inspect the **complete folder**, especially `README.md`, root `index.html`, `package.json`, `src/main.jsx`, `src/App.jsx`, and `styles.css`, before generating code. These implementations take precedence over conflicting prose or superseded snippets in this document.

**Latest moving base:** `https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/`

**Verified pinned base:** `https://raw.githubusercontent.com/uxrightway/assets/1aba094/reference-implementations/`

| Screen | Complete GitHub folder | Required Vite entry | React mount | Screen source | Styles |
| --- | --- | --- | --- | --- | --- |
| Mobile PBM home | [Folder](https://github.com/uxrightway/assets/tree/main/reference-implementations/mobile-home) | [index.html](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/index.html) | [main.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/src/main.jsx) | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-home/styles.css) |
| Mobile Prior Authorization internal screen | [Folder](https://github.com/uxrightway/assets/tree/main/reference-implementations/mobile-prior-authorization) | [index.html](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/index.html) | [main.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/src/main.jsx) | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/mobile-prior-authorization/styles.css) |
| Web Nav-mode home | [Folder](https://github.com/uxrightway/assets/tree/main/reference-implementations/web-nav-home) | [index.html](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/index.html) | [main.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/src/main.jsx) | [App.jsx](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/src/App.jsx) | [styles.css](https://raw.githubusercontent.com/uxrightway/assets/main/reference-implementations/web-nav-home/styles.css) |

Run any example independently with:

```bash
npm install
npm run dev
```

For these three **standalone Vite reference folders**, use `npm run build` as the minimum verification step. All three examples were production-build verified, with the final duplicate portrait-crop override removed at commit `1aba094`. Do not copy generated `dist/` files or `node_modules/`. When adapting a reference inside Figma Make, Lovable, or an existing application, copy the relevant component and styling behavior into the platform's existing React scaffold; do not replace that scaffold with the reference's Vite shell. Preserve `index.html`, `package.json`, and `src/main.jsx` only when copying a reference as its own standalone Vite application.

### 11.2 Current Subdirectories

Five asset categories live in their own folders. Fetch individual files as `…/{ref}/{folder}/{filename}`. Folder names are case-sensitive.

| Folder            | Known files                                                                                  | Use                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `/Navigation/`    | `Benefits.svg`, `Home.svg`, `Inbox.svg`, `Medication.svg`                                    | Source icons for `Navigation / Mobile / PBMOnly`, `NavOnly`, `Unity` components               |
| `/PharmacyLogos/` | `CVSLogo.png`, `CapsulePharmacy.png`, `MarkCubanCostPlusLogo.png`, `WalgreensLogo.png`       | Medication cards (`Feature Cards / Medications Snapshot / Mobile`), price comparison surfaces |
| `/medications/` | `Paroxetine.png`, `enalapril.png`, `metformin.png`, `ozempic.png`, `simvastatin.png` | Medication snapshot and detail-card product imagery |
| `/recommendedforyou/` | `Activity_card_Medical_Benefit.png`, `Activity_card_Mindfulness.png`, `Activity_card_PBM_Benefit.png`, wellness variants | Recommendation-card backgrounds |
| `/screenstructure/` | 18 mobile and web screenshots listed in §11.2.4 | Layout and design-pattern references for AI agents; never production artwork |

> **Discoverability:** Because subdirectory contents change, generators should query `https://api.github.com/repos/uxrightway/assets/git/trees/main?recursive=1` before generation and use the exact case-sensitive paths returned by the current tree.

### 11.2.1 Historical Raw Asset Manifest (29-file snapshot)

This historical manifest enumerates every file that was present in `uxrightway/assets` at commit `c0cc9e8ac08b7341573dce0997240d6e0ce8473e`. It is retained only for reproducing older approved designs. **Do not use this subsection for new generation work; use §11.2.2 instead.** Paths and filenames are case-sensitive.

**Generator rule:** Prefer the `main` URL for implementations that should receive repository updates. Prefer the pinned URL for design review, visual regression tests, or reproducible generated artifacts. Use the direct URL from this table; do not construct a GitHub `blob`, `tree`, or `blame` URL.

| Asset path | Direct raw URL (`main`) | Direct raw URL (pinned) | Intended use |
| --- | --- | --- | --- |
| `Call.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Call.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg) | Guide call action |
| `Chat.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Chat.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Chat.svg) | Guide chat action |
| `Doctor.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Doctor.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Doctor.svg) | Provider search and provider recommendations |
| `ID.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/ID.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/ID.svg) | Member ID top action |
| `Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Icon.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Icon.svg) | Rightway symbol-only mark and favicon |
| `Inbox.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Inbox.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Inbox.svg) | Guide inbox action |
| `LocationMarker.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/LocationMarker.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/LocationMarker.svg) | Provider and pharmacy location metadata |
| `Mailorder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Mailorder.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Mailorder.svg) | Mail-order quick action |
| `Navigation/Benefits.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Benefits.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Navigation/Benefits.svg) | Benefits navigation item |
| `Navigation/Home.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Home.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Navigation/Home.svg) | Home navigation item |
| `Navigation/Inbox.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Inbox.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Navigation/Inbox.svg) | Inbox navigation item |
| `Navigation/Medication.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Medication.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Navigation/Medication.svg) | Medications navigation item |
| `PharmacyCoverage.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyCoverage.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/PharmacyCoverage.svg) | Pharmacy benefits and coverage surfaces |
| `PharmacyLogos/CVSLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/CVSLogo.png) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/PharmacyLogos/CVSLogo.png) | CVS pharmacy identity |
| `PharmacyLogos/CapsulePharmacy.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/CapsulePharmacy.png) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/PharmacyLogos/CapsulePharmacy.png) | Capsule pharmacy identity |
| `PharmacyLogos/MarkCubanCostPlusLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/MarkCubanCostPlusLogo.png) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/PharmacyLogos/MarkCubanCostPlusLogo.png) | Mark Cuban Cost Plus pharmacy identity |
| `PharmacyLogos/WalgreensLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/WalgreensLogo.png) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/PharmacyLogos/WalgreensLogo.png) | Walgreens pharmacy identity |
| `Reminder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Reminder.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Reminder.svg) | Medication reminder off state |
| `ReminderOn.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/ReminderOn.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/ReminderOn.svg) | Medication reminder on state |
| `RightWayLogo.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/RightWayLogo.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/RightWayLogo.svg) | Full Rightway horizontal lockup |
| `Savings.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Savings.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Savings.svg) | Savings and bill-summary callouts |
| `Search.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Search.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Search.svg) | Search inputs and provider search |
| `TransferMedication.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/TransferMedication.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/TransferMedication.svg) | Medication transfer flows |
| `UserProfile.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/UserProfile.svg) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/UserProfile.svg) | Profile top action |
| `avatar.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/avatar.png) | [Pinned](https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/avatar.png) | Guide portrait placeholder only |

For automated discovery of future additions, request the recursive tree and filter entries where `type == "blob"`:

```txt
https://api.github.com/repos/uxrightway/assets/git/trees/main?recursive=1
```

Before reproducing the historical snapshot, compare that response with this manifest. For current production work, use the authoritative manifest below.

### 11.2.2 Current Direct Raw Asset Table (83 files)

**Repository snapshot:** `cf8d1d5a12c8fb2eaee28cd4595ffecb9230f32c`

This is the complete current linked asset map. AI agents should use it when they need a direct clickable or fetchable raw URL. It contains the same 83 paths as the canonical list in §11.2.3.

**Raw URL construction:** Append the exact, case-sensitive asset path to one of these bases. Spaces in filenames must be URL-encoded as `%20` when a client does not encode them automatically.

```txt
Moving base: https://raw.githubusercontent.com/uxrightway/assets/main/
Pinned base: https://raw.githubusercontent.com/uxrightway/assets/cf8d1d5a12c8fb2eaee28cd4595ffecb9230f32c/
Recursive API: https://api.github.com/repos/uxrightway/assets/git/trees/main?recursive=1
```

| Asset path | Direct raw URL (`main`) | Category / intended use |
| --- | --- | --- |
| `Back.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Back.svg) | Internal-page back navigation |
| `Benefits Support Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Benefits%20Support%20Icon.svg) | Benefits Support quick action |
| `Billing Questions Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Billing%20Questions%20Icon.svg) | Billing Questions quick action |
| `Call.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Call.svg) | Guide call action |
| `Chat.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Chat.svg) | Guide chat action |
| `Clinical Guidance Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Clinical%20Guidance%20Icon.svg) | Clinical Guidance quick action |
| `Close.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Close.svg) | Dismiss and close action |
| `Doctor.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Doctor.svg) | General provider icon |
| `Find Doctor Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Find%20Doctor%20Icon.svg) | Find a Doctor or Facility quick action |
| `ID.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/ID.svg) | Member ID top action, legacy root path |
| `Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Icon.svg) | Rightway symbol-only mark and favicon |
| `Inbox.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Inbox.svg) | Guide inbox action |
| `LocationMarker.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/LocationMarker.svg) | Provider and pharmacy location metadata |
| `Mailorder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Mailorder.svg) | Mail-order quick action |
| `Navigation/Benefits.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Benefits.svg) | Benefits navigation item |
| `Navigation/Bill.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Bill.svg) | Bill Support navigation item |
| `Navigation/Get Care.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Get%20Care.svg) | Get Care navigation item |
| `Navigation/Home.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Home.svg) | Home navigation item |
| `Navigation/ID.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/ID.svg) | Member ID top/navigation action |
| `Navigation/Inbox.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Inbox.svg) | Inbox navigation item |
| `Navigation/Medication.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/Medication.svg) | Medications navigation item |
| `Navigation/UserProfile.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Navigation/UserProfile.svg) | Profile & Settings top/navigation action |
| `PharmacyCoverage.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyCoverage.svg) | Pharmacy benefits and coverage surfaces |
| `PharmacyLogos/CVSLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/CVSLogo.png) | CVS pharmacy identity |
| `PharmacyLogos/CapsulePharmacy.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/CapsulePharmacy.png) | Capsule pharmacy identity |
| `PharmacyLogos/MarkCubanCostPlusLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/MarkCubanCostPlusLogo.png) | Mark Cuban Cost Plus pharmacy identity |
| `PharmacyLogos/WalgreensLogo.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PharmacyLogos/WalgreensLogo.png) | Walgreens pharmacy identity |
| `Reminder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Reminder.svg) | Medication reminder off state |
| `ReminderOn.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/ReminderOn.svg) | Medication reminder on state |
| `RightWayLogo.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/RightWayLogo.svg) | Full Rightway horizontal lockup |
| `RightwayAvatarCircle.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/RightwayAvatarCircle.png) | Circular Rightway guide avatar for internal-page top navigation and contact surfaces |
| `Savings.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Savings.svg) | Savings and bill-summary callouts |
| `Schedule Appointment Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Schedule%20Appointment%20Icon.svg) | Schedule Appointment quick action |
| `Search.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Search.svg) | Search inputs and provider search |
| `TransferMedication.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/TransferMedication.svg) | Medication transfer flows |
| `UserProfile.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/UserProfile.svg) | Profile top action, legacy root path |
| `avatarPharmacyHealthGuide.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/avatarPharmacyHealthGuide.png) | Pharmacy/Health Guide portrait mock asset |
| `curveimageWeightManagment.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/curveimageWeightManagment.png) | Curved decorative image for weight-management program surfaces and recommendation cards |
| `medications/Paroxetine.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/Paroxetine.png) | Paroxetine medication snapshot/detail image |
| `medications/enalapril.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/enalapril.png) | Enalapril medication snapshot/detail image |
| `medications/metformin.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/metformin.png) | Metformin medication snapshot/detail image |
| `medications/ozempic.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/ozempic.png) | Ozempic medication snapshot/detail image |
| `medications/simvastatin.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/simvastatin.png) | Simvastatin medication snapshot/detail image |
| `recommendedforyou/Activity_card_Medical_Benefit.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Medical_Benefit.png) | Recommended card — medical benefits |
| `recommendedforyou/Activity_card_Mindfulness.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Mindfulness.png) | Recommended card — mindfulness |
| `recommendedforyou/Activity_card_PBM_Benefit.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_PBM_Benefit.png) | Recommended card — PBM benefits |
| `recommendedforyou/Activity_card_Wellness.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Wellness.png) | Recommended card — wellness |
| `recommendedforyou/Activity_card_Wellness_2.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Wellness_2.png) | Recommended card — wellness variant 2 |
| `recommendedforyou/Activity_card_Wellness_3.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Wellness_3.png) | Recommended card — wellness variant 3 |

#### Current Folder Structure

```txt
uxrightway/assets/
├── Navigation/          # 8 navigation and top-action SVGs
├── PharmacyLogos/       # 4 pharmacy identity PNGs
├── recommendedforyou/   # 6 recommendation-card background PNGs
└── root                 # 42 brand, guide, search, care-action, prior-authorization, utility, and program-art assets
```

**Historical snapshot rules:**

1. Use these rules only when reproducing commit `60e3a0d828c30f0cb1b31be6380d251d1fc80ac8`. For new work, read §11.2.3 before selecting any asset.
2. Prefer the purpose-specific new icons (`Find Doctor Icon.svg`, `Benefits Support Icon.svg`, `Schedule Appointment Icon.svg`, `Billing Questions Icon.svg`, `Clinical Guidance Icon.svg`) over generic or hand-drawn substitutes.
3. Prefer `Navigation/ID.svg` and `Navigation/UserProfile.svg` for the current desktop top actions. Root `ID.svg` and `UserProfile.svg` remain available for legacy matching.
4. Use `avatarPharmacyHealthGuide.png` instead of the removed `avatar.png` path.
5. Select recommendation backgrounds from `recommendedforyou/` according to the card category; do not fabricate replacement artwork when a matching repository image exists.
6. At generation time, query the recursive API and compare its blob paths with this 46-file manifest. Flag additions, deletions, or moves before using an unlisted path.

### 11.2.3 Current Authoritative Repository Map (83 files)

**Repository snapshot:** `cf8d1d5a12c8fb2eaee28cd4595ffecb9230f32c`

This is the authoritative repository map for all new AI-generated work. It supersedes §11.2.1 and §11.2.2. Paths and filenames are case-sensitive.

```txt
Moving raw base: https://raw.githubusercontent.com/uxrightway/assets/main/
Pinned raw base: https://raw.githubusercontent.com/uxrightway/assets/cf8d1d5a12c8fb2eaee28cd4595ffecb9230f32c/
Recursive API: https://api.github.com/repos/uxrightway/assets/git/trees/main?recursive=1
```

To fetch an asset, append its exact path below to a raw base. URL-encode spaces as `%20` when the client does not encode them automatically.

#### Canonical File List

```txt
Back.svg
Benefits Support Icon.svg
Billing Questions Icon.svg
Call.svg
CallOutline.svg
CalledProvider.svg
Calnder.svg
CaseFolder.svg
Chat.svg
ChatOutline.svg
Chevron.svg
Clinical Guidance Icon.svg
Close.svg
Denied-1.svg
Denied.svg
Doctor.svg
Fax.svg
Find Doctor Icon.svg
ID.svg
Icon.svg
Inbox.svg
Layer_23.svg
LocationMarker.svg
Mailorder.svg
Navigation/Benefits.svg
Navigation/Bill.svg
Navigation/Get Care.svg
Navigation/Home.svg
Navigation/ID.svg
Navigation/Inbox.svg
Navigation/Medication.svg
Navigation/UserProfile.svg
PharmacyCoverage.svg
PriorAuthNotApproveSupportingImage.png
PriorAuthorizationRequest.svg
Provider Icon.svg
PharmacyLogos/CVSLogo.png
PharmacyLogos/CapsulePharmacy.png
PharmacyLogos/MarkCubanCostPlusLogo.png
PharmacyLogos/WalgreensLogo.png
Reminder.svg
ReminderOn.svg
Refill.svg
RequestInfo.svg
RightWayLogo.svg
RightwayAvatarCircle.png
Savings.svg
Schedule Appointment Icon.svg
Search.svg
TransferMedication.svg
UserProfile.svg
arrow-left-regular 1.svg
avatarPharmacyHealthGuide.png
curveimageWeightManagment.png
medications/Paroxetine.png
medications/enalapril.png
medications/metformin.png
medications/ozempic.png
medications/simvastatin.png
recommendedforyou/Activity_card_Medical_Benefit.png
recommendedforyou/Activity_card_Mindfulness.png
recommendedforyou/Activity_card_PBM_Benefit.png
recommendedforyou/Activity_card_Wellness.png
recommendedforyou/Activity_card_Wellness_2.png
recommendedforyou/Activity_card_Wellness_3.png
screenstructure/Mobile Add Passkey Modal (1).png
screenstructure/Mobile Care Complete _ Scheduling _ Calendar Page Viewed.png
screenstructure/Mobile Coverage - Home (1).png
screenstructure/Mobile Denied (5).png
screenstructure/Mobile Internal screens in white.png
screenstructure/Mobile Main Layout.png
screenstructure/Mobile Nav Active requests final.png
screenstructure/Mobile Nav Get Care.png
screenstructure/Mobile PBM With Medications (6).png
screenstructure/Mobile PBM empty State.png
screenstructure/Mobile Rx (2).png
screenstructure/Mobile Unity Medication Tab With Medications.png
screenstructure/Mobile Unity Requests Tab with Requests.png
screenstructure/Mobile intro page.png
screenstructure/Web Provider search.png
screenstructure/web Home Nav.png
screenstructure/web Home PBM.png
screenstructure/web Not Approved Expanded.png
```

#### Prior Authorization and Internal-Screen Asset Bundle (new in snapshot `4e67d31`)

Use these production assets for Prior Authorization and medication-request states instead of CSS approximations, Unicode symbols, icon-library substitutes, or cropped screen-reference pixels.

| Asset path | Direct raw URL (`main`) | Intended use |
| --- | --- | --- |
| `CallOutline.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/CallOutline.svg) | Provider phone/contact chip |
| `CalledProvider.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/CalledProvider.svg) | “Called your provider” timeline event |
| `Calnder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Calnder.svg) | Request-date icon; preserve repository spelling |
| `CaseFolder.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/CaseFolder.svg) | Case ID metadata icon |
| `ChatOutline.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/ChatOutline.svg) | Chat/Explore Your Options action |
| `Chevron.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Chevron.svg) | Timeline show/hide disclosure |
| `Denied.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Denied.svg) | Denied status badge |
| `Denied-1.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Denied-1.svg) | Denied timeline-event variant |
| `Fax.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Fax.svg) | Fax-sent timeline event |
| `Layer_23.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Layer_23.svg) | Prior-authorization education/support icon |
| `PriorAuthNotApproveSupportingImage.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PriorAuthNotApproveSupportingImage.png) | Denial-letter image in Latest Update |
| `PriorAuthorizationRequest.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/PriorAuthorizationRequest.svg) | Prior-authorization-requested timeline event |
| `Provider Icon.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Provider%20Icon.svg) | Prescriber/provider metadata chip |
| `Refill.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/Refill.svg) | Medication refill action/state |
| `RequestInfo.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/RequestInfo.svg) | Request-for-more-information timeline event |
| `arrow-left-regular 1.svg` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/arrow-left-regular%201.svg) | Directional arrow for internal-page links and CTAs |

**Prior Authorization mapping:** Use `RightwayAvatarCircle.png` for the circular guide/avatar control in the top navigation; `Denied.svg` in the DENIED badge; `Provider Icon.svg` and `CallOutline.svg` in the provider row; `CaseFolder.svg` and `Calnder.svg` in the case-summary panel; `PriorAuthNotApproveSupportingImage.png` in Latest Update; `ChatOutline.svg` in Explore Your Options; `Chevron.svg` for timeline visibility; and the corresponding event-specific assets in each timeline row. Preserve the avatar image's aspect ratio and crop it with `object-fit: cover`; do not redraw or substitute it with initials.

**Mandatory refill-icon rule:** Whenever “Refills Left 1” is rendered on a mobile medication card, render `Refill.svg` immediately before the label using the raw URL `https://raw.githubusercontent.com/uxrightway/assets/main/Refill.svg`. Size it explicitly to `15×15px`, use `object-fit: contain`, and keep a 4px icon-to-label gap. Do not use `♙`, a text glyph, an icon-library substitute, or an empty placeholder. Do not render the refill icon or an empty metadata paragraph on medication states that have no refill label.

#### Current Folder Structure

```txt
uxrightway/assets/
├── Navigation/          # 8 navigation and top-action SVGs
├── PharmacyLogos/       # 4 pharmacy identity PNGs
├── medications/         # 5 medication product images
├── recommendedforyou/   # 6 recommendation-card background PNGs
├── screenstructure/     # 18 mobile/web layout-reference screenshots
└── root                 # 42 brand, guide, search, care-action, prior-authorization, utility, and program-art assets
```

#### Medication Images

| Medication | Direct raw URL (`main`) | Typical use |
| --- | --- | --- |
| Paroxetine | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/Paroxetine.png) | Medication snapshot/detail cards |
| Enalapril | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/enalapril.png) | Medication snapshot/detail cards |
| Metformin | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/metformin.png) | Medication snapshot/detail cards |
| Ozempic | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/ozempic.png) | Medication snapshot/detail cards |
| Simvastatin | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/medications/simvastatin.png) | Medication snapshot/detail cards |

### 11.2.4 Screen Structure Reference Library

The `screenstructure/` folder contains screenshots for agents to inspect before generating a related screen. These are **layout and design-pattern references**, not production image assets. Do not place an entire screenshot into an interface, use it as a page background, trace its text into a raster layer, or treat screenshot pixels as reusable icons. Instead, study its composition, chrome, hierarchy, spacing, card patterns, navigation behavior, and responsive platform conventions; then build the interface with tokens, components, and production assets from this document.

| Reference screenshot | Direct raw URL (`main`) | Use it to understand |
| --- | --- | --- |
| `Mobile Main Layout.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Main%20Layout.png) | Default mobile shell, hero, content column, and bottom navigation |
| `Mobile intro page.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20intro%20page.png) | Mobile entry/onboarding composition |
| `Mobile Internal screens in white.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Internal%20screens%20in%20white.png) | Mobile internal-page white surface and header treatment |
| `Mobile Add Passkey Modal (1).png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Add%20Passkey%20Modal%20%281%29.png) | Mobile modal, overlay, and passkey prompt patterns |
| `Mobile Care Complete _ Scheduling _ Calendar Page Viewed.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Care%20Complete%20_%20Scheduling%20_%20Calendar%20Page%20Viewed.png) | Scheduling/calendar screen structure |
| `Mobile Coverage - Home (1).png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Coverage%20-%20Home%20%281%29.png) | Coverage home and partner-solution layout |
| `Mobile Denied (5).png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Denied%20%285%29.png) | Denied/error state hierarchy and messaging |
| `Mobile Nav Active requests final.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Nav%20Active%20requests%20final.png) | Nav-mode active request cards and page order |
| `Mobile Nav Get Care.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Nav%20Get%20Care.png) | Nav-mode Get Care choices and card stack |
| `Mobile PBM With Medications (6).png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20PBM%20With%20Medications%20%286%29.png) | PBM home populated medication state |
| `Mobile PBM empty State.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20PBM%20empty%20State.png) | PBM home empty state and collapse behavior |
| `Mobile Rx (2).png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Rx%20%282%29.png) | Prescription/medication-detail layout |
| `Mobile Unity Medication Tab With Medications.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Unity%20Medication%20Tab%20With%20Medications.png) | Unity home Medications tab populated state |
| `Mobile Unity Requests Tab with Requests.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Mobile%20Unity%20Requests%20Tab%20with%20Requests.png) | Unity home Requests tab populated state |
| `Web Provider search.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/Web%20Provider%20search.png) | Desktop provider-search shell, controls, filters, and results |
| `web Home Nav.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/web%20Home%20Nav.png) | Desktop Nav-mode home modules and side menu |
| `web Home PBM.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/web%20Home%20PBM.png) | Desktop PBM home modules and side menu |
| `web Not Approved Expanded.png` | [Raw](https://raw.githubusercontent.com/uxrightway/assets/main/screenstructure/web%20Not%20Approved%20Expanded.png) | Desktop internal request/detail expanded state |

#### Screen Reference Selection Rules

1. Determine `platform`, `mode`, `screen_type`, and `data_state` before selecting a screenshot.
2. Inspect the closest matching screenshot first. Use `Mobile Main Layout.png` only as the general mobile fallback; use the specific PBM, Nav, Unity, Rx, coverage, scheduling, or modal screenshot when applicable.
3. For desktop Home screens, choose `web Home Nav.png` or `web Home PBM.png` according to mode. For desktop provider results, choose `Web Provider search.png`. For expanded internal request states, choose `web Not Approved Expanded.png`.
4. A screenshot clarifies layout but does not override the mode rules, accessible component behavior, tokens, or exact asset requirements elsewhere in this document.
5. When screenshot content conflicts with a newer explicit specification in this document, follow the explicit specification and flag the screenshot as potentially stale.
6. Use screenshot dimensions and visible relationships to infer responsive constraints, not fixed viewport assumptions. Rebuild with semantic HTML/native components and responsive layout primitives.
7. For reproducible design reviews, use the pinned screenshot base at commit `6d3263808386930d2cfa367e9038b532ab54072e`.

### 11.3 Usage Rules

- **Always fetch via the raw GitHub URL**, never via the repo HTML, blob, or blame URL. `raw.githubusercontent.com/uxrightway/assets/main/Chat.svg` renders; `github.com/uxrightway/assets/blob/main/Chat.svg` and `github.com/uxrightway/assets/blame/main/Chat.svg` do not.
- **SVGs inherit color from `currentColor`.** When generating code, set `color` on the parent (or `fill="currentColor"` on the SVG) so icons match their text context. Do not hardcode fills.
- **Do not proxy or mirror the assets** in product code. Import them at build time or reference the raw URL directly so updates to the repo propagate automatically.
- **Use pinned commit URLs for review snapshots.** When the source is a GitHub permalink, preserve the commit SHA in the raw URL so the asset cannot drift after approval.
- **`avatarPharmacyHealthGuide.png` is a mock/fallback portrait only.** In production, the guide portrait comes from a real photograph served by the Rightway backend. The removed `avatar.png` path must not be used.
- **Pharmacy logos are third-party trademarks.** Use them only to identify the pharmacy in a legitimate product context (price comparison, mail-order transfer). Never use them in marketing without legal review.
- **File naming is the canonical reference.** The case and spelling in the repo (`UserProfile.svg`, `Mailorder.svg`, `ReminderOn.svg`) must be matched exactly — the server is case-sensitive.

### 11.4 Example — Fetching an Icon

```tsx
// React / JSX
const ASSET_REF = 'main';
const ASSET_BASE = `https://raw.githubusercontent.com/uxrightway/assets/${ASSET_REF}`;

<img
  src={`${ASSET_BASE}/Chat.svg`}
  alt=""
  width={15}
  height={15}
  aria-hidden="true"
/>

<img
  src={`${ASSET_BASE}/PharmacyLogos/CVSLogo.png`}
  alt="CVS"
  width={48}
  height={48}
/>

// Or as a CSS background
.chat-icon {
  background-image: url('https://raw.githubusercontent.com/uxrightway/assets/main/Chat.svg');
  width: 15px;
  height: 15px;
}
```

For icons that need to inherit color, fetch the SVG source and inline it (or use an SVG sprite pipeline) so `currentColor` resolves against the parent text color.

### 11.5 Example - Converting GitHub URLs

```ts
const RAW_HOST = 'https://raw.githubusercontent.com';

function toRightwayRawAssetUrl(input: string) {
  const url = new URL(input);

  if (url.hostname === 'raw.githubusercontent.com') {
    return input;
  }

  if (url.hostname !== 'github.com') {
    throw new Error('Expected a GitHub asset URL.');
  }

  const [owner, repo, view, ref, ...pathParts] = url.pathname.split('/').filter(Boolean);

  if (owner !== 'uxrightway' || repo !== 'assets') {
    throw new Error('Expected uxrightway/assets.');
  }

  if (view !== 'blob' && view !== 'blame') {
    throw new Error('Expected a blob or blame permalink.');
  }

  return `${RAW_HOST}/${owner}/${repo}/${ref}/${pathParts.join('/')}`;
}

toRightwayRawAssetUrl(
  'https://github.com/uxrightway/assets/blame/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg'
);
// https://raw.githubusercontent.com/uxrightway/assets/c0cc9e8ac08b7341573dce0997240d6e0ce8473e/Call.svg
```

---

## 12. Open Gaps & Roadmap

The Member Library inherits gaps from the Global Library but also has a few of its own:

| Area                                                                                                                             | Status                            | Notes                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Semantic status tokens                                                                                                           | ✅ **Closed**                     | Member Library defines `alert-600`, `success-500`, `disabled-700`. Use these over the Global Library placeholders. |
| Form inputs (text, select, date, toggle, radio)                                                                                  | ⚠ Not present in Screens section | Inherit from Global Library §7.2 working standard.                                                                 |
| Field-level error / validation states                                                                                            | ⚠ Not present                    | Use `alert-600` text + alert icon. Flag for design review.                                                         |
| Dark mode                                                                                                                        | ⚠ Not present                    | Out of scope.                                                                                                      |
| Toast / Snackbar                                                                                                                 | ⚠ Not present                    | Flag for design review.                                                                                            |
| Modal / Bottom sheet                                                                                                             | ⚠ Not present in Screens section | May be in a separate Components page. Flag if generating.                                                          |
| Black ramp repeats (`black-500` through `black-900` all `#000000`)                                                                | ℹ Source behavior                | This is present in the Global Colors page. Prefer role tokens for text/icon decisions and do not infer contrast steps from the repeated black ramp.                              |
| Icon spelling — `Chervon 16px`                                                                                                   | ⚠ Typo preserved in source       | Do not "fix" when looking up the component; the canonical name has the typo. Flag for a future migration.          |
| Quick action third card (PBM / Unity Medications)                                                                                | ⚠ Unlabeled in source frames     | The third card's label is not filled in the Screens. Confirm with design before generating.                        |
| Loading / skeleton states per screen                                                                                             | ⚠ Not present                    | Flag for design review.                                                                                            |
| Accessibility annotations on cards (tap targets, labels for screen readers)                                                      | ⚠ Not formally documented        | Use Global Library §12 as baseline.                                                                                |

---

## 13. Quick Reference for Figma Make

When Figma Make generates a Member App screen, run through this checklist:

**Input signals to collect:**

- [ ] Platform (mobile, mobile web, or desktop web)?
- [ ] Mode (PBM, Nav, Unity)?
- [ ] If Unity: which tab (Medications, Requests)?
- [ ] Screen type (Home, Get Care, Bill Support, Coverage, Profile, Internal)?
- [ ] Data state (empty vs populated)?

**Then generate for mobile / mobile web:**

1. Hero at the right height (207 home / 90 internal) with the right guide copy.
2. Tabs IF Unity home.
3. Search IF PBM home OR Unity Medications.
4. Quick Actions with the mode-correct icon set and count (3 or 5).
5. The primary content section matching the mode and tab.
6. Recommended for you carousel.
7. Bottom nav instance matching the mode exactly.
8. Home indicator at the bottom.

**Then generate for desktop web:**

1. Blue top actions header with 187×35 Rightway lockup, ID action, and profile action.
2. 1280px centered workspace on `#EBEDF1`.
3. `Menu / Web / Side` left rail, 284px wide, with the active row matching the current page.
4. If Home: render the white `HeroBanner` Guide module first in the content column.
5. If Internal: do **not** render `HeroBanner`; render a white content card with a 40×40 back button before the page title.
6. Add mode-correct search, quick actions, medications/requests, and recommendations only where the web design defines them.
7. Never add mobile bottom nav, iOS status bar, dynamic island, or home indicator to desktop web.

**Token usage:**

- Global text primary: `Text / Primary` = `#282828`
- Global text secondary: `Text / Secondary` = `#747474`
- Global text disabled: `Text / Disabled` = `#A7A7AC`
- Global icon primary: `Icon / Primary` = `#282828`
- Primary blue: `Foundation/Blue/blue-500` = `#12275E`
- Deep hero blue: `Foundation/Blue/blue-700` = `#0D1C43`
- Hero gradient: `PrimaryDark` = `linear-gradient(225deg, #0D1C43 0%, #142C6B 50.39%, #102356 100%)`
- Latest Update gradient: `Gradients/SecondaryLight` = `linear-gradient(135deg, #ECCB6A 0%, #FFA278 100%)`
- Hero text on blue: `Foundation/White/white-500` = `#FFFFFF`
- Card shadow: `drop1` = `0 32px 51px -13px rgba(34, 24, 63, 0.06)`
- Notification badge: `Foundation/Orange/orange-500` = `#FD9366`
- Online status dot: `Semantic/Success/success-500` = `#819A58`
- Error: `Semantic/Alert/alert-600` = `#B40707`
- Disabled text on disabled bg: `Semantic/Disabled/disabled-700` = `#5D5D5D`

---

## 14. CSS Custom Properties (Member App extension)

Add these on top of the Global Library tokens:

```css
:root {
  /* Global Library — Role colors */
  --color-text-primary: #282828;
  --color-text-secondary: #747474;
  --color-text-disabled: #a7a7ac;
  --color-icon-primary: #282828;

  /* Global Library — Foundation color ramps */
  --color-blue-50: #e7e9ef;
  --color-blue-100: #b6bccd;
  --color-blue-200: #848ca0;
  --color-blue-300: #606e93;
  --color-blue-400: #41527e;
  --color-blue-500: #12275e;
  --color-blue-600: #102356;
  --color-blue-700: #0d1c43;
  --color-blue-800: #0a1534;
  --color-blue-900: #081027;

  --color-olive-50: #fdfffc;
  --color-olive-100: #f9f9f7;
  --color-olive-200: #f6f7f3;
  --color-olive-300: #f2f3ee;
  --color-olive-400: #f0f1ea;
  --color-olive-500: #ecede5;
  --color-olive-600: #d7d8d0;
  --color-olive-700: #a8a8a3;
  --color-olive-800: #82827e;
  --color-olive-900: #636460;

  --color-orange-50: #fff4f0;
  --color-orange-100: #feded0;
  --color-orange-200: #fecdb9;
  --color-orange-300: #feb798;
  --color-orange-400: #fda985;
  --color-orange-500: #fd9366;
  --color-orange-600: #e6865d;
  --color-orange-700: #b46848;
  --color-orange-800: #8b5138;
  --color-orange-900: #633a2b;

  --color-black-50: #e6e6e6;
  --color-black-100: #b0b0b0;
  --color-black-200: #8a8a8a;
  --color-black-300: #545454;
  --color-black-400: #333333;
  --color-black-500: #000000;
  --color-black-600: #000000;
  --color-black-700: #000000;
  --color-black-800: #000000;
  --color-black-900: #000000;

  --color-white-50: #ffffff;
  --color-white-100: #ffffff;
  --color-white-200: #ffffff;
  --color-white-300: #ffffff;
  --color-white-400: #ffffff;
  --color-white-500: #ffffff;
  --color-white-600: #e8e8e8;
  --color-white-700: #b5b5b5;
  --color-white-800: #8c8c8c;
  --color-white-900: #6b6b6b;

  /* Global Library — Feature colors */
  --color-feature-1-50: #f9fbff;
  --color-feature-1-100: #ebf4ff;
  --color-feature-1-200: #eef2f2;
  --color-feature-1-300: #d4e7ff;
  --color-feature-1-400: #cce2ff;
  --color-feature-1-500: #bfdbff;
  --color-feature-1-600: #aec7e8;
  --color-feature-1-700: #899bb5;
  --color-feature-1-800: #69788c;
  --color-feature-1-900: #505c6b;

  --color-feature-2-50: #ecede5;
  --color-feature-2-100: #e8f1de;
  --color-feature-2-200: #dde7ce;
  --color-feature-2-300: #cedcb7;
  --color-feature-2-400: #c5d5a9;
  --color-feature-2-500: #b6cb94;
  --color-feature-2-600: #a6b987;
  --color-feature-2-700: #819069;
  --color-feature-2-800: #647051;
  --color-feature-2-900: #4c553e;

  --color-feature-3-50: #fbf8fb;
  --color-feature-3-100: #f2e8f3;
  --color-feature-3-200: #ebdded;
  --color-feature-3-300: #e2cde4;
  --color-feature-3-400: #ddc4df;
  --color-feature-3-500: #d4b5d7;
  --color-feature-3-600: #c1a5c4;
  --color-feature-3-700: #978199;
  --color-feature-3-800: #756476;
  --color-feature-3-900: #594c5a;

  --color-feature-4-50: #fffbf2;
  --color-feature-4-100: #fff4d5;
  --color-feature-4-200: #ffeec1;
  --color-feature-4-300: #ffe7a5;
  --color-feature-4-400: #ffe294;
  --color-feature-4-500: #ffdb79;
  --color-feature-4-600: #e8c76e;
  --color-feature-4-700: #b59b56;
  --color-feature-4-800: #8c7843;
  --color-feature-4-900: #6b5c33;

  /* Global Library — Semantic */
  --color-alert-50: #fbeeee;
  --color-alert-100: #fbe5e5;
  --color-alert-200: #f8d0d0;
  --color-alert-300: #f1b0b0;
  --color-alert-400: #e78282;
  --color-alert-500: #d85151;
  --color-alert-600: #b40707;
  --color-alert-700: #993a3a;
  --color-alert-800: #751414;
  --color-alert-900: #5b2222;

  --color-success-50: #f2f5ee;
  --color-success-100: #d8e0cb;
  --color-success-200: #c5d1b2;
  --color-success-300: #abbb8f;
  --color-success-400: #9aae79;
  --color-success-500: #819a58;
  --color-success-600: #1a642c;
  --color-success-700: #12471f;
  --color-success-800: #0e3718;
  --color-success-900: #0b2a12;

  --color-disabled-50: #f3f3f3;
  --color-disabled-100: #d9d9d9;
  --color-disabled-200: #c6c6c6;
  --color-disabled-300: #acacac;
  --color-disabled-400: #9c9c9c;
  --color-disabled-500: #838383;
  --color-disabled-600: #777777;
  --color-disabled-700: #5d5d5d;
  --color-disabled-800: #484848;
  --color-disabled-900: #373737;

  /* Global Library — Gradients */
  --gradient-background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
  --gradient-global-primary-dark: linear-gradient(105deg, #11255b 13.17%, #224291 80.51%, #0f1b3d 117.07%);
  --gradient-global-secondary-light: linear-gradient(58deg, #eccb6a 20.12%, #ffa278 91.83%);

  /* Member App — Gradients */
  --gradient-primary-dark: linear-gradient(225deg, #0d1c43 0%, #142c6b 50.39%, #102356 100%);
  --gradient-secondary-light: linear-gradient(135deg, #eccb6a 0%, #ffa278 100%);
  --gradient-radius: 16px;

  /* Member App — Elevation */
  --shadow-card: 0 32px 51px -13px rgba(34, 24, 63, 0.06);
}
```

---

## 15. Changelog

| Date       | Change                                                                                                                                                                                                                                                       | Author                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| 2026-07-01 | Added the full `00 Global Library` color page (`5:104`, frame `6:271`): foundation ramps, feature ramps, semantic ramps, Global gradient swatches, expanded CSS variables, and updated black-ramp guidance.                                                  | Generated from Figma MCP context       |
| 2026-07-01 | Added inherited `00 Global Library` Figma source details and explicit Global role tokens/styles from file `kiaK8hxoUQyeDN9Qilho9B`: text roles, icon primary, disabled text, success, and `Ω / Content / Overline`.                                          | Generated from Figma MCP context       |
| 2026-07-01 | Added redesign gradient guidance from Figma node `10506:30868`: `PrimaryDark` hero gradient, `Gradients/SecondaryLight` Latest Update gradient, native start/end mappings, web CSS values, and CSS custom properties.                                      | Generated from Figma MCP context       |
| 2026-07-01 | Updated §11 Image & Icon Assets with the current `uxrightway/assets` repo structure, including pinned commit raw URLs, GitHub `blob`/`blame` URL conversion, `RightWayLogo.svg`, `LocationMarker.svg`, `/meds`, and current subdirectory inventories.          | Generated from GitHub repo screenshots + API |
| 2026-04-17 | Added §11 Image & Icon Assets documenting the `uxrightway/assets` GitHub repo — raw URL pattern, full root-file inventory with Figma component mappings, `/Navigation` and `/PharmacyLogos` subdirectories, and usage rules. Renumbered downstream sections. | Generated from GitHub repo + Figma MCP |
| 2026-04-17 | Initial Member App guidelines extracted from Figma Member Library (`5r1Jj8okimVP0wIaGGCKh5`). Covers all three modes (PBM, Nav, Unity), 11 named screens, full Foundation + Semantic color ramps, hero architecture, mode-aware generation rules.            | Generated from Figma MCP context       |

---

_End of Member App guidelines. This file extends but does not replace the Global Library `guidelines.md` — read both when generating any Member App surface._
