import { Waitlist } from '@/components/ugc-affiliate/waitlist';
import { Faq } from '@/components/ugc-affiliate/faq';
import { Countdown } from '@/components/ugc-affiliate/countdown';
import { campaigns } from '@/data/mock';

export const metadata = {
  title: 'Join — UGC Affiliate Agency',
  description: 'Join the UGC Affiliate Agency network. Get early access to brand campaigns, UGC opportunities, and creator resources.',
};

export default function WaitlistPage() {
  const nextCampaign = campaigns.find((c) => c.status === 'upcoming') ?? campaigns[0];
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center md:pt-24">
        <p className="label">Next Campaign</p>
        <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">{nextCampaign.name}</h1>
        <p className="mt-4 text-lg text-bone/70">{nextCampaign.hero}</p>
        <div className="mt-8 flex justify-center">
          <Countdown date={nextCampaign.launchDate} />
        </div>
      </section>
      <Waitlist source="waitlist-page" />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Faq />
      </section>
    </>
  );
}
