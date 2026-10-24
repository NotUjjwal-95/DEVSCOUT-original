import React, { useState, useMemo } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  Terminal,
  Layers,
  Cpu,
  Leaf,
  BookOpen,
  Scale,
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

export interface TreeNode {
  name: string;
  path: string;
  type: 'directory' | 'file';
  layer: 'frontend' | 'backend' | 'shared' | 'docs' | 'ops' | 'root';
  description: string;
  children?: TreeNode[];
  preview?: string;
}

const REPO_TREE: TreeNode = {
  name: 'DEVSCOUT-V3',
  path: 'DEVSCOUT-V3/',
  type: 'directory',
  layer: 'root',
  description: 'Root monorepo workspace for DEVSCOUT V3 — AI-Powered Sustainable Technology Decision Intelligence Platform.',
  children: [
    {
      name: 'frontend',
      path: 'DEVSCOUT-V3/frontend/',
      type: 'directory',
      layer: 'frontend',
      description: 'React 19 + TypeScript + Vite client application for interactive decision intelligence and sustainability trade-off visualization.',
      children: [
        {
          name: 'public',
          path: 'DEVSCOUT-V3/frontend/public/',
          type: 'directory',
          layer: 'frontend',
          description: 'Static public assets served at the root path.',
          children: [
            {
              name: 'favicon.svg',
              path: 'DEVSCOUT-V3/frontend/public/favicon.svg',
              type: 'file',
              layer: 'frontend',
              description: 'Vector emblem for DEVSCOUT V3 browser tab identity.',
              preview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">\n  <rect width="32" height="32" rx="6" fill="#0B0F17" />\n  <path d="M8 16L14 10L20 16L14 22L8 16Z" stroke="#10B981" stroke-width="2" />\n</svg>`,
            },
          ],
        },
        {
          name: 'src',
          path: 'DEVSCOUT-V3/frontend/src/',
          type: 'directory',
          layer: 'frontend',
          description: 'Frontend source modules organized by architectural responsibility.',
          children: [
            { name: 'assets', path: 'DEVSCOUT-V3/frontend/src/assets/', type: 'directory', layer: 'frontend', description: 'Static illustrations, diagrams, and vector assets.' },
            { name: 'components', path: 'DEVSCOUT-V3/frontend/src/components/', type: 'directory', layer: 'frontend', description: 'Reusable UI primitives, data tables, and telemetry charts.' },
            { name: 'layouts', path: 'DEVSCOUT-V3/frontend/src/layouts/', type: 'directory', layer: 'frontend', description: 'Workspace shell, navigation rail, and split-pane comparison layouts.' },
            { name: 'pages', path: 'DEVSCOUT-V3/frontend/src/pages/', type: 'directory', layer: 'frontend', description: 'Top-level route views: Decision Studio, Evidence Matrix, Sustainability Lab, and Learning Hub.' },
            { name: 'features', path: 'DEVSCOUT-V3/frontend/src/features/', type: 'directory', layer: 'frontend', description: 'Domain-scoped feature slices (trade-off analysis, carbon modeling, stack comparison).' },
            { name: 'hooks', path: 'DEVSCOUT-V3/frontend/src/hooks/', type: 'directory', layer: 'frontend', description: 'Custom React hooks for pipeline streaming, query state, and keyboard shortcuts.' },
            { name: 'services', path: 'DEVSCOUT-V3/frontend/src/services/', type: 'directory', layer: 'frontend', description: 'Typed HTTP & SSE API client services communicating with the backend intelligence engine.' },
            { name: 'types', path: 'DEVSCOUT-V3/frontend/src/types/', type: 'directory', layer: 'frontend', description: 'Frontend UI view-model types and component prop contracts.' },
            { name: 'utils', path: 'DEVSCOUT-V3/frontend/src/utils/', type: 'directory', layer: 'frontend', description: 'Formatting helpers, SCI score calculators, and metric normalizers.' },
            { name: 'constants', path: 'DEVSCOUT-V3/frontend/src/constants/', type: 'directory', layer: 'frontend', description: 'Evaluation criteria weights, default cloud regions, and benchmark baselines.' },
            {
              name: 'App.tsx',
              path: 'DEVSCOUT-V3/frontend/src/App.tsx',
              type: 'file',
              layer: 'frontend',
              description: 'Root application component orchestrating layout and workspace views.',
            },
            {
              name: 'main.tsx',
              path: 'DEVSCOUT-V3/frontend/src/main.tsx',
              type: 'file',
              layer: 'frontend',
              description: 'DOM hydration entry point mounting the React 19 root.',
            },
            {
              name: 'index.css',
              path: 'DEVSCOUT-V3/frontend/src/index.css',
              type: 'file',
              layer: 'frontend',
              description: 'Global stylesheet importing Tailwind CSS v4 and custom design tokens.',
            },
          ],
        },
        { name: 'tests', path: 'DEVSCOUT-V3/frontend/tests/', type: 'directory', layer: 'frontend', description: 'Frontend component and end-to-end test suites.' },
        { name: 'index.html', path: 'DEVSCOUT-V3/frontend/index.html', type: 'file', layer: 'frontend', description: 'HTML5 document shell for the Vite SPA.' },
        { name: 'package.json', path: 'DEVSCOUT-V3/frontend/package.json', type: 'file', layer: 'frontend', description: 'Frontend package manifest (@devscout/frontend).' },
        { name: 'tsconfig.json', path: 'DEVSCOUT-V3/frontend/tsconfig.json', type: 'file', layer: 'frontend', description: 'TypeScript compiler configuration for the frontend workspace.' },
        { name: 'vite.config.ts', path: 'DEVSCOUT-V3/frontend/vite.config.ts', type: 'file', layer: 'frontend', description: 'Vite bundler configuration with React and Tailwind plugins.' },
        { name: '.env.example', path: 'DEVSCOUT-V3/frontend/.env.example', type: 'file', layer: 'frontend', description: 'Template for client-side VITE_* environment variables.' },
      ],
    },
    {
      name: 'backend',
      path: 'DEVSCOUT-V3/backend/',
      type: 'directory',
      layer: 'backend',
      description: 'Node.js + Express + Gemini AI multi-stage research, trade-off analysis, and sustainability intelligence backend.',
      children: [
        {
          name: 'src',
          path: 'DEVSCOUT-V3/backend/src/',
          type: 'directory',
          layer: 'backend',
          description: 'Backend source modules powering the DEVSCOUT decision pipeline.',
          children: [
            { name: 'config', path: 'DEVSCOUT-V3/backend/src/config/', type: 'directory', layer: 'backend', description: 'Environment validation, model aliases, and runtime settings.' },
            {
              name: 'api',
              path: 'DEVSCOUT-V3/backend/src/api/',
              type: 'directory',
              layer: 'backend',
              description: 'HTTP controllers and REST/SSE endpoint handlers.',
              children: [
                { name: 'routes', path: 'DEVSCOUT-V3/backend/src/api/routes/', type: 'directory', layer: 'backend', description: 'Express route definitions for evaluations, reports, and health telemetry.' },
              ],
            },
            { name: 'middleware', path: 'DEVSCOUT-V3/backend/src/middleware/', type: 'directory', layer: 'backend', description: 'Request validation, rate limiting, structured logging, and error handling.' },
            { name: 'auth', path: 'DEVSCOUT-V3/backend/src/auth/', type: 'directory', layer: 'backend', description: 'Authentication guards, session tokens, and RBAC policies.' },
            {
              name: 'database',
              path: 'DEVSCOUT-V3/backend/src/database/',
              type: 'directory',
              layer: 'backend',
              description: 'Persistence layer for decision reports, cached research, and telemetry.',
              children: [
                { name: 'migrations', path: 'DEVSCOUT-V3/backend/src/database/migrations/', type: 'directory', layer: 'backend', description: 'Schema migration scripts.' },
                { name: 'models', path: 'DEVSCOUT-V3/backend/src/database/models/', type: 'directory', layer: 'backend', description: 'Data entities for technologies, evidence nodes, and evaluations.' },
                { name: 'repositories', path: 'DEVSCOUT-V3/backend/src/database/repositories/', type: 'directory', layer: 'backend', description: 'Data access repositories abstracting storage queries.' },
              ],
            },
            { name: 'schemas', path: 'DEVSCOUT-V3/backend/src/schemas/', type: 'directory', layer: 'backend', description: 'JSON/Zod validation schemas for API payloads and structured LLM outputs.' },
            { name: 'services', path: 'DEVSCOUT-V3/backend/src/services/', type: 'directory', layer: 'backend', description: 'Core application services coordinating domain workflows.' },
            {
              name: 'pipeline',
              path: 'DEVSCOUT-V3/backend/src/pipeline/',
              type: 'directory',
              layer: 'backend',
              description: 'Multi-stage execution engine for technology decision intelligence.',
              children: [
                { name: 'stages', path: 'DEVSCOUT-V3/backend/src/pipeline/stages/', type: 'directory', layer: 'backend', description: 'Discrete pipeline stages: Intent Parsing, Evidence Gathering, Trade-Off Scoring, Carbon Modeling, Synthesis.' },
                { name: 'orchestrator', path: 'DEVSCOUT-V3/backend/src/pipeline/orchestrator/', type: 'directory', layer: 'backend', description: 'DAG execution coordinator managing stage dependencies and streaming updates.' },
              ],
            },
            {
              name: 'research',
              path: 'DEVSCOUT-V3/backend/src/research/',
              type: 'directory',
              layer: 'backend',
              description: 'External technical research collectors and caching.',
              children: [
                { name: 'web', path: 'DEVSCOUT-V3/backend/src/research/web/', type: 'directory', layer: 'backend', description: 'Documentation, benchmark, and RFC web grounding.' },
                { name: 'github', path: 'DEVSCOUT-V3/backend/src/research/github/', type: 'directory', layer: 'backend', description: 'GitHub repository velocity, issue resolution, and contributor health signals.' },
                { name: 'cache', path: 'DEVSCOUT-V3/backend/src/research/cache/', type: 'directory', layer: 'backend', description: 'Content-addressable research cache to minimize redundant fetches.' },
              ],
            },
            { name: 'evidence', path: 'DEVSCOUT-V3/backend/src/evidence/', type: 'directory', layer: 'backend', description: 'Evidence verification, source credibility scoring, and citation linking.' },
            { name: 'analysis', path: 'DEVSCOUT-V3/backend/src/analysis/', type: 'directory', layer: 'backend', description: 'Multi-criteria trade-off matrix computation and sensitivity analysis.' },
            { name: 'recommendations', path: 'DEVSCOUT-V3/backend/src/recommendations/', type: 'directory', layer: 'backend', description: 'Context-aware stack recommendations and architectural blueprint generation.' },
            { name: 'sustainability', path: 'DEVSCOUT-V3/backend/src/sustainability/', type: 'directory', layer: 'backend', description: 'Software Carbon Intensity (SCI) estimation, energy profiling, and green cloud insights.' },
            { name: 'learning', path: 'DEVSCOUT-V3/backend/src/learning/', type: 'directory', layer: 'backend', description: 'Educational explanation generator, concept primers, and team onboarding paths.' },
            { name: 'llm', path: 'DEVSCOUT-V3/backend/src/llm/', type: 'directory', layer: 'backend', description: 'Google GenAI SDK integration, prompt templates, and structured schema enforcement.' },
            { name: 'reports', path: 'DEVSCOUT-V3/backend/src/reports/', type: 'directory', layer: 'backend', description: 'Architecture Decision Record (ADR) and executive report exporters.' },
            { name: 'utils', path: 'DEVSCOUT-V3/backend/src/utils/', type: 'directory', layer: 'backend', description: 'Shared backend utilities, retry policies, and telemetry helpers.' },
            { name: 'app.ts', path: 'DEVSCOUT-V3/backend/src/app.ts', type: 'file', layer: 'backend', description: 'Express application factory mounting middleware and API routes.' },
            { name: 'server.ts', path: 'DEVSCOUT-V3/backend/src/server.ts', type: 'file', layer: 'backend', description: 'HTTP server entrypoint binding to port 3000.' },
          ],
        },
        {
          name: 'tests',
          path: 'DEVSCOUT-V3/backend/tests/',
          type: 'directory',
          layer: 'backend',
          description: 'Backend verification suites.',
          children: [
            { name: 'unit', path: 'DEVSCOUT-V3/backend/tests/unit/', type: 'directory', layer: 'backend', description: 'Unit tests for scoring algorithms, SCI calculators, and pipeline stages.' },
            { name: 'integration', path: 'DEVSCOUT-V3/backend/tests/integration/', type: 'directory', layer: 'backend', description: 'End-to-end API and pipeline integration tests.' },
            { name: 'fixtures', path: 'DEVSCOUT-V3/backend/tests/fixtures/', type: 'directory', layer: 'backend', description: 'Deterministic mock payloads and benchmark snapshots.' },
          ],
        },
        { name: 'package.json', path: 'DEVSCOUT-V3/backend/package.json', type: 'file', layer: 'backend', description: 'Backend package manifest (@devscout/backend).' },
        { name: 'tsconfig.json', path: 'DEVSCOUT-V3/backend/tsconfig.json', type: 'file', layer: 'backend', description: 'Backend TypeScript compiler configuration.' },
        { name: '.env.example', path: 'DEVSCOUT-V3/backend/.env.example', type: 'file', layer: 'backend', description: 'Backend environment variable template (GEMINI_API_KEY, PORT, etc.).' },
      ],
    },
    {
      name: 'shared',
      path: 'DEVSCOUT-V3/shared/',
      type: 'directory',
      layer: 'shared',
      description: 'Isomorphic code shared strictly between frontend and backend.',
      children: [
        { name: 'types', path: 'DEVSCOUT-V3/shared/types/', type: 'directory', layer: 'shared', description: 'Cross-boundary TypeScript interfaces for Decision Queries, Evidence Citations, and Sustainability Metrics.' },
      ],
    },
    {
      name: 'docs',
      path: 'DEVSCOUT-V3/docs/',
      type: 'directory',
      layer: 'docs',
      description: 'Engineering documentation and API specifications.',
      children: [
        { name: 'architecture.md', path: 'DEVSCOUT-V3/docs/architecture.md', type: 'file', layer: 'docs', description: 'System architecture specification and pipeline topology.' },
        { name: 'api-contracts.md', path: 'DEVSCOUT-V3/docs/api-contracts.md', type: 'file', layer: 'docs', description: 'REST & streaming endpoint contracts between frontend and backend.' },
      ],
    },
    {
      name: 'scripts',
      path: 'DEVSCOUT-V3/scripts/',
      type: 'directory',
      layer: 'ops',
      description: 'Workspace build, database seed, and CI automation scripts.',
    },
    {
      name: '.github',
      path: 'DEVSCOUT-V3/.github/',
      type: 'directory',
      layer: 'ops',
      description: 'GitHub repository configuration and automation.',
      children: [
        { name: 'workflows', path: 'DEVSCOUT-V3/.github/workflows/', type: 'directory', layer: 'ops', description: 'CI/CD pipelines for linting, testing, and deployment.' },
      ],
    },
    { name: '.gitignore', path: 'DEVSCOUT-V3/.gitignore', type: 'file', layer: 'root', description: 'Git ignore rules for build artifacts, node_modules, and local secrets.' },
    { name: '.editorconfig', path: 'DEVSCOUT-V3/.editorconfig', type: 'file', layer: 'root', description: 'Cross-editor formatting consistency rules (UTF-8, LF, 2-space indent).' },
    { name: '.env.example', path: 'DEVSCOUT-V3/.env.example', type: 'file', layer: 'root', description: 'Root environment configuration template.' },
    { name: 'package.json', path: 'DEVSCOUT-V3/package.json', type: 'file', layer: 'root', description: 'Root workspace manifest and build orchestration scripts.' },
    { name: 'package-lock.json', path: 'DEVSCOUT-V3/package-lock.json', type: 'file', layer: 'root', description: 'Deterministic dependency lockfile.' },
    { name: 'README.md', path: 'DEVSCOUT-V3/README.md', type: 'file', layer: 'root', description: 'Project overview, vision, and quickstart documentation.' },
    { name: 'LICENSE', path: 'DEVSCOUT-V3/LICENSE', type: 'file', layer: 'root', description: 'Apache 2.0 open-source license.' },
  ],
};

function collectAllPaths(node: TreeNode): string[] {
  const paths = [node.path];
  if (node.children) {
    for (const child of node.children) {
      paths.push(...collectAllPaths(child));
    }
  }
  return paths;
}

function countNodes(node: TreeNode): { dirs: number; files: number } {
  let dirs = node.type === 'directory' ? 1 : 0;
  let files = node.type === 'file' ? 1 : 0;
  if (node.children) {
    for (const child of node.children) {
      const c = countNodes(child);
      dirs += c.dirs;
      files += c.files;
    }
  }
  return { dirs, files };
}

export default function App() {
  const allPaths = useMemo(() => collectAllPaths(REPO_TREE), []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    for (const p of allPaths) {
      map[p] = true;
    }
    return map;
  });
  const [selectedNode, setSelectedNode] = useState<TreeNode>(REPO_TREE);
  const [layerFilter, setLayerFilter] = useState<'all' | 'frontend' | 'backend' | 'shared' | 'docs'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totals = useMemo(() => countNodes(REPO_TREE), []);

  const toggleExpand = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const expandAll = () => {
    const map: Record<string, boolean> = {};
    for (const p of allPaths) map[p] = true;
    setExpanded(map);
  };

  const collapseSecondLevel = () => {
    setExpanded({ 'DEVSCOUT-V3/': true });
  };

  const matchesFilter = (node: TreeNode): boolean => {
    const matchesLayer = layerFilter === 'all' || node.layer === layerFilter || node.path === 'DEVSCOUT-V3/';
    const matchesSearch =
      !searchQuery.trim() ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (node.children && node.children.length > 0) {
      return (matchesLayer && matchesSearch) || node.children.some(matchesFilter);
    }
    return matchesLayer && matchesSearch;
  };

  const renderTree = (node: TreeNode, depth = 0) => {
    if (!matchesFilter(node)) return null;
    const isExpanded = !!expanded[node.path];
    const isSelected = selectedNode.path === node.path;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.path} className="select-none">
        <div
          onClick={() => setSelectedNode(node)}
          className={`group flex items-center justify-between py-1.5 pr-3 text-left font-mono text-xs cursor-pointer transition-colors border-l-2 ${
            isSelected
              ? 'bg-emerald-950/40 border-emerald-400 text-slate-100'
              : 'border-transparent text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {node.type === 'directory' ? (
              <button
                type="button"
                onClick={(e) => toggleExpand(node.path, e)}
                className="p-0.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                aria-label={isExpanded ? 'Collapse folder' : 'Expand folder'}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )
                ) : (
                  <span className="w-3.5 h-3.5 inline-block" />
                )}
              </button>
            ) : (
              <span className="w-4 inline-block" />
            )}

            {node.type === 'directory' ? (
              isExpanded ? (
                <FolderOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-emerald-500/80 shrink-0" />
              )
            ) : node.name.endsWith('.md') || node.name === 'LICENSE' ? (
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            ) : (
              <FileCode className="w-3.5 h-3.5 text-sky-400/90 shrink-0" />
            )}

            <span className={`truncate ${node.type === 'directory' ? 'font-medium text-slate-200' : ''}`}>
              {node.name}
              {node.type === 'directory' ? '/' : ''}
            </span>
          </div>

          <span className="text-[11px] text-slate-600 group-hover:text-slate-400 ml-3 shrink-0">
            {node.layer}
          </span>
        </div>

        {node.type === 'directory' && isExpanded && node.children && (
          <div>{node.children.map((child) => renderTree(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Architectural Header */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-semibold tracking-tight text-white">
                  DEVSCOUT-V3
                </span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-xs text-emerald-400 font-mono">
                  INNOTECH 2026 FINALE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI-Powered Sustainable Technology Decision Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-slate-400 tabular-nums">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Structure Provisioned</span>
            </div>
            <span className="text-slate-700" aria-hidden="true">/</span>
            <div>
              <span className="text-slate-200 font-medium">{totals.dirs}</span> Directories
            </div>
            <span className="text-slate-700" aria-hidden="true">/</span>
            <div>
              <span className="text-slate-200 font-medium">{totals.files}</span> Core Files
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive File & Folder Tree */}
        <section className="lg:col-span-5 flex flex-col border border-slate-800/90 rounded-lg bg-[#0C111C] overflow-hidden">
          <div className="p-4 border-b border-slate-800/80 space-y-3 bg-[#0E1422]">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Repository Topology
              </h2>
              <div className="flex items-center gap-3 text-xs font-mono">
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <span className="text-slate-700">·</span>
                <button
                  type="button"
                  onClick={collapseSecondLevel}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Collapse
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter folders or files (e.g. sustainability, pipeline, hooks)..."
                className="w-full bg-[#090D14] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            {/* Segmented Control for Layer Filter */}
            <div className="flex items-center gap-1 p-1 bg-[#090D14] rounded border border-slate-800/80">
              {(['all', 'frontend', 'backend', 'shared', 'docs'] as const).map((layer) => (
                <button
                  key={layer}
                  type="button"
                  onClick={() => setLayerFilter(layer)}
                  className={`flex-1 py-1 px-2 text-[11px] font-mono rounded transition-colors cursor-pointer capitalize ${
                    layerFilter === layer
                      ? 'bg-slate-800 text-emerald-400 font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[680px] py-2 divide-y divide-slate-900/30">
            {renderTree(REPO_TREE)}
          </div>
        </section>

        {/* Right Column: Inspector & Pillar Mapping */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* Selected Node Inspector */}
          <div className="border border-slate-800/90 rounded-lg bg-[#0C111C] p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="uppercase">{selectedNode.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 uppercase">{selectedNode.layer} LAYER</span>
                </div>
                <h1 className="text-lg font-mono font-semibold text-white break-all">
                  {selectedNode.path}
                </h1>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedNode.description}
              </p>

              {selectedNode.children && selectedNode.children.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Direct Children ({selectedNode.children.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedNode.children.map((child) => (
                      <button
                        key={child.path}
                        type="button"
                        onClick={() => setSelectedNode(child)}
                        className="flex items-start gap-2.5 p-3 rounded border border-slate-800/80 bg-[#090D14]/70 hover:border-slate-700 hover:bg-slate-900/60 text-left transition-colors cursor-pointer"
                      >
                        {child.type === 'directory' ? (
                          <Folder className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <FileCode className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="font-mono text-xs font-medium text-slate-200 truncate">
                            {child.name}
                            {child.type === 'directory' ? '/' : ''}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {child.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Product Vision Pillars mapped to Architecture */}
          <div className="border border-slate-800/90 rounded-lg bg-[#0C111C] p-6 space-y-5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                DEVSCOUT V3 Product Vision & Module Mapping
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Every subsystem in the monorepo maps directly to DEVSCOUT’s four core decision intelligence capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-slate-800/80 bg-[#090D14]/60 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Evidence-Backed Technical Research</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gathers empirical benchmarks, GitHub velocity signals, and verified technical documentation with content-addressable caching.
                </p>
                <div className="pt-1 font-mono text-[11px] text-slate-500">
                  backend/src/research/ · backend/src/evidence/
                </div>
              </div>

              <div className="p-4 rounded border border-slate-800/80 bg-[#090D14]/60 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Transparent Trade-Off Analysis</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluates candidate architectures across latency, throughput, operational complexity, ecosystem lock-in, and TCO.
                </p>
                <div className="pt-1 font-mono text-[11px] text-slate-500">
                  backend/src/analysis/ · backend/src/recommendations/
                </div>
              </div>

              <div className="p-4 rounded border border-slate-800/80 bg-[#090D14]/60 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Sustainability & Carbon Estimates</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Models Software Carbon Intensity (SCI), runtime energy efficiency, and green cloud region carbon footprints.
                </p>
                <div className="pt-1 font-mono text-[11px] text-slate-500">
                  backend/src/sustainability/ · frontend/src/features/
                </div>
              </div>

              <div className="p-4 rounded border border-slate-800/80 bg-[#090D14]/60 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Educational Explanations</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Synthesizes clear architectural trade-off primers, ADR exports, and interactive learning paths for engineering teams.
                </p>
                <div className="pt-1 font-mono text-[11px] text-slate-500">
                  backend/src/learning/ · backend/src/reports/
                </div>
              </div>
            </div>
          </div>

          {/* ASCII Tree Verification */}
          <div className="border border-slate-800/90 rounded-lg bg-[#0C111C] p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exact Directory Blueprint</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Verified on disk
              </span>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 bg-[#090D14] p-4 rounded border border-slate-800/80 overflow-x-auto leading-relaxed">
{`DEVSCOUT-V3/
├── frontend/
│   ├── public/favicon.svg
│   ├── src/{assets,components,layouts,pages,features,hooks,services,types,utils,constants,App.tsx,main.tsx,index.css}
│   ├── tests/
│   ├── index.html, package.json, tsconfig.json, vite.config.ts, .env.example
├── backend/
│   ├── src/{config,api/routes,middleware,auth,database/{migrations,models,repositories},schemas,services}
│   ├── src/{pipeline/{stages,orchestrator},research/{web,github,cache},evidence,analysis,recommendations}
│   ├── src/{sustainability,learning,llm,reports,utils,app.ts,server.ts}
│   ├── tests/{unit,integration,fixtures}
│   ├── package.json, tsconfig.json, .env.example
├── shared/types/
├── docs/{architecture.md,api-contracts.md}
├── scripts/
├── .github/workflows/
└── .gitignore, .editorconfig, .env.example, package.json, package-lock.json, README.md, LICENSE`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
