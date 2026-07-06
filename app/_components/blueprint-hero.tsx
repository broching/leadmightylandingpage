"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bell } from "lucide-react";
import { PRODUCTS, STATUS_LABEL } from "./products";
import { ProductMock } from "./product-mocks";

const DWELL = 3600; // ms each product line holds the spotlight before advancing

export function BlueprintHero() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Auto-advance through the product lines; hovering/focusing the showcase
  // pauses it, and prefers-reduced-motion disables it outright.
  React.useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => {
      setActive((a) => (a + 1) % PRODUCTS.length);
    }, DWELL);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const select = React.useCallback((i: number) => setActive(i), []);
  const current = PRODUCTS[active];

  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 md:min-h-[92vh] md:grid-cols-[1.04fr_1fr] md:gap-10 md:pb-24 md:pt-36">
      {/* ── Left: the thesis ────────────────────────────────────── */}
      <div>
        <div className="lm-hero-eyebrow">
          <span className="lm-hero-eyebrow-dot" aria-hidden>
            <span />
            <span />
          </span>
          <span className="lm-eyebrow" style={{ letterSpacing: "0.16em" }}>
            B2B software, Based in Singapore
          </span>
        </div>

        <h1 className="lm-display mt-6 text-[clamp(2.6rem,6.4vw,4.6rem)]">
          Software that makes
          <br />
          your business
          <br />
          <span className="lm-spectrum-text">mighty.</span>
        </h1>

        <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed" style={{ color: "var(--lm-ink-2)" }}>
          LeadMighty builds a growing suite of business software on one shared
          foundation — so your people, money and customers finally live in the same
          place. It starts with{" "}
          <span className="lm-accent-text font-semibold">LeadMightyHR</span>, live and
          in real use today.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="https://hr.leadmighty.com" className="lm-btn lm-btn-primary">
            Tour LeadMightyHR <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#products" className="lm-btn lm-btn-ghost">
            See the whole suite
          </a>
        </div>
      </div>

      {/* ── Right: the product showcase (signature) ──────────────────── */}
      <div className="lm-rail-wrap">
        <div className="lm-rail-frame">
          <div className="lm-rail-frame-bar">
            <span className="lm-mono lm-rail-frame-label">LEADMIGHTY · THE SUITE</span>
            <span className="lm-mono lm-rail-frame-meta">
              {active + 1} / {PRODUCTS.length}
            </span>
          </div>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="lm-tabs" role="tablist" aria-label="LeadMighty product lines">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.code}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  data-active={i === active}
                  className="lm-tab"
                  style={{ "--h": p.hue } as React.CSSProperties}
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                >
                  <span className="lm-tab-dot" aria-hidden />
                  {p.code}
                </button>
              ))}
            </div>

            <div className="lm-tabs-progress" aria-hidden>
              <span
                key={active}
                className="lm-tabs-progress-fill"
                style={
                  {
                    "--h": current.hue,
                    "--h2": current.hue2,
                    animationDuration: `${DWELL}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  } as React.CSSProperties
                }
              />
            </div>

            <div className="lm-stage">
              {PRODUCTS.map((p, i) => {
                const live = p.status === "live";
                const isActive = i === active;
                return (
                  <div
                    key={p.code}
                    className="lm-stage-panel"
                    data-active={isActive}
                    aria-hidden={!isActive}
                    style={{ "--h": p.hue, "--h2": p.hue2 } as React.CSSProperties}
                  >
                    <div className="lm-stage-head">
                      <span className="lm-display lm-stage-name">{p.name}</span>
                      <span className="lm-stage-status" data-live={live}>
                        {STATUS_LABEL[p.status]}
                      </span>
                    </div>
                    <p className="lm-stage-kicker">{p.kicker}</p>
                    <div className="lm-mock-frame">
                      <ProductMock code={p.code} hue={p.hue} />
                    </div>
                    <div className="lm-stage-cta">
                      {live ? (
                        <Link
                          href="https://hr.leadmighty.com"
                          className="lm-stage-cta-link"
                          style={{ color: p.hue }}
                          tabIndex={isActive ? 0 : -1}
                        >
                          Tour LeadMightyHR <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <span className="lm-stage-cta-link" style={{ color: "var(--lm-muted)" }}>
                          <Bell className="h-3.5 w-3.5" /> On the drawing board
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="lm-rail-hint">
          <span className="lm-rail-hint-run" aria-hidden />
          Cycling through the product lines — hover to hold one
        </p>
      </div>
    </section>
  );
}
