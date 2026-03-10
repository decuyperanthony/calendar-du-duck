"use client";

import { useScoped18n } from "@/lib/next-intl";
import {
  SOBRIETY_MILESTONES,
  getSobrietyDays,
  getMilestoneDate,
} from "@/utils";
import { cn } from "@/lib/utils";

const Page = () => {
  const t = useScoped18n("sobriety");
  const days = getSobrietyDays();

  const upcomingMilestones = SOBRIETY_MILESTONES.filter(
    (m) => m.days > days
  );
  const reachedMilestones = SOBRIETY_MILESTONES.filter(
    (m) => m.days <= days
  ).reverse();

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Upcoming milestones */}
      {upcomingMilestones.length > 0 && (
        <div className="glass-dark rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              {t("milestones-title")}
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {upcomingMilestones.map((milestone) => {
              const milestoneProgress = days / milestone.days;

              return (
                <div
                  key={milestone.days}
                  className="flex items-center gap-4 p-4"
                >
                  {/* Badge */}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white/70">
                      {milestone.badgeNumber}
                    </span>
                  </div>

                  {/* Label + days */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-medium">
                        {t(`milestone-labels.${milestone.labelKey}`)}
                      </span>
                      <span className="text-xs text-white/40">
                        {t("milestone-days-suffix", {
                          days: String(milestone.days),
                        })}
                      </span>
                    </div>
                    <span className="text-xs text-white/40">
                      {getMilestoneDate(milestone)}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden shrink-0">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min(milestoneProgress * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reached milestones */}
      {reachedMilestones.length > 0 && (
        <div className="glass-dark rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              {t("reached")}
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {reachedMilestones.map((milestone) => (
              <div
                key={milestone.days}
                className="flex items-center gap-4 p-4"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    "bg-primary/20"
                  )}
                >
                  <span className="text-sm font-bold text-primary">
                    {milestone.badgeNumber}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-medium">
                      {t(`milestone-labels.${milestone.labelKey}`)}
                    </span>
                    <span className="text-xs text-white/40">
                      {t("milestone-days-suffix", {
                        days: String(milestone.days),
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">
                    {getMilestoneDate(milestone)}
                  </span>
                </div>
                <span className="text-primary text-lg">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
