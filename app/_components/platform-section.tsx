import { Database, Fingerprint, Users, Palette, ShieldCheck, LifeBuoy, CreditCard } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { PRODUCTS } from "./products";

// What's actually consistent across products: not shared infrastructure (each
// product line runs its own database, auth and users), but the same team,
// design language, compliance floor and pricing model.
const CONSISTENT = [
  { icon: Palette, label: "Design system", note: "Same craft, every product" },
  { icon: ShieldCheck, label: "SG-first compliance", note: "CPF, PDPA, IRAS built in" },
  { icon: LifeBuoy, label: "One support team", note: "Same humans, every ticket" },
  { icon: CreditCard, label: "Simple pricing", note: "Per seat, no bundling tax" },
];

export function PlatformSection() {
  return (
    <section id="platform" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
      <SectionHeading
        eyebrow="Why LeadMighty"
        title={
          <>
            Each product stands
            <br />
            on its own. <span className="lm-accent-text">On purpose.</span>
          </>
        }
        lede="Most “all-in-one” platforms force every team onto one shared database before you've even signed up. LeadMighty doesn't. LeadMightyHR, Sales, Finance and Desk each run their own database, their own login, their own users. Start with the one you need — add another later without a forced migration, or one product's outage taking down another."
      />

      <Reveal delay={120}>
        <div className="mt-14 lm-card overflow-hidden p-6 md:p-10">
          {/* four independent stacks — deliberately not connected to each other */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {PRODUCTS.map((p) => (
              <div key={p.code} className="lm-silo" style={{ "--h": p.hue } as React.CSSProperties}>
                <div className="lm-silo-head">
                  <span className="lm-mono lm-silo-code">{p.code}</span>
                  <span className="lm-silo-badge">Isolated</span>
                </div>
                <div className="lm-silo-rows">
                  <span className="lm-silo-row">
                    <Database className="h-3.5 w-3.5" /> Own database
                  </span>
                  <span className="lm-silo-row">
                    <Fingerprint className="h-3.5 w-3.5" /> Own auth
                  </span>
                  <span className="lm-silo-row">
                    <Users className="h-3.5 w-3.5" /> Own users
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="lm-silo-caption">Same playbook. Different engines.</p>

          <div className="rounded-xl px-5 py-4" style={{ background: "var(--lm-panel-2)", border: "1px solid var(--lm-line)" }}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {CONSISTENT.map((s) => (
                <div key={s.label} className="flex items-start gap-2.5">
                  <s.icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--lm-accent)" }} />
                  <div>
                    <div className="lm-display text-sm">{s.label}</div>
                    <div className="text-xs" style={{ color: "var(--lm-muted)" }}>
                      {s.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
