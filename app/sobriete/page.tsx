"use client";

import { SobrietyRing } from "@/components/common/sobriety-ring";
import { useScoped18n } from "@/lib/next-intl";
import {
  getSobrietyDays,
  getLastReachedMilestone,
  getNextMilestone,
  getRingProgress,
} from "@/utils";
import Link from "next/link";

const Page = () => {
  const t = useScoped18n("sobriety");
  const days = getSobrietyDays();
  const progress = getRingProgress(days);
  const lastMilestone = getLastReachedMilestone(days);
  const nextMilestone = getNextMilestone(days);

  const congratsMessage = lastMilestone
    ? t(`congratulations.${lastMilestone.labelKey}`)
    : "";

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Ring */}
      <div className="glass-dark rounded-2xl p-8 flex flex-col items-center gap-4">
        <SobrietyRing
          days={days}
          progress={progress}
          label={t("days-label")}
        />

        {congratsMessage && (
          <p className="text-lg font-semibold text-white text-center">
            {congratsMessage}
          </p>
        )}

        {nextMilestone && (
          <p className="text-sm text-white/50 text-center">
            {t("next-milestone", { days: String(nextMilestone.days) })}
          </p>
        )}
      </div>

      {/* All milestones link */}
      <Link
        href="/sobriete/etapes"
        className="glass-dark rounded-2xl p-4 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-lg">🏆</span>
          </div>
          <div>
            <p className="text-white font-medium">{t("all-milestones")}</p>
            <p className="text-sm text-white/50">
              {t("milestones-subtitle", { days: String(days) })}
            </p>
          </div>
        </div>
        <span className="text-white/30 group-hover:text-white/60 transition-colors text-xl">
          ›
        </span>
      </Link>
    </div>
  );
};

export default Page;
