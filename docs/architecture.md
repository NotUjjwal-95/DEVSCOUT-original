# DEVSCOUT V3 — System Architecture

## Overview
**DEVSCOUT V3** is an AI-powered Sustainable Technology Decision Intelligence Platform designed for the INNOTECH 2026 Finale. It assists software engineers, system architects, and technical leads in selecting optimal technology stacks and architectures through:

1. **Evidence-Backed Technical Research** (`backend/src/research/`, `backend/src/evidence/`)
2. **Transparent Multi-Axis Trade-Off Analysis** (`backend/src/analysis/`, `backend/src/recommendations/`)
3. **Green Software & Carbon Sustainability Estimates** (`backend/src/sustainability/`)
4. **Adaptive Educational Explanations & Learning Paths** (`backend/src/learning/`)

## Monorepo Layout
- `frontend/` — React 19 + TypeScript + Tailwind CSS v4 Decision Workbench & Visual Telemetry UI
- `backend/` — Express + TypeScript Multi-Stage Research & Evaluation Pipeline
- `shared/` — Cross-boundary TypeScript domain contracts (`shared/types/`)
- `docs/` — Architectural specifications and API contracts
- `scripts/` — Automation, verification, and workspace tooling
