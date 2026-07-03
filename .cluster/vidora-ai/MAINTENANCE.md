# Vidora AI — Self-Check Protocol

## Quick Check
```bash
cd /Users/kaung/.openclaw-autoclaw/workspace
node vidora-check.js
```

## Fix Protocol
1. Run `node vidora-check.js` → find errors
2. Fix root cause in source files
3. `cd .cluster/vidora-ai/vidora-ai && npm run build`
4. `pkill -f "next dev.*3456" && npm run dev -- -p 3456 &`
5. Run `node vidora-check.js` again → verify fix
6. Repeat until 0 errors

## Known Fixes Applied (2026-07-02)
- Replaced all page.tsx with self-contained inline components (no broken shared component imports)
- Removed StoreProvider complexity from layout
- All pages use Tailwind-only styling
- Design system: #040407 base, glass effects, purple/cyan gradients
- 26 routes, TypeScript clean, all 200 OK

## Common Issues & Solutions
| Issue | Cause | Fix |
|-------|-------|-----|
| Blank page | Framer Motion starting from opacity:0 | Use whileInView instead of initial |
| Hydration error | Math.random() in SSR | Use seeded PRNG |
| Missing styles | Broken CSS module import | Use Tailwind inline classes |
| Component not found | Named import mismatch | Use default exports or check types |
