import { CEOControlPanel } from '@/components/admin/ceo-control-panel';

export const metadata = {
  title: 'CEO Control Panel — Who Knows',
};

export default function CEOControlPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="label">Who Knows Enterprise</p>
          <h1 className="mt-3 text-5xl font-black uppercase">CEO Control Panel</h1>
          <p className="mt-3 max-w-2xl text-bone/70">
            Central command for all 26 agents. Real-time monitoring, activation/deactivation, campaign management, and strategic analytics.
          </p>
        </div>
        <CEOControlPanel />
      </div>
    </main>
  );
}
