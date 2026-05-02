"use client";

import React from "react";
import type { TabId } from "@/app/page";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Map,
  AlertTriangle,
  FilePlus,
} from "lucide-react";
import "./BottomNav.css";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { id: "entities", label: "Entities", icon: <Building2 size={20} /> },
  { id: "map", label: "Peta", icon: <Map size={20} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
  { id: "triage", label: "Triage", icon: <AlertTriangle size={20} /> },
  { id: "input", label: "Daftar", icon: <FilePlus size={20} /> },
];

export default function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (t: TabId) => void;
}) {
  return (
    <nav className="bottom-nav glass-strong">
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(t.id)}
            aria-label={t.label}
          >
            <div className="nav-icon-wrap">
              {t.icon}
              {isActive && <div className="nav-glow" />}
            </div>
            <span className="nav-label">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
