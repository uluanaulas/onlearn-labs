import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import courseWeb from "@/assets/course-web.jpg";
import courseDesign from "@/assets/course-design.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseData from "@/assets/course-data.jpg";

const allCourses = [
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
  {
    id: "9",
    title: "Node.js и backend разработка",
    image: courseWeb,
    rating: 4.7,
    reviewCount: 654,
    price: "7 990 ₽",
    level: "Средний",
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-6">
        <h2 className="mb-6 text-lg font-semibold">Фильтры</h2>
        
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block text-sm font-medium">Категория</Label>
            <div className="space-y-2">
              {["Программирование", "Дизайн", "Маркетинг", "Данные", "Бизнес"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <label
                    htmlFor={category}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block text-sm font-medium">Уровень</Label>
            <div className="space-y-2">
              {["Начальный", "Средний", "Продвинутый"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={level} />
                  <label
                    htmlFor={level}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block text-sm font-medium">Цена</Label>
            <div className="space-y-2">
              {["Бесплатно", "До 5000 ₽", "5000-10000 ₽", "Более 10000 ₽"].map((price) => (
                <div key={price} className="flex items-center space-x-2">
                  <Checkbox id={price} />
                  <label
                    htmlFor={price}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {price}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block text-sm font-medium">Рейтинг</Label>
            <div className="space-y-2">
              {["4.5+", "4.0+", "3.5+", "Все"].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={rating} />
                  <label
                    htmlFor={rating}
                    className="text-sm cursor-pointer hover:text-foreground transition-colors"
                  >
                    {rating}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full" variant="outline">
            Сбросить фильтры
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold">Каталог курсов</h1>
          
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск курсов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select defaultValue="popular">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Популярные</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="price-low">Цена: сначала низкая</SelectItem>
                <SelectItem value="price-high">Цена: сначала высокая</SelectItem>
                <SelectItem value="newest">Новые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <Button variant="outline">Предыдущая</Button>
          <Button variant="outline">1</Button>
          <Button>2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">4</Button>
          <Button variant="outline">Следующая</Button>
        </div>
      </main>
    </div>
  );
};

export default Courses;
