import { Check } from "lucide-react";

type Props = {
  features: string[];
};

const CourseFeatures = ({ features }: Props) => {
  return (
    <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>

          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CourseFeatures;
