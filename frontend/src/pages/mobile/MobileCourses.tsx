import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal } from "lucide-react";
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
];

const MobileCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-20">
      {/* Search and Filter Bar */}
      <div className="sticky top-14 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container px-4 py-3">
          <div className="flex gap-2">
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
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6 overflow-y-auto pb-6">
                  <div>
                    <Label className="mb-3 block text-sm font-medium">Категория</Label>
                    <div className="space-y-3">
                      {["Программирование", "Дизайн", "Маркетинг", "Данные", "Бизнес"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-${category}`} />
                          <label
                            htmlFor={`mobile-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Уровень</Label>
                    <div className="space-y-3">
                      {["Начальный", "Средний", "Продвинутый"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-${level}`} />
                          <label
                            htmlFor={`mobile-${level}`}
                            className="text-sm cursor-pointer"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block text-sm font-medium">Цена</Label>
                    <div className="space-y-3">
                      {["Бесплатные", "До 5 000 ₽", "5 000 - 10 000 ₽", "Более 10 000 ₽"].map((price) => (
                        <div key={price} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-${price}`} />
                          <label
                            htmlFor={`mobile-${price}`}
                            className="text-sm cursor-pointer"
                          >
                            {price}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full">Применить фильтры</Button>
                    <Button variant="outline" className="w-full">Сбросить</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Найдено курсов: {allCourses.length}
          </p>
        </div>

        <div className="space-y-4">
          {allCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCourses;
