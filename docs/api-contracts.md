# DEVSCOUT V3 — API Contracts

## Health & System Readiness
### `GET /api/health`
Returns service readiness and active pipeline stages.

```json
{
  "status": "ok",
  "service": "DEVSCOUT-V3 Backend Intelligence Engine",
  "version": "3.0.0",
  "timestamp": "2026-10-24T15:00:00.000Z"
}
```

## Decision Intelligence Pipeline Endpoints
### `POST /api/evaluate`
Executes the multi-stage research, trade-off analysis, sustainability estimation, and learning synthesis pipeline for a technology decision query.

### `GET /api/reports/:id`
Retrieves a persisted decision intelligence report including citations, carbon intensity profiles, and architecture recommendations.
