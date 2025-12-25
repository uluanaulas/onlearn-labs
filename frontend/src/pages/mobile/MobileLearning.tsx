import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, FileText, Play } from "lucide-react";
import courseWeb from "@/assets/course-web.jpg";

const lessons = [
  { id: 1, title: "Введение в веб-разработку", duration: "15 мин", completed: true },
  { id: 2, title: "Основы HTML: структура документа", duration: "25 мин", completed: true },
  { id: 3, title: "CSS: стилизация элементов", duration: "30 мин", completed: false },
  { id: 4, title: "JavaScript: основы программирования", duration: "40 мин", completed: false },
];

const MobileLearning = () => {
  const { id } = useParams();
  const [currentLesson, setCurrentLesson] = useState(3);
  const progress = (2 / lessons.length) * 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-14 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/course/${id}`}>
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="truncate text-sm font-semibold">Урок {currentLesson}</h1>
              <p className="truncate text-xs text-muted-foreground">
                {lessons[currentLesson - 1]?.title}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Прогресс курса</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video w-full bg-black">
        <img
          src={courseWeb}
          alt="Видео урока"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" className="h-16 w-16 rounded-full p-0">
            <Play className="h-8 w-8" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="materials">Материалы</TabsTrigger>
            <TabsTrigger value="discussion">Обсуждение</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div>
              <h2 className="mb-2 text-xl font-bold">
                {lessons[currentLesson - 1]?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                В этом уроке вы изучите основы CSS и научитесь стилизовать элементы на веб-странице.
                Мы рассмотрим селекторы, свойства и значения CSS.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="mb-3 text-sm font-semibold">Что вы узнаете:</h3>
                <ul className="space-y-2">
                  {[
                    "Синтаксис CSS и способы подключения",
                    "Селекторы и их приоритеты",
                    "Основные CSS свойства",
                    "Модель блоков (Box Model)",
                  ].map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={currentLesson === 1}
                onClick={() => setCurrentLesson(currentLesson - 1)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Предыдущий
              </Button>
              <Button
                className="flex-1"
                disabled={currentLesson === lessons.length}
                onClick={() => setCurrentLesson(currentLesson + 1)}
              >
                Следующий
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-3 pt-4">
            {[
              { name: "Презентация урока", type: "PDF", size: "2.4 MB" },
              { name: "Исходный код примеров", type: "ZIP", size: "156 KB" },
              { name: "Дополнительные материалы", type: "PDF", size: "1.8 MB" },
            ].map((material, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{material.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {material.type} • {material.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Скачать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4 pt-4">
            {[
              {
                author: "Иван Петров",
                time: "2 часа назад",
                text: "Отличное объяснение! Теперь все понятно про селекторы.",
                replies: 3,
              },
              {
                author: "Мария Сидорова",
                time: "5 часов назад",
                text: "У меня вопрос по поводу специфичности селекторов...",
                replies: 1,
              },
            ].map((comment, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                  </div>
                  <p className="mb-2 text-sm">{comment.text}</p>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <MessageCircle className="mr-1 h-3 w-3" />
                    {comment.replies} ответов
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-4">
                <textarea
                  placeholder="Написать комментарий..."
                  className="w-full resize-none border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground"
                  rows={3}
                />
                <div className="flex justify-end pt-2">
                  <Button size="sm">Отправить</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileLearning;
