"use client";

import React, { useState } from "react";
import { Building2, RefreshCw, ChevronRight, CalendarDays, ClipboardList } from "lucide-react";
import BMCRegistrationForm from "./BMCRegistrationForm";
import PeriodicUpdateForm from "./PeriodicUpdateForm";
import "./InputFormTab.css";

type Mode = "hub" | "bmc" | "periodic";

export default function InputFormTab() {
  const [mode, setMode] = useState<Mode>("hub");

  if (mode === "bmc") return <BMCRegistrationForm />;
  if (mode === "periodic") return <PeriodicUpdateForm onBack={() => setMode("hub")} />;

  return (
    <div className="hub-screen">
      <div className="hub-header anim-fade">
        <ClipboardList size={28} className="hub-header-icon" />
        <h1 className="hub-title">Form Input</h1>
        <p className="hub-subtitle">Pilih jenis formulir yang ingin diisi</p>
      </div>

      {/* BMC Registration */}
      <button className="hub-card anim-slide d1" onClick={() => setMode("bmc")} type="button">
        <div className="hub-card-icon" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
          <Building2 size={22} />
        </div>
        <div className="hub-card-body">
          <h3 className="hub-card-title">Registrasi Bisnis</h3>
          <p className="hub-card-desc">
            Daftar bisnis baru ke agregator. Mengisi 11 langkah profil &amp; 9 blok BMC lengkap.
          </p>
          <div className="hub-card-tags">
            <span className="hub-tag blue">11 Langkah</span>
            <span className="hub-tag blue">BMC Lengkap</span>
            <span className="hub-tag blue">KBLI</span>
          </div>
        </div>
        <ChevronRight size={18} className="hub-card-arrow" />
      </button>

      {/* Periodic Update */}
      <button className="hub-card anim-slide d2" onClick={() => setMode("periodic")} type="button">
        <div className="hub-card-icon" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
          <RefreshCw size={22} />
        </div>
        <div className="hub-card-body">
          <h3 className="hub-card-title">Update Periodik</h3>
          <p className="hub-card-desc">
            Update kondisi bisnis bulanan atau triwulanan. Kinerja keuangan, operasional, pelanggan &amp; perubahan BMC.
          </p>
          <div className="hub-card-tags">
            <span className="hub-tag green">Bulanan</span>
            <span className="hub-tag green">Triwulanan</span>
            <span className="hub-tag green">Health Index</span>
          </div>
        </div>
        <ChevronRight size={18} className="hub-card-arrow" />
      </button>

      {/* Info card */}
      <div className="hub-info anim-slide d3">
        <CalendarDays size={14} />
        <p>Update bulanan &approx; 10 menit &nbsp;·&nbsp; Triwulanan &approx; 25 menit</p>
      </div>
    </div>
  );
}
