import { OnboardingDashboard } from '@/components/admin/onboarding-dashboard';

export const metadata = {
  title: 'CEO Onboarding — Who Knows',
  description: 'Get started with Who Knows Enterprise. Setup API keys, integrations, and access your AI agents.',
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <OnboardingDashboard />
    </main>
  );
}
