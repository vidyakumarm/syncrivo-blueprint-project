# docs/audits/core-web-vitals.md

## Post-P1 Results
- LCP: **Improved** (Hero text renders before animation hydration)
- CLS: **~0** (Fixed container size `w-[340px] h-[340px]` etc. prevents layout shift)
- Notes: Animation logic extracted to `HeroLoopAnimation`, deferred via `useEffect`, and wrapped in fixed-size container. Reduced motion respected.

## Observations
- **Hero stability**: The text and buttons fade in (`transition-all duration-700`). The 3D/Orbit animation relies on JS, so it will pop in late.
- **Largest element**: The headline "The Universal Messaging Layer...".
- **Layout shifts source**: Font loading (`Inter`) and Animation container initialization.
