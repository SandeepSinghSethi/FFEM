# FlashFlood Matrix 🌊

> An AI-assisted disaster response platform that converts live rainfall forecasts, terrain elevation models, and graph-based routing into actionable flash-flood risk scores and evacuation decisions — before the water rises.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-latest-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Python](https://img.shields.io/badge/Python-3-3776AB)
![Node](https://img.shields.io/badge/Node.js-Express-339933)

## 🚨 The Problem

Existing weather apps tell communities: *"Heavy rain is coming."*

They do not tell district officers: *"Village X will flood in 3 hours — evacuate toward Location Y because it is 22 metres higher than the surrounding terrain."*

This decision gap costs lives. **FlashFlood Matrix** closes it.

## ✨ Core Features

*   **National Risk Heatmap:** Interactive choropleth map of India highlighting state-level risk tiers.
*   **Terrain-Aware Routing:** Evacuation matrix maps flood zones to safe zones, factoring in elevation gain, road distance, and ETA — not just aerial proximity.
*   **Actionable District Dashboards:** View specific impact data (people, villages, hospitals, schools at risk) to prioritize rescue deployments.
*   **Time-Boxed Forecasts:** Risk assessments include 1–6 hour predictive windows for proactive response.
*   **Alert Simulator:** Auto-generate SMS-formatted warnings with location, risk tier, and safe zone instructions.

## 🧠 Risk Engine & Formula

Our Python-based risk engine computes scores using rainfall, terrain, and drainage factors:

```
RiskScore = (RainfallIntensity × RainfallDuration) × TerrainFactor × DrainageFactor

TerrainFactor  = 1 / (slope_deg + 0.1)
DrainageFactor = basin_area_km2 / drainage_capacity
```

**Thresholds:**
*   **> 0.75:** Extreme (immediate evacuation)
*   **0.50 - 0.75:** High (standby)
*   **0.25 - 0.50:** Moderate (watch)
*   **< 0.25:** Low (safe)

> *Note: This is a proxy model calibrated against known high-risk zones (e.g., Kedarnath) built for a 24-hour hackathon. Full hydrological modelling requires multi-year data integration.*

## 🏗️ System Architecture

*   **Frontend:** React 18 SPA built with Vite, styled with Tailwind CSS, and visualised using Leaflet.js & Recharts.
*   **Backend:** Node.js/ layer serving data and alerts.
*   **Data Sources:** OpenWeather API, NASA SRTM (Elevation), HydroSHEDS, OpenStreetMap, WorldPop.

## 🚀 Getting Started

The platform runs offline by default using bundled mock data (zero API dependency) to ensure reliability during demos.

### Prerequisites

*   Node.js (v20+)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SandeepSinghSethi/FFEM.git
    cd FFEM
    ```

2.  **Run the Backend (Node.js):**
    ```bash
    npm run build
    npm run dev
    ```

## 📜 Hackathon Disclaimer

This project was built within a 24-hour timeframe. The primary focus is the **decision support layer** (evacuation matrix, routing, impact quantification). Datasets (apart from OpenWeather) have been pre-processed and simplified (e.g., topojson) to ensure rapid load times and offline fallback.
