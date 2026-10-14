import { Suspense } from 'react';
import { api } from '@/lib/api';

type Health = { status: string; db: string; pgvector: string | null };

async function BackendStatus() {
  const health = await api<Health>('/health').catch(() => null);
  return (
    <p className="mt-4">
      Backend:{' '}
      {health ? `${health.status} (pgvector ${health.pgvector ?? 'missing'})` : 'unreachable'}
    </p>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">DocuMind Agent</h1>
      <Suspense fallback={<p className="mt-4">Checking backend…</p>}>
        <BackendStatus />
      </Suspense>
    </main>
  );
}
