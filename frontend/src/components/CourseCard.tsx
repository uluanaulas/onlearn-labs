import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  price?: string;
  level?: string;
}

export const CourseCard = ({
  id,
  title,
  image,
  rating,
  reviewCount,
  price = "Бесплатно",
  level = "Начальный",
}: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <Link to={`/course/${id}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/course/${id}`}>
          <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="mb-2 flex items-center gap-1 text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{level}</span>
          <span className="font-semibold text-primary">{price}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/course/${id}`}>Записаться</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
