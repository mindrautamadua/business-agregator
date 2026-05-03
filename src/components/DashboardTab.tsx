"use client";

import React from "react";
import type { TabId } from "@/app/page";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Building2,
  ChevronRight,
  Bell,
  Search,
  Zap,
  ShieldAlert,
  Rocket,
  BarChart3,
} from "lucide-react";
import "./DashboardTab.css";

type KPIItem = {
  label: string; value: string; sub?: string;
  change?: string; trend?: "up" | "down";
  icon: React.ReactNode; color: string; bg: string;
};

// ── Portfolio trend — 6 bulan terakhir ──────────────────────────
const portfolioTrend = {
  months: ["Des", "Jan", "Feb", "Mar", "Apr", "Mei"],
  values:  [52.1,  55.8,  58.3,  63.2,  67.9,  71.8],
};

// ── Risk distribution ────────────────────────────────────────────
const riskDist = [
  { label: "Healthy",  count: 3, color: "#10b981" },
  { label: "Warning",  count: 2, color: "#f59e0b" },
  { label: "Critical", count: 2, color: "#ef4444" },
];
const riskTotal = riskDist.reduce((s, r) => s + r.count, 0);

// ── Sector performance ───────────────────────────────────────────
type SectorStatus = "healthy" | "warning" | "critical";
const sectorGrid: { name: string; count: number; growth: string; status: SectorStatus }[] = [
  { name: "Tech",       count: 2, growth: "+33.3%", status: "warning"  },
  { name: "F&B",        count: 2, growth: "+12.4%", status: "healthy"  },
  { name: "Retail",     count: 1, growth: "−3.2%",  status: "critical" },
  { name: "Manufaktur", count: 1, growth: "+8.5%",  status: "warning"  },
  { name: "Service",    count: 2, growth: "+18.7%", status: "healthy"  },
  { name: "Agri",       count: 1, growth: "+5.1%",  status: "warning"  },
];
const sectorStatusColor: Record<SectorStatus, { text: string; bg: string; border: string }> = {
  healthy:  { text: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)"  },
  warning:  { text: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)"  },
  critical: { text: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)"   },
};

// ── Sparkline SVG component ──────────────────────────────────────
function Sparkline({ values, months, color = "#10b981" }: {
  values: number[]; months: string[]; color?: string;
}) {
  const W = 280; const H = 44; const pad = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * W,
    y: H - pad - ((v - min) / range) * (H - pad * 2),
  }));
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${H} ${polyline} ${pts[pts.length - 1].x},${H}`;
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const rising = last.y <= prev.y; // lower y = higher value

  return (
    <div className="sparkline-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}
        preserveAspectRatio="none" className="sparkline-svg">
        <defs>
          <linearGradient id="spkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#spkGrad)" />
        <polyline points={polyline} fill="none" stroke={color}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={last.x} cy={last.y} r="4" fill={color} />
        <circle cx={last.x} cy={last.y} r="7" fill={color} fillOpacity="0.2" />
      </svg>
      <div className="sparkline-months">
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
      <div className="sparkline-meta">
        <span className="sparkline-range">
          {min.toFixed(1)}M – {max.toFixed(1)}M
        </span>
        <span className="sparkline-trend" style={{ color: rising ? "#10b981" : "#ef4444" }}>
          {rising ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {rising ? "Tren Naik" : "Tren Turun"}
        </span>
      </div>
    </div>
  );
}

/* ── static mock data (from panduan.md) ── */
const KPI: KPIItem[] = [
  {
    label: "Active Entities",
    value: "3",
    sub: "dari 5 total",
    icon: <Building2 size={18} />,
    color: "var(--blue)",
    bg: "var(--blue-glow)",
  },
  {
    label: "Entities at Risk",
    value: "2",
    sub: "Critical / Warning",
    icon: <ShieldAlert size={18} />,
    color: "var(--red)",
    bg: "var(--red-glow)",
  },
  {
    label: "Top Sektor",
    value: "Tech",
    sub: "+42.1% growth",
    icon: <TrendingUp size={18} />,
    color: "var(--amber)",
    bg: "var(--amber-glow)",
  },
  {
    label: "Avg BMC Score",
    value: "73",
    sub: "/ 100",
    icon: <BarChart3 size={18} />,
    color: "var(--accent-primary)",
    bg: "var(--accent-glow)",
  },
];

const topEntities = [
  {
    name: "TechFlow Solutions",
    sector: "Tech",
    revenue: "24.5M",
    growth: 24.5,
    bmc: 85,
    risk: "low",
  },
  {
    name: "Kopi Kenangan Senja",
    sector: "F&B",
    revenue: "18.2M",
    growth: 15.8,
    bmc: 95,
    risk: "low",
  },
  {
    name: "DataNexus AI",
    sector: "Tech",
    revenue: "5.3M",
    growth: 42.1,
    bmc: 40,
    risk: "high",
  },
];

const triageSummary = [
  {
    label: "Urgent Review",
    entity: "Clean & Bright",
    deadline: "2 Hari",
    color: "var(--red)",
    bg: "var(--red-glow)",
    icon: <ShieldAlert size={16} />,
  },
  {
    label: "Golden Opportunity",
    entity: "DataNexus AI",
    deadline: "7 Hari",
    color: "var(--amber)",
    bg: "var(--amber-glow)",
    icon: <Zap size={16} />,
  },
  {
    label: "Strategic Expansion",
    entity: "Bali, Medan",
    deadline: "30 Hari",
    color: "var(--blue)",
    bg: "var(--blue-glow)",
    icon: <Rocket size={16} />,
  },
];

export default function DashboardTab({
  onNavigate,
}: {
  onNavigate: (t: TabId) => void;
}) {
  return (
    <div className="dash">
      {/* Header */}
      <header className="dash-header anim-fade">
        <div className="dash-header-left">
          <p className="dash-greeting">Selamat Datang,</p>
          <h1 className="dash-name">Admin Hidayatullah</h1>
        </div>
        <div className="dash-header-right">
          <button className="header-icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="header-icon-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      {/* Hero Card */}
      <section className="dash-hero anim-scale d1">
        <div className="hero-bg-orb hero-orb-1" />
        <div className="hero-bg-orb hero-orb-2" />
        <div className="hero-content">
          <p className="hero-label">Total Portofolio</p>
          <h2 className="hero-value">
            Rp 71.8<span className="hero-unit">M</span>
          </h2>
          <div className="hero-change">
            <TrendingUp size={14} />
            <span>+17.7% YoY</span>
          </div>
        </div>
        <div className="hero-ring">
          <svg viewBox="0 0 80 80" className="hero-ring-svg">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="5"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="url(#heroGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${61 * 2.136} ${100 * 2.136}`}
              transform="rotate(-90 40 40)"
            />
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06d6a0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="hero-ring-label">
            <span className="hero-ring-value">61</span>
            <span className="hero-ring-sub">Health</span>
          </div>
        </div>
      </section>

      {/* Portfolio Trend Sparkline */}
      <section className="dash-section anim-slide d2">
        <div className="sparkline-card card">
          <div className="sparkline-header">
            <span className="sparkline-title">Tren Portofolio</span>
            <span className="sparkline-period">6 Bulan Terakhir</span>
          </div>
          <Sparkline values={portfolioTrend.values} months={portfolioTrend.months} />
        </div>
      </section>

      {/* KPI Grid */}
      <section className="dash-section">
        <div className="section-head anim-fade d2">
          <h3 className="section-title">KPI Utama</h3>
        </div>
        <div className="kpi-grid">
          {KPI.map((k, i) => (
            <div
              key={k.label}
              className={`kpi-card card anim-slide d${i + 2}`}
            >
              <div
                className="kpi-icon"
                style={{ color: k.color, background: k.bg }}
              >
                {k.icon}
              </div>
              <p className="kpi-label">{k.label}</p>
              <div className="kpi-value-row">
                <span className="kpi-value">{k.value}</span>
                {k.sub && <span className="kpi-sub">{k.sub}</span>}
              </div>
              {k.change && (
                <span
                  className={`badge ${
                    k.trend === "up" ? "badge-success" : "badge-danger"
                  }`}
                >
                  {k.trend === "up" ? (
                    <TrendingUp size={10} />
                  ) : (
                    <TrendingDown size={10} />
                  )}
                  {k.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Risk Distribution Bar */}
      <section className="dash-section anim-slide d4">
        <div className="section-head">
          <h3 className="section-title">Distribusi Risiko</h3>
          <span className="risk-total-label">{riskTotal} entitas</span>
        </div>
        <div className="risk-dist-card card">
          <div className="risk-bar-track">
            {riskDist.map((r) => (
              <div key={r.label} className="risk-bar-seg"
                style={{ width: `${(r.count / riskTotal) * 100}%`, background: r.color }}
              />
            ))}
          </div>
          <div className="risk-legend">
            {riskDist.map((r) => (
              <div key={r.label} className="risk-legend-item">
                <span className="risk-legend-dot" style={{ background: r.color }} />
                <span className="risk-legend-label">{r.label}</span>
                <span className="risk-legend-count" style={{ color: r.color }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Performance Grid */}
      <section className="dash-section anim-slide d5">
        <div className="section-head">
          <h3 className="section-title">Kinerja Sektor</h3>
          <span className="risk-total-label">{sectorGrid.length} sektor</span>
        </div>
        <div className="sector-grid">
          {sectorGrid.map((s) => {
            const cfg = sectorStatusColor[s.status];
            return (
              <div key={s.name} className="sector-tile"
                style={{ background: cfg.bg, borderColor: cfg.border }}>
                <span className="sector-tile-name">{s.name}</span>
                <span className="sector-tile-growth" style={{ color: cfg.text }}>
                  {s.growth}
                </span>
                <span className="sector-tile-count">{s.count} entitas</span>
                <span className="sector-tile-status" style={{ color: cfg.text }}>
                  {s.status === "healthy" ? "●" : s.status === "warning" ? "◑" : "○"} {s.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Entities */}
      <section className="dash-section">
        <div className="section-head anim-fade d3">
          <h3 className="section-title">Top Entitas</h3>
          <button
            className="section-link"
            onClick={() => onNavigate("entities")}
          >
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>
        <div className="entity-list">
          {topEntities.map((e, i) => (
            <div key={e.name} className={`entity-row card anim-slide d${i + 3}`}>
              <div className="entity-avatar">
                <span>{e.name.charAt(0)}</span>
              </div>
              <div className="entity-info">
                <h4 className="entity-name">{e.name}</h4>
                <p className="entity-meta">
                  {e.sector} · Rp {e.revenue}
                </p>
              </div>
              <div className="entity-metrics">
                <span
                  className={`entity-growth ${
                    e.growth >= 0 ? "positive" : "negative"
                  }`}
                >
                  {e.growth >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {e.growth >= 0 ? "+" : ""}
                  {e.growth}%
                </span>
                <div className="entity-bmc">
                  <span className="bmc-label">BMC</span>
                  <div className="progress-track" style={{ width: 48 }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${e.bmc}%`,
                        background:
                          e.bmc >= 80
                            ? "linear-gradient(90deg, #10b981, #06d6a0)"
                            : e.bmc >= 60
                            ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                            : "linear-gradient(90deg, #ef4444, #f87171)",
                      }}
                    />
                  </div>
                  <span className="bmc-val">{e.bmc}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Triage Preview */}
      <section className="dash-section">
        <div className="section-head anim-fade d4">
          <h3 className="section-title">Strategic Triage</h3>
          <button
            className="section-link"
            onClick={() => onNavigate("triage")}
          >
            Detail <ChevronRight size={14} />
          </button>
        </div>
        <div className="triage-preview anim-slide d5">
          {triageSummary.map((t) => (
            <div key={t.label} className="triage-pill">
              <div
                className="triage-pill-icon"
                style={{ color: t.color, background: t.bg }}
              >
                {t.icon}
              </div>
              <div className="triage-pill-info">
                <span className="triage-pill-label">{t.label}</span>
                <span className="triage-pill-entity">{t.entity}</span>
              </div>
              <span
                className="triage-pill-deadline badge"
                style={{
                  background: t.bg,
                  color: t.color,
                  borderColor: t.color,
                }}
              >
                {t.deadline}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Intelligence Loop */}
      <section className="dash-section">
        <div className="section-head anim-fade d5">
          <h3 className="section-title">Intelligence Loop</h3>
        </div>
        <div className="loop-flow anim-slide d6">
          {[
            {
              step: "1",
              title: "Sinyal Pasar",
              desc: "Data real-time dari aktivitas bisnis",
              icon: <Activity size={18} />,
            },
            {
              step: "2",
              title: "Kalkulasi",
              desc: "Pemetaan ke Strategic Matrix",
              icon: <Zap size={18} />,
            },
            {
              step: "3",
              title: "Triage",
              desc: "Prioritas aksi otomatis",
              icon: <ShieldAlert size={18} />,
            },
            {
              step: "4",
              title: "Eksekusi",
              desc: "Intervensi strategis Admin",
              icon: <Rocket size={18} />,
            },
          ].map((s, i) => (
            <React.Fragment key={s.step}>
              <div className="loop-step">
                <div className="loop-step-icon">{s.icon}</div>
                <div className="loop-step-content">
                  <span className="loop-step-num">0{s.step}</span>
                  <h4 className="loop-step-title">{s.title}</h4>
                  <p className="loop-step-desc">{s.desc}</p>
                </div>
              </div>
              {i < 3 && <div className="loop-connector" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
