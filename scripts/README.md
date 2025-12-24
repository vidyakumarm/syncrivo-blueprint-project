# i18n Automation Tools

This directory contains automation scripts to speed up the internationalization (i18n) process.

## i18n_automation.py

Automated extraction and translation key generation script.

### Features

- ✅ Extracts hard-coded English strings from TSX/TS files
- ✅ Generates snake_case translation keys automatically
- ✅ Creates structured reports for review
- ✅ Identifies string types (JSX content, props, toast messages)
- ✅ Filters out non-translatable content (HTML tags, numbers, etc.)

### Usage

```bash
# Run the automation script
python3 scripts/i18n_automation.py

# Output: i18n_extraction_report.txt in project root
```

### What It Does

1. **Scans files** for hard-coded strings:
   - JSX text content: `>Text here<`
   - Prop values: `title="Text"`
   - Toast/alert messages

2. **Generates translation keys**:
   - `"Contact Sales"` → `contact_sales`
   - Groups by file/section

3. **Creates report** showing:
   - Line numbers
   - Original text
   - Suggested keys
   - String type

### Current Target Files (Phase 1)

- `src/pages/ContactSales.tsx`
- `src/pages/DPA.tsx`
- `src/pages/Pricing.tsx`
- `src/components/layout/Footer.tsx`

### Next Steps After Running

1. Review `i18n_extraction_report.txt`
2. Add generated keys to `src/locales/en.json`
3. Translate to Chinese in `src/locales/zh.json`
4. Update component files to use `t()` calls

### Example Output

```
File: src/pages/ContactSales.tsx
============================================================

1. Line 62: "Schedule a Live Demo"
   Type: jsx_content
   Suggested key: schedule_a_live_demo

2. Line 74: "Choose a time that works for your team's timezone."
   Type: prop_value
   Suggested key: choose_a_time_that_works_for_your_teams
```

### Pro Tip

The script marks Chinese translations with `[需要翻译: ...]` for manual review. Use GPT-4 or a professional translator for production-quality translations.
