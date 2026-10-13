# With one more day

1. **Component and accessibility tests.** Add Vue Test Utils tests for `SliderField` (typing, blur
   normalization, error messages) and an axe check for contrast and labels.
2. **Shareable state.** Sync inputs to the URL query string so a result can be bookmarked or sent to a colleague.
3. **Hours breakdown.** Show document handling and follow-ups as separate segments in the bar, so users can
   see which part drives the estimate.
4. **Mobile summary bar.** A sticky bottom bar with the two headline numbers, so results stay visible while
   adjusting sliders on small screens.
5. **Scenario comparison.** Let users compare two automation assumptions side by side (for example 40% vs 60%).
6. **Print / PDF view.** A clean print stylesheet for sharing results internally.
7. **Visual regression checks.** Playwright screenshots at mobile, tablet, and desktop widths.
8. **Real-device pass.** Test on iOS Safari and Android Chrome for slider behavior and number keyboards.
