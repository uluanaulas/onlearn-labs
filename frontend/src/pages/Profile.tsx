import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, CreditCard, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getMyCourses, type EnrollmentWithCourse } from "@/lib/api";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Загрузка курсов пользователя
  // enabled: только если пользователь авторизован И не идет загрузка auth
  const { data: enrollments = [], isLoading, error } = useQuery({
    queryKey: ['my-courses'],
    queryFn: getMyCourses,
    enabled: isAuthenticated && !authLoading && !!user,
    retry: (failureCount, error) => {
      // Retry только для сетевых ошибок, не для 401
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
    staleTime: 30000, // Кэшируем на 30 секунд
  });

  // Временные данные для сертификатов (пока нет API)
  const certificates: Array<{ id: number; title: string; date: string }> = [];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Если не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-muted-foreground">Пожалуйста, войдите в аккаунт</p>
            <Button onClick={() => navigate("/login")}>Войти</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Показываем загрузку, если данные еще не получены
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Загрузка профиля...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Получаем инициалы для аватара
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
                {user ? getInitials(user.name) : "U"}
              </div>
              
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold">{user?.name || "Пользователь"}</h1>
                <p className="mb-4 text-muted-foreground">{user?.email || ""}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span><strong>{enrollments.length}</strong> активных курсов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-success" />
                    <span><strong>{enrollments.filter(e => e.progress_percent === 100).length}</strong> завершено</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Настройки
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Мои курсы
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="h-4 w-4" />
              Сертификаты
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              История платежей
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка курсов...</p>
              </div>
            ) : error ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="mb-4 text-destructive">
                    Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Проверьте консоль браузера (F12) для деталей
                  </p>
                  <Button onClick={() => window.location.reload()}>Обновить страницу</Button>
                </CardContent>
              </Card>
            ) : enrollments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">У вас пока нет курсов</h3>
                  <p className="mb-4 text-muted-foreground">
                    Запишитесь на курс, чтобы начать обучение
                  </p>
                  <Button asChild>
                    <Link to="/courses">Перейти к каталогу</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((enrollment: EnrollmentWithCourse) => (
                  <Card key={enrollment.enrollment_id} className="hover:shadow-card-hover transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">{enrollment.progress_percent}%</span>
                          </div>
                          <Progress value={enrollment.progress_percent} className="h-2" />
                        </div>
                        
                        {enrollment.course.level && (
                          <p className="text-sm text-muted-foreground">
                            Уровень: {enrollment.course.level}
                          </p>
                        )}
                        
                        <Button className="w-full" variant="outline" asChild>
                          <Link to={`/learning/${enrollment.course.id}`}>
                            {enrollment.progress_percent === 100 ? "Повторить курс" : "Продолжить обучение"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="certificates">
            {certificates.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">У вас пока нет сертификатов</h3>
                  <p className="text-muted-foreground">
                    Завершите курс на 100%, чтобы получить сертификат
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-card-hover transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-success/10">
                        <Award className="h-16 w-16 text-primary" />
                      </div>
                      <h3 className="mb-2 font-semibold">{cert.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Выдан {cert.date}
                      </p>
                      <Button variant="outline" className="w-full">
                        Скачать PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-semibold">Веб-разработка для начинающих</p>
                      <p className="text-sm text-muted-foreground">15 ноября 2024</p>
                    </div>
                    <span className="font-semibold">4 990 ₽</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-semibold">Основы UI/UX дизайна</p>
                      <p className="text-sm text-muted-foreground">28 октября 2024</p>
                    </div>
                    <span className="font-semibold">5 490 ₽</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-semibold">Python для анализа данных</p>
                      <p className="text-sm text-muted-foreground">12 октября 2024</p>
                    </div>
                    <span className="font-semibold">7 490 ₽</span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-lg font-semibold">Всего</span>
                    <span className="text-xl font-bold text-primary">17 970 ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            className="gap-2 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Выйти из профиля
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
