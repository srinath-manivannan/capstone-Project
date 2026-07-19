<!--
📄 WHAT : This template pre-fills every new Pull Request description.
🎯 WHY  : A PR the reviewer can understand in 30 seconds gets a real review.
          (PR etiquette: DEVOPS-GUIDE.md §4)
-->

## What

<!-- One or two sentences: what does this PR change? -->

## Why

<!-- The reason/problem behind it. Link the issue if there is one. -->

## How I tested it

<!-- e.g. "ran backend + frontend locally, created/edited/deleted an item" -->

## Checklist

- [ ] Local gates pass: `format` · `lint` · `typecheck` · `build`
- [ ] Follows the repo patterns (WHAT/WHY/FLOW headers, layers, naming)
- [ ] No secrets, no `console.log` leftovers, no commented-out code
- [ ] Small & focused — one purpose per PR
