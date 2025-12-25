import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, BarChart, Users, CheckCircle2, PlayCircle } from "lucide-react";
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
    text: "Отличный курс! Все объяснено доступно и понятно. Уже применяю полученные знания в работе.",
  },
  {
    id: 2,
    author: "Мария Иванова",
    rating: 5,
    date: "12 ноября 2024",
    text: "Преподаватель просто супер! Много практики, хорошая структура материала.",
  },
  {
    id: 3,
    author: "Дмитрий Смирнов",
    rating: 4,
    date: "8 ноября 2024",
    text: "Хороший курс для начинающих. Немного не хватило глубины в некоторых темах.",
  },
];

const CoursePage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="mb-4 text-4xl font-bold">
                Веб-разработка для начинающих: HTML, CSS, JavaScript
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">4.8</span>
                  <span>(1,234 отзывов)</span>
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
            </div>

            {/* Preview Video */}
            <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                src={courseWeb}
                alt="Превью курса"
                className="h-full w-full object-cover"
              />
              <div className="flex h-full items-center justify-center">
                <Button size="lg" className="gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Посмотреть превью
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="program">Программа</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6 space-y-4">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">О курсе</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Этот курс предназначен для тех, кто хочет начать карьеру в веб-разработке с нуля.
                    Вы изучите основы HTML, CSS и JavaScript, научитесь создавать интерактивные
                    веб-страницы и получите все необходимые навыки для дальнейшего развития.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Что вы узнаете</h3>
                  <ul className="space-y-2">
                    {[
                      "Основы HTML: структура и семантика",
                      "CSS: стилизация и адаптивная верстка",
                      "JavaScript: программирование и работа с DOM",
                      "Современные инструменты разработки",
                      "Создание реальных проектов",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Требования</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-muted-foreground">
                        Компьютер с доступом в интернет
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-muted-foreground">
                        Базовые навыки работы с компьютером
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="program" className="mt-6">
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="mb-2 text-3xl font-bold">4 990 ₽</div>
                  <div className="text-sm text-muted-foreground line-through">7 990 ₽</div>
                </div>

                <Button className="mb-4 w-full" size="lg" asChild>
                  <Link to={`/learning/${id}`}>Записаться на курс</Link>
                </Button>

                <div className="space-y-3 border-t pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Уровень</span>
                    <span className="font-medium">Начальный</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Длительность</span>
                    <span className="font-medium">6 часов</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Уроков</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Сертификат</span>
                    <span className="font-medium">Да</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Доступ</span>
                    <span className="font-medium">Навсегда</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
