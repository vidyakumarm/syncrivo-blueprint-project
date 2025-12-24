#!/usr/bin/env python3
"""
i18n Automation Script for SyncRivo
Extracts hard-coded strings, generates translation keys, and assists with i18n implementation.
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple, Set

class I18nAutomation:
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.locales_dir = self.project_root / "src" / "locales"
        
    def extract_hardcoded_strings(self, file_path: str) -> List[Dict[str, any]]:
        """Extract hard-coded English strings from a TSX/TS file."""
        print(f"\n🔍 Analyzing: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        strings_found = []
        
        # Pattern 1: Strings in JSX text content: >Text here<
        pattern1 = r'>\s*([A-Z][a-zA-Z\s,\.\'\"&;!?\-()]{3,})\s*<'
        for match in re.finditer(pattern1, content):
            text = match.group(1).strip()
            if self._is_valid_string(text):
                strings_found.append({
                    'text': text,
                    'type': 'jsx_content',
                    'line': content[:match.start()].count('\n') + 1
                })
        
        # Pattern 2: String literals in props: title="Text"
        pattern2 = r'(?:title|placeholder|description|label|aria-label)\s*=\s*"([^"]+)"'
        for match in re.finditer(pattern2, content):
            text = match.group(1).strip()
            if self._is_valid_string(text):
                strings_found.append({
                    'text': text,
                    'type': 'prop_value',
                    'line': content[:match.start()].count('\n') + 1
                })
        
        # Pattern 3: Toast/alert messages
        pattern3 = r'(?:title|description):\s*["\']([^"\']+)["\']'
        for match in re.finditer(pattern3, content):
            text = match.group(1).strip()
            if self._is_valid_string(text):
                strings_found.append({
                    'text': text,
                    'type': 'toast_message',
                    'line': content[:match.start()].count('\n') + 1
                })
        
        # Deduplicate by text
        seen = set()
        unique_strings = []
        for item in strings_found:
            if item['text'] not in seen:
                seen.add(item['text'])
                unique_strings.append(item)
        
        print(f"✅ Found {len(unique_strings)} unique hard-coded strings")
        return unique_strings
    
    def _is_valid_string(self, text: str) -> bool:
        """Check if string is a valid candidate for translation."""
        # Skip very short strings
        if len(text) < 3:
            return False
        
        # Skip if it's just a number or symbol
        if text.replace(' ', '').replace('.', '').isdigit():
            return False
        
        # Skip common HTML/React elements
        skip_words = {'div', 'span', 'button', 'input', 'label', 'form', 'table', 'svg', 'path'}
        if text.lower() in skip_words:
            return False
        
        # Must start with uppercase letter or be a sentence
        if not (text[0].isupper() or text.count(' ') >= 2):
            return False
        
        return True
    
    def generate_translation_keys(self, strings: List[Dict], section_name: str) -> Dict[str, str]:
        """Generate i18n keys from extracted strings."""
        translations = {}
        
        for item in strings:
            text = item['text']
            # Create snake_case key from text
            key = self._text_to_key(text)
            full_key = f"{section_name}.{key}"
            translations[full_key] = text
        
        return translations
    
    def _text_to_key(self, text: str) -> str:
        """Convert text to snake_case key."""
        # Remove special characters
        key = re.sub(r'[^\w\s]', '', text)
        # Convert to lowercase and replace spaces with underscores
        key = '_'.join(key.lower().split())
        # Limit length
        if len(key) > 50:
            key = key[:50]
        return key
    
    def translate_to_chinese(self, english_text: str) -> str:
        """
        Generate Chinese translation.
        Note: This is a placeholder. In production, you would:
        1. Use GPT-4 API for high-quality translations
        2. Use a professional translation service
        3. Have a human translator review
        
        For now, returns a marker for manual translation.
        """
        return f"[需要翻译: {english_text}]"
    
    def update_locale_files(self, translations: Dict[str, str], section: str):
        """Update both en.json and zh.json with new translations."""
        # Update English locale
        en_file = self.locales_dir / "en.json"
        with open(en_file, 'r', encoding='utf-8') as f:
            en_data = json.load(f)
        
        # Create nested structure
        parts = section.split('.')
        current = en_data
        for part in parts[:-1]:
            if part not in current:
                current[part] = {}
            current = current[part]
        
        # Add translations
        for key, value in translations.items():
            key_parts = key.split('.')
            final_key = key_parts[-1]
            current[final_key] = value
        
        # Write back
        with open(en_file, 'w', encoding='utf-8') as f:
            json.dump(en_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Updated {en_file}")
        
        # Similar for Chinese (with placeholder translations)
        zh_file = self.locales_dir / "zh.json"
        with open(zh_file, 'r', encoding='utf-8') as f:
            zh_data = json.load(f)
        
        current = zh_data
        for part in parts[:-1]:
            if part not in current:
                current[part] = {}
            current = current[part]
        
        for key, value in translations.items():
            key_parts = key.split('.')
            final_key = key_parts[-1]
            current[final_key] = self.translate_to_chinese(value)
        
        with open(zh_file, 'w', encoding='utf-8') as f:
            json.dump(zh_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Updated {zh_file} (requires manual translation review)")
    
    def generate_replacement_report(self, file_path: str, strings: List[Dict]) -> str:
        """Generate a report showing what needs to be replaced."""
        report = f"\n{'='*60}\n"
        report += f"File: {file_path}\n"
        report += f"{'='*60}\n\n"
        
        for i, item in enumerate(strings, 1):
            report += f"{i}. Line {item['line']}: \"{item['text']}\"\n"
            report += f"   Type: {item['type']}\n"
            report += f"   Suggested key: {self._text_to_key(item['text'])}\n\n"
        
        return report


def main():
    """Main execution function."""
    automation = I18nAutomation()
    
    # Files to process (Phase 1 remaining)
    files_to_process = [
        "src/pages/ContactSales.tsx",
        "src/pages/DPA.tsx",
        "src/pages/Pricing.tsx",
        "src/components/layout/Footer.tsx"
    ]
    
    print("🚀 Starting i18n Automation Script")
    print("=" * 60)
    
    all_reports = []
    
    for file_path in files_to_process:
        full_path = os.path.join(automation.project_root, file_path)
        
        if not os.path.exists(full_path):
            print(f"⚠️  File not found: {file_path}")
            continue
        
        # Extract strings
        strings = automation.extract_hardcoded_strings(full_path)
        
        if not strings:
            print(f"✅ No hard-coded strings found in {file_path}")
            continue
        
        # Generate report
        report = automation.generate_replacement_report(file_path, strings)
        all_reports.append(report)
        
        # Generate translation keys (you can customize the section name)
        file_name = os.path.basename(file_path).replace('.tsx', '').replace('.ts', '')
        section_name = file_name.lower()
        
        translations = automation.generate_translation_keys(strings, section_name)
        
        print(f"\n📝 Generated {len(translations)} translation keys for {file_name}")
    
    # Save combined report
    report_file = "i18n_extraction_report.txt"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("i18n String Extraction Report\n")
        f.write("=" * 60 + "\n\n")
        for report in all_reports:
            f.write(report)
    
    print(f"\n📄 Full report saved to: {report_file}")
    print("\n✅ Automation complete!")
    print("\nNext steps:")
    print("1. Review the extraction report")
    print("2. Manually review and improve Chinese translations (marked with [需要翻译:])")
    print("3. Use the report to guide component file updates")


if __name__ == "__main__":
    main()
