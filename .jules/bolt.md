# Bolt's Journal

## 2026-01-06 - [GSAP Animation Loop in Angular Zone]
**Learning:** GSAP animations (especially infinite loops like `repeat: -1`) running inside Angular components trigger Change Detection on every frame (approx 60fps) if not explicitly properly managed. This happens because Zone.js patches `requestAnimationFrame`.
**Action:** Always wrap GSAP animation initialization in `ngZone.runOutsideAngular(() => { ... })` to detach it from the Angular Change Detection cycle. This significantly reduces CPU overhead for motion-heavy sites.
