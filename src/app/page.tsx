"use client";

import React, { useState } from "react";
import DashboardTab from "@/components/DashboardTab";
import PortfolioTab from "@/components/PortfolioTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import TriageTab from "@/components/TriageTab";
import MapTabLoader from "@/components/MapTabLoader";
import BottomNav from "@/components/BottomNav";

export type TabId = "dashboard" | "entities" | "analytics" | "map" | "triage";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <div className="app-container">
      {activeTab === "dashboard" && <DashboardTab onNavigate={setActiveTab} />}
      {activeTab === "entities" && <PortfolioTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
      {activeTab === "map" && <MapTabLoader />}
      {activeTab === "triage" && <TriageTab />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
