"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PrismMark, Wordmark } from "./prism-mark";

const LINKS = [
  { name: "Platform", href: "/#platform" },
  { name: "Products", href: "/#products" },
  { name: "LeadMightyHR", href: "https://hr.leadmighty.com" },
  { name: "Contact", href: "/#contact" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5"
        style={{
          background: scrolled
            ? "color-mix(in oklab, var(--lm-panel) 82%, transparent)"
            : "transparent",
          border: `1px solid ${scrolled ? "var(--lm-line)" : "transparent"}`,
          boxShadow: scrolled ? "var(--lm-shadow)" : "none",
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <Link href="/" aria-label="LeadMighty home" className="flex items-center gap-2">
          <PrismMark className="h-7 w-7" />
          <Wordmark />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm md:flex">
          {LINKS.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                className="transition-colors duration-150"
                style={{ color: "var(--lm-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lm-ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lm-muted)")}
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:block">
            <Link href="/#contact" className="lm-btn lm-btn-primary !px-4 !py-2 text-sm">
              Get started
            </Link>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
            style={{ border: "1px solid var(--lm-line)" }}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          style={{
            background: "color-mix(in oklab, var(--lm-panel) 92%, transparent)",
            border: "1px solid var(--lm-line)",
            boxShadow: "var(--lm-shadow-lg)",
            backdropFilter: "blur(14px)",
          }}
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm"
                  style={{ color: "var(--lm-ink)" }}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--lm-line)" }}>
            <Link href="/#contact" onClick={() => setOpen(false)} className="lm-btn lm-btn-primary w-full">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
