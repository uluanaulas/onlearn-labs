import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Code, Palette, TrendingUp, Database, Camera, BookOpen } from "lucide-react";
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
  {
    id: "5",
    title: "React и современный фронтенд-разработка",
    image: courseWeb,
    rating: 4.8,
    reviewCount: 892,
    price: "8 990 ₽",
    level: "Продвинутый",
  },
  {
    id: "6",
    title: "Графический дизайн: Adobe Photoshop и Illustrator",
    image: courseDesign,
    rating: 4.6,
    reviewCount: 645,
    price: "5 990 ₽",
    level: "Начальный",
  },
  {
    id: "7",
    title: "SEO оптимизация и продвижение сайтов",
    image: courseMarketing,
    rating: 4.7,
    reviewCount: 523,
    price: "4 490 ₽",
    level: "Средний",
  },
  {
    id: "8",
    title: "Machine Learning: введение в искусственный интеллект",
    image: courseData,
    rating: 4.9,
    reviewCount: 1789,
    price: "9 990 ₽",
    level: "Продвинутый",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Обучение онлайн"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        
        <div className="container relative flex h-full items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Учитесь в своём темпе,<br />достигайте большего
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Получите доступ к лучшим онлайн-курсам от ведущих экспертов.<br />
              Развивайте навыки, которые помогут вам в карьере.
            </p>
            <Button size="lg" asChild>
              <Link to="/courses">Начать обучение</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">Категории курсов</h2>
            <p className="mt-2 text-muted-foreground">
              Выберите направление, которое вам интересно
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Популярные курсы</h2>
              <p className="mt-2 text-muted-foreground">
                Самые востребованные курсы этого месяца
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/courses">Смотреть все</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
