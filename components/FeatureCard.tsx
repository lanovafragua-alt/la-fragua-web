import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FeatureCardProps = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  accent?: "ember" | "oxide" | "gold";
};

const accentClasses = {
  ember: "border-ember-300/26 bg-ember-500/8 text-ember-100",
  oxide: "border-oxide-300/28 bg-oxide-500/10 text-oxide-100",
  gold: "border-gold-300/28 bg-gold-300/10 text-gold-100",
};

export function FeatureCard({
  title,
  eyebrow,
  description,
  href,
  accent = "ember",
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[300px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-ember-200/35 hover:bg-white/[0.055] hover:shadow-[0_26px_70px_rgba(0,0,0,0.32)]"
    >
      <div>
        <div
          className={`mb-7 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${accentClasses[accent]}`}
        >
          {eyebrow}
        </div>
        <h3 className="text-2xl font-semibold text-bone">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-bone/62">{description}</p>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-100">
        Explorar
        <ArrowUpRight
          className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
