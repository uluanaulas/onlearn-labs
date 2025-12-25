import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
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

const Learning = () => {
  const [currentLesson, setCurrentLesson] = useState(2);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Lessons List */}
      <aside className="w-80 overflow-y-auto border-r bg-muted/30">
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold">Программа курса</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`cursor-pointer transition-all ${
                  currentLesson === lesson.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
                onClick={() => setCurrentLesson(lesson.id)}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  {lesson.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <PlayCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-5xl py-6">
          {/* Video Player */}
          <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src={courseWeb}
              alt="Урок"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Lesson Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Предыдущий урок
            </Button>
            <span className="text-sm text-muted-foreground">
              Урок {currentLesson} из {lessons.length}
            </span>
            <Button className="gap-2">
              Следующий урок
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Lesson Content */}
          <Tabs defaultValue="materials" className="mb-8">
            <TabsList>
              <TabsTrigger value="materials">Материалы</TabsTrigger>
              <TabsTrigger value="task">Задание</TabsTrigger>
              <TabsTrigger value="discussion">Обсуждение</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">
                    Основы HTML: структура документа
                  </h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-muted-foreground">
                      В этом уроке мы изучим базовую структуру HTML-документа. HTML (HyperText Markup Language)
                      — это язык разметки, используемый для создания веб-страниц.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">Основные теги</h3>
                    <ul className="space-y-2">
                      <li className="text-muted-foreground">
                        <code className="rounded bg-muted px-2 py-1">&lt;html&gt;</code> - корневой элемент
                      </li>
                      <li className="text-muted-foreground">
                        <code className="rounded bg-muted px-2 py-1">&lt;head&gt;</code> - метаинформация
                      </li>
                      <li className="text-muted-foreground">
                        <code className="rounded bg-muted px-2 py-1">&lt;body&gt;</code> - содержимое страницы
                      </li>
                    </ul>

                    <h3 className="mt-6 text-xl font-semibold">Пример кода</h3>
                    <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                      <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>Моя первая страница</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
  </body>
</html>`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="task" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Практическое задание</h2>
                  
                  <div className="mb-6 space-y-4">
                    <p className="text-muted-foreground">
                      Создайте HTML-страницу со следующей структурой:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Заголовок первого уровня с вашим именем</li>
                      <li>Параграф с описанием ваших увлечений</li>
                      <li>Список из трех ваших любимых книг</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <Textarea
                      placeholder="Введите ваш код здесь..."
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <Button className="w-full">Сдать задание</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Обсуждение урока</h2>
                  
                  <div className="mb-6 space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-semibold">Иван Петров</span>
                          <span className="text-sm text-muted-foreground">2 часа назад</span>
                        </div>
                        <p className="text-muted-foreground">
                          Отличный урок! Очень понятно объяснили структуру HTML. Есть вопрос:
                          обязательно ли использовать DOCTYPE?
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-semibold">Мария Смирнова</span>
                          <span className="text-sm text-muted-foreground">5 часов назад</span>
                        </div>
                        <p className="text-muted-foreground">
                          Спасибо за практические примеры! Теперь всё понятно.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <Textarea placeholder="Задайте вопрос или оставьте комментарий..." />
                    <Button>Отправить</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Learning;
