#!/usr/bin/env python3
"""
Validates the v2-merged static site: HTML tag balance, CSS brace balance,
i18n key completeness (every data-i18n key must have exactly 4 translations
in i18n.js, one per language), and broken internal links/images.

Exits non-zero (failing CI) if any check finds a problem.
"""
import glob
import json
import os
import re
import sys
from html.parser import HTMLParser

SITE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "v2-merged")
VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

ok = True


def fail(msg):
    global ok
    ok = False
    print(f"::error::{msg}")


class TagBalanceChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID_ELEMENTS:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID_ELEMENTS:
            return
        if not self.stack:
            self.errors.append(f"unmatched closing </{tag}>")
            return
        if self.stack[-1] == tag:
            self.stack.pop()
        elif tag in self.stack:
            while self.stack and self.stack[-1] != tag:
                self.errors.append(f"unclosed <{self.stack.pop()}>")
            if self.stack:
                self.stack.pop()
        else:
            self.errors.append(f"unmatched closing </{tag}>")


def check_html_tag_balance():
    print("== HTML tag balance ==")
    for fname in sorted(glob.glob(os.path.join(SITE_DIR, "*.html"))):
        checker = TagBalanceChecker()
        checker.feed(open(fname, encoding="utf-8").read())
        if checker.errors or checker.stack:
            fail(f"{os.path.basename(fname)}: {checker.errors} unclosed={checker.stack}")
    print("  done")


def check_css_brace_balance():
    print("== CSS brace balance ==")
    css_path = os.path.join(SITE_DIR, "styles.css")
    content = open(css_path, encoding="utf-8").read()
    if content.count("{") != content.count("}"):
        fail(f"styles.css: unbalanced braces ({content.count('{')} open vs {content.count('}')} close)")
    print("  done")


def check_i18n_completeness():
    print("== i18n key completeness (expect 4 translations per key) ==")
    keys = set()
    for fname in glob.glob(os.path.join(SITE_DIR, "*.html")):
        content = open(fname, encoding="utf-8").read()
        keys.update(re.findall(r'data-i18n="([^"]+)"', content))
        keys.update(re.findall(r'data-i18n-placeholder="([^"]+)"', content))

    i18n_content = open(os.path.join(SITE_DIR, "i18n.js"), encoding="utf-8").read()
    for key in sorted(keys):
        count = i18n_content.count(f'"{key}":')
        if count != 4:
            fail(f'i18n key "{key}" has {count} translations (expected 4)')
    print(f"  checked {len(keys)} keys")


def check_broken_links():
    print("== broken internal links/images ==")
    existing = set(os.listdir(SITE_DIR))
    for fname in sorted(glob.glob(os.path.join(SITE_DIR, "*.html"))):
        content = open(fname, encoding="utf-8").read()
        base = os.path.basename(fname)
        for href in re.findall(r'href="([^"]+)"', content):
            if href.startswith(("http://", "https://", "mailto:", "tel:", "#", "/")) or not href:
                continue
            path = href.split("?")[0].split("#")[0]
            if path and path not in existing:
                fail(f"{base}: broken link href=\"{href}\"")
        for src in re.findall(r'src="([^"]+)"', content):
            if src.startswith(("http://", "https://", "data:")):
                continue
            path = src.split("?")[0]
            if path and path not in existing:
                fail(f"{base}: broken src=\"{src}\"")
    print("  done")


def check_jsonld():
    print("== JSON-LD validity ==")
    for fname in sorted(glob.glob(os.path.join(SITE_DIR, "*.html"))):
        content = open(fname, encoding="utf-8").read()
        for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL):
            try:
                json.loads(block)
            except json.JSONDecodeError as e:
                fail(f"{os.path.basename(fname)}: invalid JSON-LD ({e})")
    print("  done")


def check_cache_bust_versions_consistent():
    print("== cache-busting version consistency ==")
    versions = set()
    for fname in sorted(glob.glob(os.path.join(SITE_DIR, "*.html"))):
        content = open(fname, encoding="utf-8").read()
        versions.update(re.findall(r'\?v=([0-9a-z]+)', content))
    if len(versions) > 1:
        fail(f"inconsistent ?v= cache-busting versions across pages: {sorted(versions)}")
    print("  done")


if __name__ == "__main__":
    check_html_tag_balance()
    check_css_brace_balance()
    check_i18n_completeness()
    check_broken_links()
    check_jsonld()
    check_cache_bust_versions_consistent()

    if ok:
        print("\nAll checks passed.")
        sys.exit(0)
    else:
        print("\nOne or more checks failed.")
        sys.exit(1)
