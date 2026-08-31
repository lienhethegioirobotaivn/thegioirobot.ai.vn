import Link from "next/link";

import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { getDb } from "@/db";
import { siteFooter } from "@/db/schema";
import { getSocialIcon } from "@/lib/social-icon-map";

export async function Footer() {
  const db = getDb();
  const [data] = await db.select().from(siteFooter).limit(1);
  if (!data) {
    return null;
  }

  return (
    <footer id="lien-he" className="border-line bg-surface border-t">
      <div className="mx-auto px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2.5fr_1.4fr]">
          <Reveal>
            <Link href="/" className="flex items-center">
              {data.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="TheGioiRobot Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-text-primary text-lg font-bold">
                  THEGIOIROBOT
                </span>
              )}
            </Link>
            <p className="text-text-secondary mt-5 max-w-xs text-[13.5px] leading-relaxed">
              {data.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {data.socials.map((social) => {
                const Icon = getSocialIcon(social.icon);
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    className="border-line text-text-secondary hover:border-accent/50 hover:bg-accent-soft hover:text-accent-2 flex h-9 w-9 items-center justify-center rounded-full border transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </Reveal>

          <Reveal
            delay={100}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
          >
            {data.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-text-primary text-[12px] font-semibold tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-accent-2 text-[13.5px] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal delay={200}>
            <h4 className="text-text-primary text-[12px] font-semibold tracking-wider uppercase">
              {data.newsletterHeading}
            </h4>
            <p className="text-text-secondary mt-4 text-[13.5px] leading-relaxed">
              {data.newsletterDescription}
            </p>
            <NewsletterForm />
          </Reveal>
        </div>

        <div className="border-line-soft text-text-secondary mt-14 flex flex-col gap-4 border-t pt-8 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>{data.copyrightText}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {data.legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="hover:text-accent-2 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Hotline:{" "}
              <span className="text-text-primary font-medium">
                {data.hotline}
              </span>
            </span>
            <span>
              Email:{" "}
              <span className="text-text-primary font-medium">
                {data.email}
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
