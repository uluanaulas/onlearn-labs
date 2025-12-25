import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, BarChart, Users, CheckCircle2, PlayCircle, ChevronLeft, Share2, Heart } from "lucide-react";
import courseWeb from "@/assets/course-web.jpg";

const lessons = [
  { id: 1, title: "Введение в веб-разработку", duration: "15 мин", completed: true },
  { id: 2, title: "Основы HTML: структура документа", duration: "25 мин", completed: true },
  { id: 3, title: "CSS: стилизация элементов", duration: "30 мин", completed: false },
  { id: 4, title: "JavaScript: основы программирования", duration: "40 мин", completed: false },
  { id: 5, title: "Работа с DOM", duration: "35 мин", completed: false },
  { id: 6, title: "Асинхронное программирование", duration: "45 мин", completed: false },
  { id: 7, title: "Введение в React", duration: "50 мин", completed: false },
  { id: 8, title: "Финальный проект", duration: "60 мин", completed: false },
];

const reviews = [
  {
    id: 1,
    author: "Алексей Петров",
    rating: 5,
    date: "15 ноября 2024",
    text: "Отличный курс! Все объяснено доступно и понятно.",
  },
  {
    id: 2,
    author: "Мария Иванова",
    rating: 5,
    date: "12 ноября 2024",
    text: "Преподаватель просто супер! Много практики.",
  },
];

const MobileCoursePage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen pb-20">
      {/* Header with back button */}
      <div className="sticky top-14 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/courses">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="flex-1 truncate text-lg font-semibold">Детали курса</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Preview Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={courseWeb}
          alt="Превью курса"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button size="lg" className="gap-2">
            <PlayCircle className="h-5 w-5" />
            Превью
          </Button>
        </div>
      </div>

      {/* Course Info */}
      <div className="container px-4 py-6">
        <h2 className="mb-3 text-2xl font-bold">
          Веб-разработка для начинающих: HTML, CSS, JavaScript
        </h2>
        
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">4.8</span>
            <span>(1,234)</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>5,678 студентов</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>6 часов</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Начальный</span>
          </div>
        </div>

        {/* Price and Enroll */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Цена курса</p>
                <p className="text-2xl font-bold text-primary">4 990 ₽</p>
              </div>
              <Button size="lg" asChild>
                <Link to={`/learning/${id}`}>Записаться</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="curriculum">Программа</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold">О курсе</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Этот курс предназначен для тех, кто хочет начать карьеру в веб-разработке.
                Вы изучите основы HTML, CSS и JavaScript, научитесь создавать адаптивные
                веб-сайты и получите практические навыки работы с современными инструментами.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Чему вы научитесь</h3>
              <ul className="space-y-2">
                {[
                  "Создавать структуру веб-страниц с помощью HTML",
                  "Стилизовать элементы используя CSS",
                  "Программировать интерактивные элементы на JavaScript",
                  "Работать с DOM и событиями",
                  "Создавать адаптивные веб-сайты",
                ].map((item, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Требования</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Базовые навыки работы с компьютером</li>
                <li>• Желание учиться и практиковаться</li>
                <li>• Никакого опыта программирования не требуется</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-3 pt-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      lesson.completed ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-semibold">{lesson.id}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                    </div>
                  </div>
                  {!lesson.completed && (
                    <PlayCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">4.8</span>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">1,234 отзывов</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">Оставить отзыв</Button>
            </div>

            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileCoursePage;
