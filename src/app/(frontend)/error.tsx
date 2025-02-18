'use client';

import ResponsiveContainer from '@/components/common/ResponsiveContainer';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main className="h-screen">
      <ResponsiveContainer className="pt-64">
        <ResponsiveContainer>
          <h2 className="text-xl bg-error text-background w-fit">
            Something went wrong!
          </h2>
          <p className="mt-2">
            {error.name}: {error.message}
          </p>
        </ResponsiveContainer>
      </ResponsiveContainer>
    </main>
  );
}
