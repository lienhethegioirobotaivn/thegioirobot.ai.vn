import { Reveal } from "@/components/Reveal";

import { PartnerLogo } from "./PartnerLogo";

const partners: { name: string; logoSrc?: string }[] = [
  { name: "VinUniversity" },
  { name: "NIC" },
  { name: "FPT Software" },
  { name: "Viettel" },
  { name: "Qualcomm" },
  { name: "NVIDIA" },
  { name: "AWS" },
  { name: "Google Cloud" },
];

export function Partners() {
  return (
    <section className="border-line-soft bg-surface border-t">
      <div className="mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xl font-bold tracking-wider uppercase">
            Đối tác & nhà đầu tư
          </span>
        </Reveal>
        <Reveal
          delay={100}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} {...partner} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
