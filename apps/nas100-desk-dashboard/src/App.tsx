import { useEffect, useMemo, useState } from "react";
import {
  ROLES,
  SCHEDULES,
  SETUP,
  SKILLS,
  SAMPLE_QUOTE,
  VENUE,
} from "./data";
import {
  closeFill,
  defaultLedger,
  loadLedger,
  roundTripCost,
  saveLedger,
  sizeLots,
  type Ledger,
} from "./paper";
import "./App.css";

type Tab = "overview" | "paper" | "skills" | "setup";

function money(n: number) {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function moneyExact(n: number) {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

export default function App() {
  const [tab, setTab] = useState<Tab>("overview");
  const [ledger, setLedger] = useState<Ledger>(() => loadLedger());
  const [entry, setEntry] = useState(SAMPLE_QUOTE.last);
  const [stop, setStop] = useState(SAMPLE_QUOTE.last - 50);
  const [target, setTarget] = useState(SAMPLE_QUOTE.last + 100);
  const [side, setSide] = useState<"long" | "short">("long");
  const [exitPx, setExitPx] = useState(SAMPLE_QUOTE.last + 60);
  const [note, setNote] = useState("Cloud desk paper sim");

  useEffect(() => {
    saveLedger(ledger);
  }, [ledger]);

  const open = ledger.fills.find((f) => f.status === "open");
  const closed = useMemo(
    () => ledger.fills.filter((f) => f.status !== "open"),
    [ledger.fills],
  );
  const sized = sizeLots(ledger.equity, entry, stop);
  const cost = roundTripCost();

  function openTrade() {
    if (open) return;
    if (sized.qty < VENUE.minLot) return;
    setLedger((prev) => ({
      ...prev,
      fills: [
        ...prev.fills,
        {
          id: `pt-${Date.now()}`,
          openedAt: new Date().toISOString(),
          skill: prev.primarySkill,
          side,
          qty: sized.qty,
          entry,
          stop,
          target,
          costs: cost,
          status: "open",
          notes: note,
        },
      ],
    }));
  }

  function flatten(status: "closed" | "stopped" | "target" | "flat") {
    if (!open) return;
    const closedFill = closeFill(open, exitPx, status);
    setLedger((prev) => ({
      ...prev,
      dayPnl: prev.dayPnl + (closedFill.pnl ?? 0),
      weekPnl: prev.weekPnl + (closedFill.pnl ?? 0),
      fills: prev.fills.map((f) => (f.id === open.id ? closedFill : f)),
    }));
  }

  function weeklyFreeze() {
    setLedger((prev) => ({
      ...prev,
      weekId: `week-${Number(String(prev.weekId).replace(/\D/g, "") || 1) + 1}`,
      dayPnl: 0,
      weekPnl: 0,
      primarySkill: "nas100-intraday-noise-area",
      backupSkill: "nas100-intraday-momentum",
    }));
  }

  function resetLedger() {
    setLedger(defaultLedger());
  }

  return (
    <div className="shell">
      <header className="hero">
        <p className="eyebrow">Cloud desk · paper only</p>
        <h1>NAS100 Desk</h1>
        <p className="lede">
          Vantage paper-trading team dashboard — agents, skills, schedules, and
          a local paper ledger so you can run the desk from the cloud.
        </p>
        <div className="hero-meta">
          <span className="chip">{VENUE.broker}</span>
          <span className="chip mono">{VENUE.tv}</span>
          <span className="chip mono">MT5 {VENUE.mt5}</span>
          <span className="chip warn">No live orders</span>
        </div>
      </header>

      <nav className="tabs" aria-label="Desk sections">
        {(
          [
            ["overview", "Overview"],
            ["paper", "Paper ledger"],
            ["skills", "Skills"],
            ["setup", "What you need"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "tab on" : "tab"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <section className="grid">
          <article className="panel span-2">
            <h2>Team</h2>
            <p className="sub">
              Agent SDK project <code>agents/nas100-paper-team</code>
            </p>
            <ul className="role-list">
              {ROLES.map((r) => (
                <li key={r.id}>
                  <div>
                    <strong>{r.title}</strong>
                    <span className="tag">{r.kind}</span>
                  </div>
                  <p>{r.owns}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>Book</h2>
            <dl className="stats">
              <div>
                <dt>Equity</dt>
                <dd>{money(ledger.equity + ledger.weekPnl)}</dd>
              </div>
              <div>
                <dt>Week P&amp;L</dt>
                <dd className={ledger.weekPnl >= 0 ? "good" : "bad"}>
                  {moneyExact(ledger.weekPnl)}
                </dd>
              </div>
              <div>
                <dt>Open</dt>
                <dd>{open ? `${open.side} ${open.qty} lot` : "Flat"}</dd>
              </div>
              <div>
                <dt>Freeze</dt>
                <dd className="mono small">{ledger.weekId}</dd>
              </div>
            </dl>
            <p className="caption">
              Sample quote {SAMPLE_QUOTE.symbol} {SAMPLE_QUOTE.last} ·{" "}
              {SAMPLE_QUOTE.asOf}
            </p>
          </article>

          <article className="panel span-2">
            <h2>Schedules (UTC)</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>When</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULES.map((s) => (
                  <tr key={s.name}>
                    <td>
                      <code>{s.name}</code>
                      <div className="mono small">{s.cron}</div>
                    </td>
                    <td>{s.when}</td>
                    <td>{s.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="panel">
            <h2>Contract</h2>
            <ul className="plain">
              <li>$1 / point / 1.0 lot</li>
              <li>Min lot {VENUE.minLot}, step {VENUE.lotStep}</li>
              <li>
                Round-turn cost model {cost} pts (spread {VENUE.spreadPoints} +
                slip)
              </li>
              <li>Flat by 15:55 America/New_York (paper)</li>
            </ul>
          </article>
        </section>
      )}

      {tab === "paper" && (
        <section className="grid">
          <article className="panel span-2">
            <h2>Open a paper trade</h2>
            <p className="sub">
              Browser-local ledger (sample data). Not connected to Vantage MT5.
            </p>
            <div className="form">
              <label>
                Side
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value as "long" | "short")}
                >
                  <option value="long">long</option>
                  <option value="short">short</option>
                </select>
              </label>
              <label>
                Entry
                <input
                  type="number"
                  step="0.01"
                  value={entry}
                  onChange={(e) => setEntry(Number(e.target.value))}
                />
              </label>
              <label>
                SL (stop-loss)
                <input
                  type="number"
                  step="0.01"
                  value={stop}
                  onChange={(e) => setStop(Number(e.target.value))}
                />
              </label>
              <label>
                TP (take-profit)
                <input
                  type="number"
                  step="0.01"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                />
              </label>
              <label className="wide">
                Note
                <input value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
            </div>
            <p className="sized">
              Size preview: <strong>{sized.qty || "—"}</strong> lots · risk{" "}
              {moneyExact(sized.riskDollars)} · stop {sized.stopPoints} pts ·
              skill <code>{ledger.primarySkill}</code>
            </p>
            <div className="actions">
              <button type="button" className="primary" onClick={openTrade} disabled={!!open || sized.qty < VENUE.minLot}>
                Open paper
              </button>
              <button type="button" onClick={weeklyFreeze}>
                Weekly freeze → next week
              </button>
              <button type="button" className="ghost" onClick={resetLedger}>
                Reset ledger
              </button>
            </div>
          </article>

          <article className="panel">
            <h2>Manage open</h2>
            {open ? (
              <>
                <p className="levels">
                  {open.side} {open.qty} lots @ {open.entry}
                </p>
                <p className="levels">
                  <strong>SL</strong> {open.stop}
                  {" · "}
                  <strong>TP</strong> {open.target ?? "—"}
                </p>
                <label>
                  Exit
                  <input
                    type="number"
                    step="0.01"
                    value={exitPx}
                    onChange={(e) => setExitPx(Number(e.target.value))}
                  />
                </label>
                <div className="actions stack">
                  <button type="button" className="primary" onClick={() => flatten("target")}>
                    Close target/manual
                  </button>
                  <button type="button" onClick={() => flatten("stopped")}>
                    Mark stopped
                  </button>
                  <button type="button" onClick={() => flatten("flat")}>
                    Flat
                  </button>
                </div>
              </>
            ) : (
              <p className="sub">No open position.</p>
            )}
          </article>

          <article className="panel span-3">
            <h2>Fills</h2>
            {closed.length === 0 && !open ? (
              <p className="sub">No fills yet — open a paper trade above.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Side</th>
                    <th>Lots</th>
                    <th>Entry</th>
                    <th>SL</th>
                    <th>TP</th>
                    <th>Exit</th>
                    <th>R</th>
                    <th>P&amp;L</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...ledger.fills].reverse().map((f) => (
                    <tr key={f.id}>
                      <td className="mono small">
                        {new Date(f.openedAt).toLocaleString("en-GB", {
                          timeZone: "Europe/London",
                        })}{" "}
                        Europe/London
                      </td>
                      <td>{f.side}</td>
                      <td>{f.qty}</td>
                      <td>{f.entry}</td>
                      <td>{f.stop}</td>
                      <td>{f.target ?? "—"}</td>
                      <td>{f.exit ?? "—"}</td>
                      <td>{f.rMultiple?.toFixed(2) ?? "—"}</td>
                      <td className={(f.pnl ?? 0) >= 0 ? "good" : "bad"}>
                        {f.pnl == null ? "—" : moneyExact(f.pnl)}
                      </td>
                      <td>{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </article>
        </section>
      )}

      {tab === "skills" && (
        <section className="grid">
          {(["venue", "intraday", "scalping", "ops"] as const).map((group) => (
            <article className="panel" key={group}>
              <h2>{group}</h2>
              <ul className="skill-list">
                {SKILLS.filter((s) => s.group === group).map((s) => (
                  <li key={s.id}>
                    <code>{s.id}</code>
                    <span>{s.blurb}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}

      {tab === "setup" && (
        <section className="grid">
          <article className="panel span-3">
            <h2>Everything you need</h2>
            <ol className="setup">
              {SETUP.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong>
                  <p>{s.detail}</p>
                </li>
              ))}
            </ol>
            <div className="callout">
              <strong>Hosted agent deploy</strong>
              <p>
                This Cloud Agent VM has no Cursor service account attached, so
                the trading bot cannot be deployed from here. Use the dashboard
                for ops visibility, then deploy{" "}
                <code>agents/nas100-paper-team</code> from your signed-in
                machine or attach a service account and ask again.
              </p>
            </div>
          </article>
        </section>
      )}

      <footer className="foot">
        Educational paper trading only · Not financial advice · Confirm Vantage
        symbol suffix and live spread on your account
      </footer>
    </div>
  );
}
