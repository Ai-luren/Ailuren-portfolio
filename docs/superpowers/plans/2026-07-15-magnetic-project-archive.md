# Magnetic Project Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing 3D project archive wheel with a React magnetic cover carousel that remains usable by mouse, keyboard, touch, and reduced-motion users.

**Architecture:** `src/components/MagneticProjectArchive.jsx` owns the archive data, pointer-distance calculation, selected/open state, keyboard controls, and mobile scroll behavior. `src/App.jsx` renders it into an existing `#projects-react-root` mount point while continuing to manage the independent lanyard overlay. `index.html` retains the surrounding section heading and provides section-scoped styling only; the old archive markup and imperative archive-wheel script are removed.

**Tech Stack:** React 19, Vite 8, plain CSS in `index.html`, existing GSAP only for page entrance, no new dependencies.

## Global Constraints

- Keep all assets local; do not use reference component external images.
- Use two existing WebP project covers and four visual placeholder covers that are declared in component data.
- Do not use Tailwind, Framer Motion, or add a dependency.
- Mobile uses horizontal scroll-snap rather than pointer-distance magnification.
- `prefers-reduced-motion` disables animated magnetic interpolation.
- Preserve keyboard focus, Enter/Space toggle, Escape close, and arrow-key selection.
- Run `npm run build`; start the preview and confirm the page returns HTTP 200.

---

### Task 1: Create the archive component and its data model

**Files:**
- Create: `src/components/MagneticProjectArchive.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `#projects-react-root` in `index.html` and the two local WebP cover paths.
- Produces: `<MagneticProjectArchive />`, rendered by `App` below the lanyard overlay.

- [ ] **Step 1: Add a component-level archive data array**

```jsx
const ARCHIVES = [
  { id: '01', title: '无声的回响', summary: 'AI 视频作品档案，封面与原片待补充。', cover: '/AI作品集封面/无声的回响封面.webp', status: '已归档' },
  { id: '02', title: '人河流城市', summary: 'AI 视频作品档案，封面与原片待补充。', cover: '/AI作品集封面/人河流城市.webp', status: '已归档' },
  { id: '03', title: '视觉实验', summary: '项目封面、作品信息与链接待补充。', cover: null, status: '待补充' },
  { id: '04', title: '风格化成片', summary: '项目封面、作品信息与链接待补充。', cover: null, status: '待补充' },
  { id: '05', title: '生成叙事', summary: '项目封面、作品信息与链接待补充。', cover: null, status: '待补充' },
  { id: '06', title: '镜头实验', summary: '项目封面、作品信息与链接待补充。', cover: null, status: '待补充' }
];
```

- [ ] **Step 2: Render semantic buttons and a detail panel**

```jsx
export default function MagneticProjectArchive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const active = ARCHIVES[activeIndex];

  return (
    <div className="magnetic-archive" aria-label="AI 视频创作档案">
      <div className="magnetic-archive__rail" role="list">
        {ARCHIVES.map((archive, index) => (
          <button key={archive.id} type="button" role="listitem" className="magnetic-archive__card" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <span>{archive.id} / {archive.status}</span><strong>{archive.title}</strong>
          </button>
        ))}
      </div>
      <section className="magnetic-archive__detail" aria-live="polite"><span>当前档案 / {active.id}</span><h3>{active.title}</h3><p>{active.summary}</p></section>
    </div>
  );
}
```

- [ ] **Step 3: Mount the component through the existing React entry**

```jsx
import MagneticProjectArchive from './components/MagneticProjectArchive.jsx';

// Inside App return, before the lanyard Suspense branch:
const projectRoot = document.getElementById('projects-react-root');
// Render with a portal so App continues to mount at #react-root.
{projectRoot && createPortal(<MagneticProjectArchive />, projectRoot)}
```

- [ ] **Step 4: Verify the component compiles**

Run: `npm run build`

Expected: `built in` with no JSX or missing-module error.

### Task 2: Add magnetic desktop behavior and accessible controls

**Files:**
- Modify: `src/components/MagneticProjectArchive.jsx`

**Interfaces:**
- Consumes: `ARCHIVES`, rail element ref, `activeIndex`, `openIndex`.
- Produces: CSS custom property `--magnetic-factor` for each card and the selected/detail state.

- [ ] **Step 1: Track rail-relative pointer position**

```jsx
const railRef = useRef(null);
const [pointerX, setPointerX] = useState(null);
const onPointerMove = (event) => {
  const rect = railRef.current?.getBoundingClientRect();
  if (rect && event.pointerType !== 'touch') setPointerX(event.clientX - rect.left);
};
```

- [ ] **Step 2: Derive a bounded distance factor for each cover**

```jsx
const distanceFactor = (index) => {
  if (pointerX === null || !railRef.current) return 0;
  const rect = railRef.current.getBoundingClientRect();
  const slot = rect.width / ARCHIVES.length;
  const center = slot * index + slot / 2;
  const normalized = Math.max(0, 1 - Math.abs(pointerX - center) / 220);
  return normalized * normalized * (3 - 2 * normalized);
};
```

- [ ] **Step 3: Apply the factor without layout feedback loops**

```jsx
style={{ '--magnetic-factor': distanceFactor(index), '--archive-order': index }}
```

The CSS must use `flex-basis` and `height` from `--magnetic-factor`; it must not measure cards after they enlarge.

- [ ] **Step 4: Add keyboard behavior**

```jsx
const onKeyDown = (event) => {
  if (event.key === 'Escape') setOpenIndex(null);
  if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % ARCHIVES.length);
  if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + ARCHIVES.length) % ARCHIVES.length);
};
```

- [ ] **Step 5: Verify keyboard behavior manually**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Tab reaches each card; Enter or Space opens and closes it; Escape closes; arrows change the announced current archive.

### Task 3: Replace old archive markup and visual layer

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: the `#projects` section and `#projects-react-root` portal target.
- Produces: section-scoped magnetic carousel CSS and a portal mount node.

- [ ] **Step 1: Replace legacy stage HTML with the React mount target**

```html
<div id="projects-react-root" class="motion-stage" aria-live="polite"></div>
```

- [ ] **Step 2: Remove the legacy archive-wheel script block**

Remove the code beginning with `var archiveStage = document.querySelector('.archive-stage');` and ending with `renderArchiveWheel();`. No other page interaction code is removed.

- [ ] **Step 3: Add scoped CSS for cover strips, fallback art, detail state, and mobile scroll**

```css
.magnetic-archive__card { flex: 0 1 calc(78px + var(--magnetic-factor, 0) * 142px); height: calc(344px + var(--magnetic-factor, 0) * 54px); }
.magnetic-archive__card--placeholder { background: linear-gradient(145deg, #0a1625, #183d69 58%, #0b1019); }
@media (max-width: 720px) { .magnetic-archive__rail { overflow-x: auto; scroll-snap-type: x mandatory; } .magnetic-archive__card { flex-basis: 74vw; scroll-snap-align: center; } }
@media (prefers-reduced-motion: reduce) { .magnetic-archive__card { transition: none; } }
```

- [ ] **Step 4: Keep visual hierarchy readable**

Use a bottom-only deep navy gradient inside each card for title text, a single-blue focus/hover outline, and neutral white body text. Do not add glass cards or global overlays.

- [ ] **Step 5: Verify responsive layout**

Run: `npm run build`

Expected: production build passes and no old `.archive-wheel` selector is required by runtime code.

### Task 4: Verify static delivery and clean handoff

**Files:**
- Modify: `docs/superpowers/specs/2026-07-15-magnetic-project-archive-design.md`

**Interfaces:**
- Consumes: completed component, mount node, and build output.
- Produces: the design spec’s verification note.

- [ ] **Step 1: Start the project preview**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports a localhost URL.

- [ ] **Step 2: Confirm entry response**

Run: `curl -I http://127.0.0.1:5173/`

Expected: `HTTP/1.1 200 OK`.

- [ ] **Step 3: Append verification outcome to the spec**

```markdown
## Verification

- `npm run build` passed.
- Local development server returned HTTP 200 for `/`.
- Desktop magnetic hover, click/open state, keyboard controls, mobile scroll-snap, and reduced-motion fallback were checked.
```

- [ ] **Step 4: Do not commit automatically**

This workspace has no Git repository available for a feature commit; report the changed files and validation results instead.

## Plan Self-Review

- Spec coverage: Tasks 1–3 cover local covers and placeholders, React ownership, desktop magnetism, click/open state, keyboard operation, mobile scroll-snap, reduced motion, and no-new-dependency constraints. Task 4 covers build and HTTP verification.
- Placeholder scan: placeholder covers are an intentional user-approved content state, not unfinished implementation work. No implementation step contains an unspecified action.
- Type consistency: `MagneticProjectArchive`, `ARCHIVES`, `activeIndex`, `openIndex`, `#projects-react-root`, and `--magnetic-factor` use the same names in every task.
