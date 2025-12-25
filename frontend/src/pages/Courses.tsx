import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { getCourses, type Course } from "@/lib/api";
import courseWeb from "@/assets/course-web.jpg";
import courseDesign from "@/assets/course-design.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseData from "@/assets/course-data.jpg";

// Маппинг изображений для курсов
const imageMap: Record<number, string> = {
  1: courseWeb,
  2: courseDesign,
  3: courseMarketing,
  4: courseData,
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Загрузка курсов из API
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(true), // Только опубликованные
  });

  // Преобразование данных API в формат для CourseCard
  const transformedCourses = courses.map((course: Course) => ({
    id: String(course.id),
    title: course.title,
    image: imageMap[course.id] || courseWeb, // Используем маппинг или дефолтное изображение
    rating: course.rating || 0,
    reviewCount: course.review_count || 0,
    price: course.price || "0 ₽",
    level: course.level || "Начальный",
  }));

  // Фильтрация по поисковому запросу
  const filteredCourses = transformedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка курсов...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Ошибка загрузки курсов. Убедитесь, что бэкенд запущен.</p>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Курсы не найдены</p>
              </div>
            )}
          </div>
        )}

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
