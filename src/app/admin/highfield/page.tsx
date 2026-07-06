import { HighfieldDashboard } from '@/components/admin/highfield-dashboard';

export const metadata = {
  title: 'Highfield UGC Campaign — Who Knows',
  description: 'Autonomous agent-managed UGC campaign across TikTok, Instagram, YouTube, Facebook',
};

export default function HighfieldPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <HighfieldDashboard />
      </div>
    </main>
  );
}
