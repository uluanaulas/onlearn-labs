import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, CreditCard, Settings, LogOut } from "lucide-react";

const myCourses = [
  {
    id: 1,
    title: "Веб-разработка для начинающих",
    progress: 25,
    lastAccessed: "Сегодня",
  },
  {
    id: 2,
    title: "Основы UI/UX дизайна",
    progress: 60,
    lastAccessed: "Вчера",
  },
  {
    id: 3,
    title: "Python для анализа данных",
    progress: 15,
    lastAccessed: "3 дня назад",
  },
];

const certificates = [
  { id: 1, title: "Основы HTML и CSS", date: "15 октября 2024" },
  { id: 2, title: "JavaScript для начинающих", date: "1 ноября 2024" },
];

const Profile = () => {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
                АП
              </div>
              
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold">Алексей Петров</h1>
                <p className="mb-4 text-muted-foreground">alex.petrov@example.com</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span><strong>3</strong> активных курса</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-success" />
                    <span><strong>2</strong> сертификата</span>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-card-hover transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Последний доступ: {course.lastAccessed}
                      </p>
                      
                      <Button className="w-full" variant="outline">
                        Продолжить обучение
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
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
          <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Выйти из профиля
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
