import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDir, '../../.env'), quiet: true });

export type NodeEnv = 'development' | 'test' | 'production';

export interface BackendEnv {
  NODE_ENV: NodeEnv;
  PORT: number;
  CORS_ORIGIN: string[];
  REQUEST_BODY_LIMIT: string;
  CACHE_TTL_SECONDS: number;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID?: string;
  GEMINI_API_KEY?: string;
  GITHUB_TOKEN?: string;
}

const VALID_NODE_ENVS: ReadonlyArray<NodeEnv> = ['development', 'test', 'production'];

function parseNodeEnv(raw: string | undefined): NodeEnv {
  const value = (raw ?? 'development').trim().toLowerCase();
  if ((VALID_NODE_ENVS as ReadonlyArray<string>).includes(value)) {
    return value as NodeEnv;
  }
  throw new Error(
    `[DEVSCOUT Config Error] Invalid NODE_ENV "${raw}". Expected one of: ${VALID_NODE_ENVS.join(', ')}.`
  );
}

function parsePort(raw: string | undefined, defaultPort: number): number {
  if (raw === undefined || raw.trim() === '') {
    return defaultPort;
  }
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(
      `[DEVSCOUT Config Error] Invalid PORT "${raw}". Expected an integer between 1 and 65535.`
    );
  }
  return parsed;
}

function parseNonNegativeInt(
  raw: string | undefined,
  varName: string,
  defaultValue: number
): number {
  if (raw === undefined || raw.trim() === '') {
    return defaultValue;
  }
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(
      `[DEVSCOUT Config Error] Invalid ${varName} "${raw}". Expected a non-negative integer.`
    );
  }
  return parsed;
}

function parseCorsOrigins(raw: string | undefined, defaultOrigin: string): string[] {
  const source = raw === undefined || raw.trim() === '' ? defaultOrigin : raw;
  const origins = source
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  if (origins.length === 0) {
    throw new Error(
      '[DEVSCOUT Config Error] CORS_ORIGIN resolved to an empty list. Provide at least one valid origin.'
    );
  }

  for (const origin of origins) {
    if (origin === '*') {
      continue;
    }
    try {
      const url = new URL(origin);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Protocol must be http: or https:');
      }
    } catch {
      throw new Error(
        `[DEVSCOUT Config Error] Invalid CORS_ORIGIN entry "${origin}". Expected a valid http(s) origin such as "http://localhost:3000".`
      );
    }
  }

  return origins;
}

function parseDatabaseUrl(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) {
    throw new Error(
      '[DEVSCOUT Config Error] Missing required environment variable DATABASE_URL.'
    );
  }

  try {
    const parsedUrl = new URL(trimmed);
    if (parsedUrl.protocol !== 'postgres:' && parsedUrl.protocol !== 'postgresql:') {
      throw new Error('Invalid protocol');
    }
    if (!parsedUrl.hostname) {
      throw new Error('Missing hostname');
    }
  } catch {
    throw new Error(
      '[DEVSCOUT Config Error] Invalid DATABASE_URL. Expected a valid PostgreSQL connection URL (postgres:// or postgresql://).'
    );
  }

  return trimmed;
}

export function loadEnv(source: NodeJS.ProcessEnv = process.env): BackendEnv {
  const NODE_ENV = parseNodeEnv(source.NODE_ENV);
  const PORT = parsePort(source.PORT, 4000);
  const CORS_ORIGIN = parseCorsOrigins(source.CORS_ORIGIN, 'http://localhost:3000');
  const REQUEST_BODY_LIMIT = (source.REQUEST_BODY_LIMIT ?? '1mb').trim() || '1mb';
  const CACHE_TTL_SECONDS = parseNonNegativeInt(
    source.CACHE_TTL_SECONDS,
    'CACHE_TTL_SECONDS',
    3600
  );
  const DATABASE_URL = parseDatabaseUrl(source.DATABASE_URL);

  const GOOGLE_CLIENT_ID = source.GOOGLE_CLIENT_ID?.trim() || undefined;
  const GEMINI_API_KEY = source.GEMINI_API_KEY?.trim() || undefined;
  const GITHUB_TOKEN = source.GITHUB_TOKEN?.trim() || undefined;

  return Object.freeze({
    NODE_ENV,
    PORT,
    CORS_ORIGIN,
    REQUEST_BODY_LIMIT,
    CACHE_TTL_SECONDS,
    DATABASE_URL,
    GOOGLE_CLIENT_ID,
    GEMINI_API_KEY,
    GITHUB_TOKEN,
  });
}

export const env: BackendEnv = loadEnv();
