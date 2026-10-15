# Chuzhika project rules

## Browser
- NEVER open or control the browser on your own.
- Do not launch the browser to verify, preview, or screenshot your work.
- Only use the browser when I explicitly ask, for example with "open the browser", "check in the browser", or the /preview workflow.
- To verify your work, use the terminal instead: run `npm run build` and `npm run lint`, and report any errors.

## Project
- Stack: Next.js (App Router, TypeScript), Tailwind CSS, GSAP + ScrollTrigger, Lenis, Framer Motion, dnd-kit.
- Static export is enabled (output: "export"). Do not use server-only features unless I ask.
- Mark interactive components with "use client".
- Reusable components go in /components, content in /data, assets in /public/images and /public/videos.

## Working style
- Work in small stages and show a short summary after each one.
- Do not install new packages without telling me why.
- Do not rewrite files I did not ask you to change.
- Keep code clean, typed, and commented.
- Respect prefers-reduced-motion for every animation.
- Make sure `npm run build` passes before saying a task is done.
