import { processSteps } from "@/lib/site";

type ProcessTimelineProps = {
  steps?: readonly string[];
};

export function ProcessTimeline({ steps = processSteps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-ember-300/70 via-gold-200/45 to-oxide-400/55 md:block" />
      <ol className="grid gap-4 md:grid-cols-9">
        {steps.map((step, index) => (
          <li
            key={step}
            className="relative rounded-lg border border-white/10 bg-black/18 p-4 md:min-h-[148px]"
          >
            <span className="relative z-10 grid size-8 place-items-center rounded-full border border-ember-200/40 bg-forge-900 text-xs font-semibold text-ember-100 shadow-[0_0_22px_rgba(240,93,35,0.18)]">
              {index + 1}
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-bone">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
