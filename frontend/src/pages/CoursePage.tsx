import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Star, Clock, BarChart, Users, CheckCircle2, PlayCircle, Trash2, MessageSquare } from "lucide-react";
import { getCourse, enrollCourse, getCourseComments, createComment, deleteComment, type Course, type Comment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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

const CoursePage = () => {
  const { id } = useParams();
  const courseId = id ? parseInt(id) : 0;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  // Загрузка курса из API
  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourse(courseId),
    enabled: courseId > 0,
  });

  // Загрузка комментариев
  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ['comments', courseId],
    queryFn: () => getCourseComments(courseId),
    enabled: courseId > 0,
  });

  // Мутация для записи на курс
  const enrollMutation = useMutation({
    mutationFn: () => enrollCourse(courseId),
    onSuccess: () => {
      toast({
        title: "Успешно!",
        description: "Вы записались на курс",
      });
      queryClient.invalidateQueries({ queryKey: ['my-courses'] });
      navigate(`/learning/${courseId}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Мутация для создания комментария
  const createCommentMutation = useMutation({
    mutationFn: (text: string) => createComment(courseId, text),
    onSuccess: () => {
      setCommentText("");
      refetchComments();
      toast({
        title: "Успешно!",
        description: "Комментарий добавлен",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Мутация для удаления комментария
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      refetchComments();
      toast({
        title: "Успешно!",
        description: "Комментарий удален",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Требуется вход",
        description: "Пожалуйста, войдите в аккаунт для добавления комментария",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    if (!commentText.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите текст комментария",
        variant: "destructive",
      });
      return;
    }
    createCommentMutation.mutate(commentText);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Требуется вход",
        description: "Пожалуйста, войдите в аккаунт для записи на курс",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    enrollMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-center text-muted-foreground">Загрузка курса...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container py-8">
        <p className="text-center text-destructive">Курс не найден. Убедитесь, что бэкенд запущен.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="mb-4 text-4xl font-bold">
                {course.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {course.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{course.rating}</span>
                    {course.review_count && (
                      <span>({course.review_count.toLocaleString()} отзывов)</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>5,678 студентов</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>6 часов</span>
                </div>
                {course.level && (
                  <div className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                )}
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
                    {course.description}
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
                  {/* Форма для добавления комментария */}
                  {isAuthenticated && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">Добавить комментарий</h3>
                        <Textarea
                          placeholder="Напишите ваш комментарий..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="mb-4 min-h-[100px]"
                        />
                        <Button
                          onClick={handleSubmitComment}
                          disabled={createCommentMutation.isPending || !commentText.trim()}
                        >
                          {createCommentMutation.isPending ? "Отправка..." : "Отправить"}
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {!isAuthenticated && (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <MessageSquare className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">
                          Войдите в аккаунт, чтобы оставить комментарий
                        </p>
                        <Button onClick={() => navigate("/login")}>
                          Войти
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Список комментариев */}
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          Пока нет комментариев. Будьте первым!
                        </CardContent>
                      </Card>
                    ) : (
                      comments.map((comment) => (
                        <Card key={comment.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                  <p className="font-semibold">
                                    {comment.user_name || `Пользователь #${comment.user_id}`}
                                  </p>
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(comment.created_at)}
                                  </span>
                                </div>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                  {comment.text}
                                </p>
                              </div>
                              {isAuthenticated && user && comment.user_id === user.id && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm("Удалить комментарий?")) {
                                      deleteCommentMutation.mutate(comment.id);
                                    }
                                  }}
                                  disabled={deleteCommentMutation.isPending}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="mb-2 text-3xl font-bold">{course.price || "Бесплатно"}</div>
                </div>

                <Button 
                  className="mb-4 w-full" 
                  size="lg" 
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Запись..." : "Записаться на курс"}
                </Button>

                <div className="space-y-3 border-t pt-4 text-sm">
                  {course.level && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Уровень</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  )}
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
