// Small, faithful mini-mockups of each product's actual UI — a leave-approval
// list, a deal board, an invoice ledger, a ticket inbox — rather than abstract
// icons. Shared between the hero showcase (compact) and the products carousel
// (large); the two contexts scale it via the `.lm-mock-frame` font-size.

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const HR_ROWS = [
  { name: "Mei Ling Tan", role: "Product Design", status: "approved" as const },
  { name: "Arjun Patel", role: "Engineering", status: "pending" as const },
  { name: "Siti Rahman", role: "Finance", status: "approved" as const },
];

const CRM_COLUMNS = [
  { label: "Lead", deals: [{ name: "Straits Retail", amt: "$4.2k" }] },
  { label: "Proposal", deals: [{ name: "Kopi & Co", amt: "$9.8k" }] },
  { label: "Won", deals: [{ name: "Marina Freight", amt: "$21k" }] },
];

const FIN_ROWS = [
  { no: "INV-014", client: "Bugis Coffee Co", amt: "$1,280", status: "approved" as const },
  { no: "INV-015", client: "Tanjong Logistics", amt: "$3,050", status: "pending" as const },
  { no: "INV-016", client: "Kembangan Studio", amt: "$860", status: "approved" as const },
];

const DESK_ROWS = [
  { subj: "Can't clock in from home", from: "J. Fernandez", unread: true },
  { subj: "Payslip PDF missing", from: "R. Kumar", unread: false },
  { subj: "Update banking details", from: "C. Wong", unread: true },
];

export function ProductMock({ code, hue }: { code: string; hue: string }) {
  switch (code) {
    case "LM·HR":
      return (
        <>
          <div className="lm-mock-toolbar">
            <span className="lm-mock-toolbar-title">Leave requests</span>
            <span className="lm-mock-toolbar-chip">This week</span>
          </div>
          <div className="lm-mock-rows">
            {HR_ROWS.map((r) => (
              <div key={r.name} className="lm-mock-row">
                <span className="lm-mock-avatar" style={{ background: hue }}>
                  {initials(r.name)}
                </span>
                <span className="lm-mock-row-text">
                  <span className="lm-mock-row-name">{r.name}</span>
                  <span className="lm-mock-row-sub">{r.role}</span>
                </span>
                <span className={`lm-mock-pill lm-mock-pill--${r.status}`}>
                  {r.status === "approved" ? "Approved" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </>
      );
    case "LM·CRM":
      return (
        <div className="lm-mock-kanban">
          {CRM_COLUMNS.map((col) => (
            <div key={col.label} className="lm-mock-kcol">
              <span className="lm-mock-kcol-label">{col.label}</span>
              {col.deals.map((d) => (
                <div key={d.name} className="lm-mock-kcard">
                  <span className="lm-mock-kcard-name">{d.name}</span>
                  <span className="lm-mock-kcard-amt" style={{ color: hue }}>
                    {d.amt}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    case "LM·FIN":
      return (
        <div className="lm-mock-ledger">
          <div className="lm-mock-ledger-head">
            <span>Invoice</span>
            <span>Client</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {FIN_ROWS.map((r) => (
            <div key={r.no} className="lm-mock-ledger-row">
              <span className="lm-mono">{r.no}</span>
              <span>{r.client}</span>
              <span>{r.amt}</span>
              <span className={`lm-mock-pill lm-mock-pill--${r.status}`}>
                {r.status === "approved" ? "Paid" : "Overdue"}
              </span>
            </div>
          ))}
        </div>
      );
    default: // LM·DESK
      return (
        <div className="lm-mock-inbox">
          {DESK_ROWS.map((t) => (
            <div key={t.subj} className="lm-mock-inbox-row">
              <span className="lm-mock-inbox-dot" style={{ background: t.unread ? hue : "transparent" }} />
              <span className="lm-mock-inbox-text">
                <span className="lm-mock-inbox-subj">{t.subj}</span>
                <span className="lm-mock-inbox-from">{t.from}</span>
              </span>
            </div>
          ))}
        </div>
      );
  }
}
