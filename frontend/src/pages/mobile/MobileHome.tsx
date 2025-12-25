import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Code, Palette, TrendingUp, Database, Camera, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroBanner from "@/assets/hero-banner.jpg";
import courseWeb from "@/assets/course-web.jpg";
import courseDesign from "@/assets/course-design.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseData from "@/assets/course-data.jpg";

const categories = [
  { title: "Программирование", icon: Code, courseCount: 156, slug: "programming" },
  { title: "Дизайн", icon: Palette, courseCount: 89, slug: "design" },
  { title: "Маркетинг", icon: TrendingUp, courseCount: 67, slug: "marketing" },
  { title: "Данные", icon: Database, courseCount: 45, slug: "data" },
  { title: "Фотография", icon: Camera, courseCount: 34, slug: "photography" },
  { title: "Бизнес", icon: BookOpen, courseCount: 78, slug: "business" },
];

const popularCourses = [
  {
    id: "1",
    title: "Веб-разработка для начинающих: HTML, CSS, JavaScript",
    image: courseWeb,
    rating: 4.8,
    reviewCount: 1234,
    price: "4 990 ₽",
    level: "Начальный",
  },
  {
    id: "2",
    title: "Основы UI/UX дизайна: от идеи до прототипа",
    image: courseDesign,
    rating: 4.9,
    reviewCount: 987,
    price: "5 490 ₽",
    level: "Начальный",
  },
  {
    id: "3",
    title: "Цифровой маркетинг: комплексная стратегия продвижения",
    image: courseMarketing,
    rating: 4.7,
    reviewCount: 756,
    price: "6 990 ₽",
    level: "Средний",
  },
  {
    id: "4",
    title: "Python для анализа данных: pandas, numpy, matplotlib",
    image: courseData,
    rating: 4.9,
    reviewCount: 1456,
    price: "7 490 ₽",
    level: "Средний",
  },
];

const MobileHome = () => {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Обучение онлайн"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        
        <div className="container relative flex h-full items-center px-4">
          <div className="animate-fade-in">
            <h1 className="mb-4 text-3xl font-bold leading-tight">
              Учитесь в своём темпе,<br />достигайте большего
            </h1>
            <p className="mb-6 text-base text-muted-foreground">
              Более 1000 курсов от ведущих экспертов.<br/>Начните своё обучение уже сегодня.
            </p>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/courses">Начать обучение</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b bg-muted/30 py-6">
        <div className="container px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-xs text-muted-foreground">Курсов</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-xs text-muted-foreground">Студентов</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Категории</h2>
            <Link to="/courses" className="flex items-center text-sm font-medium text-primary">
              Все <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                icon={category.icon}
                courseCount={category.courseCount}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="bg-muted/30 py-8">
        <div className="container px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Популярные курсы</h2>
            <Link to="/courses" className="flex items-center text-sm font-medium text-primary">
              Все <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Continue Learning - If has active courses */}
      <section className="py-8">
        <div className="container px-4">
          <h2 className="mb-6 text-xl font-bold">Продолжить обучение</h2>
          
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={courseWeb}
                  alt="Последний курс"
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-sm">Веб-разработка для начинающих</h3>
                  <p className="text-xs text-muted-foreground mb-2">Урок 3 из 8</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[37.5%] bg-primary" />
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" asChild>
                <Link to="/learning/1">Продолжить</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
