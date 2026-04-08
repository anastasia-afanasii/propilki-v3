import { Users, Star, Award, Clock, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { Users, Star, Award, Clock };

type StatItem = {
  icon: string;
  number: string;
  label: string;
};

type Props = {
  stats: StatItem[];
};

const StatsGrid = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-14">
      {stats.map((stat, index) => {
        const Icon = ICONS[stat.icon];

        return (
          <div key={index} className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-secondary rounded-full flex items-center justify-center">
              {Icon ? (
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              ) : null}
            </div>

            <div className="text-2xl sm:text-3xl font-light text-foreground">
              {stat.number}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
