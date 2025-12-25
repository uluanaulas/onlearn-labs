import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  courseCount: number;
  slug: string;
}

export const CategoryCard = ({
  title,
  icon: Icon,
  courseCount,
  slug,
}: CategoryCardProps) => {
  return (
    <Link to={`/courses?category=${slug}`}>
      <Card className="group h-full transition-all duration-300 hover:shadow-card-hover hover:border-primary/50">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {courseCount} курсов
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
