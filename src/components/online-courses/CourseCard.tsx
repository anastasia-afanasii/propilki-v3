import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseFeatures from "./CourseFeatures";
import AdditionalLectures from "./AdditionalLectures";

type Course = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  features: string[];
  additionalLectures?: string[];
  price?: string;
  cta: string;
  link?: string;
};

type Props = {
  course: Course;
  reverse?: boolean;
};

const CourseCard = ({ course, reverse }: Props) => {
  const imageSrc = `${import.meta.env.BASE_URL}${course.image}`;

  const handleClick = () => {
    if (course.link) window.open(course.link, "_blank");
  };

  return (
    <Card className="group border border-border elegant-shadow hover:shadow-lg">
      <div className="p-5 sm:p-7 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className={reverse ? "lg:order-2" : "lg:order-1"}>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={imageSrc}
                alt={course.title}
                className="w-full h-full object-cover"
                width={2048}
                height={1152}
                loading="lazy"
              />
            </div>
          </div>

          <div className={reverse ? "lg:order-1" : "lg:order-2"}>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground mb-3 sm:mb-4 leading-tight">
              {course.title}
            </h3>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-7 leading-relaxed">
              {course.description}
            </p>

            <CourseFeatures features={course.features} />

            {course.additionalLectures?.length ? (
              <AdditionalLectures
                title="Additional lectures in the online course:"
                lectures={course.additionalLectures}
              />
            ) : null}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t border-border">
              {course.price ? (
                <p className="text-base sm:text-lg font-light text-foreground">
                  <span className="font-medium">Price:</span>{" "}
                  {course.price.replace(/^Price:\s*/i, "")}
                </p>
              ) : (
                <span />
              )}

              <Button
                onClick={handleClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 h-11 rounded-lg"
                type="button"
              >
                {course.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
