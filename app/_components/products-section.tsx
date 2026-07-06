"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { PRODUCTS, STATUS_LABEL, type Product } from "./products";
import { ProductMock } from "./product-mocks";

const DWELL = 5200;

// Preselect a product in the contact form, then scroll to it. Decoupled via a
// window event so the two components never import each other.
function requestContact(productName: string) {
  window.dispatchEvent(new CustomEvent("lm-select-product", { detail: productName }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function ProductCard({ p, active }: { p: Product; active: boolean }) {
  const live = p.status === "live";
  return (
    <article
      className="lm-carousel-card"
      data-active={active}
      aria-hidden={!active}
      style={{ "--h": p.hue, "--h2": p.hue2 } as React.CSSProperties}
    >
      <div className="lm-carousel-card-head">
        <span className="lm-mono lm-carousel-card-code">{p.code}</span>
        <span className="lm-carousel-card-status" data-live={live}>
          {STATUS_LABEL[p.status]}
        </span>
      </div>

      <div className="lm-mock-frame lm-mock-frame--lg">
        <ProductMock code={p.code} hue={p.hue} />
      </div>

      <h3 className="lm-display lm-carousel-card-name">{p.name}</h3>
      <p className="lm-carousel-card-blurb">{p.blurb}</p>

      <div className="lm-carousel-card-chips">
        {p.capabilities.map((cap) => (
          <span key={cap} className="lm-chip">
            {cap}
          </span>
        ))}
      </div>

      <div className="lm-carousel-card-cta">
        {live ? (
          <Link
            href="https://hr.leadmighty.com"
            className="lm-carousel-card-link"
            style={{ color: p.hue }}
            tabIndex={active ? 0 : -1}
          >
            Tour it <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => requestContact(p.name)}
            className="lm-carousel-card-link"
            style={{ color: "var(--lm-muted)" }}
            tabIndex={active ? 0 : -1}
          >
            <Bell className="h-4 w-4" /> Tell me when it&apos;s ready
          </button>
        )}
      </div>
    </article>
  );
}

export function ProductsSection() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

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

  const go = React.useCallback((dir: 1 | -1) => {
    setActive((a) => (a + dir + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  return (
    <section id="products" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The suite"
          title={
            <>
              Four products.
              <br />
              <span className="lm-spectrum-text">One playbook.</span>
            </>
          }
          lede="LeadMightyHR is live and already doing real work. Sales, Finance and Desk are on the drawing board — independent products, built to the same standard. Swipe through the lineup."
        />

        <Reveal delay={120}>
          <div className="lm-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <button
              type="button"
              className="lm-carousel-arrow lm-carousel-arrow--prev"
              onClick={() => go(-1)}
              aria-label="Previous product"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="lm-carousel-viewport">
              <div className="lm-carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
                {PRODUCTS.map((p, i) => (
                  <ProductCard key={p.code} p={p} active={i === active} />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="lm-carousel-arrow lm-carousel-arrow--next"
              onClick={() => go(1)}
              aria-label="Next product"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="lm-carousel-dots" role="tablist" aria-label="Select product">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.code}
                type="button"
                role="tab"
                aria-selected={i === active}
                data-active={i === active}
                className="lm-carousel-dot"
                style={{ "--h": p.hue } as React.CSSProperties}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.name}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
