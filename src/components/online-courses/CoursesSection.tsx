import { BookOpen } from "lucide-react";
import CourseCard from "@/components/online-courses/CourseCard";

type Props = {
  section: {
    pill: string;
    title: string;
  };
  courses: Array<{
    id: number | string;
    title: string;
    description: string;
    image: string;
    features: string[];
    additionalLectures?: string[];
    price?: string;
    cta: string;
    link?: string;
  }>;
};

const CoursesSection = ({ section, courses }: Props) => {
  return (
    <section id="courses" className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-3.5 py-1.5 mb-5 sm:mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {section.pill}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
            {section.title}
          </h2>
        </div>

        <div className="space-y-5 sm:space-y-6 md:space-y-7">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
