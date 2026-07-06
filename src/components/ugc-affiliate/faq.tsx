import { faqs } from '@/data/mock';

export function Faq() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="label text-center">Questions</p>
      <h2 className="mt-3 text-center text-4xl font-black uppercase">Got Questions?</h2>
      <div className="mt-10 divide-y divide-white/10">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold marker:content-none">
              {item.q}
              <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-bone/60">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
