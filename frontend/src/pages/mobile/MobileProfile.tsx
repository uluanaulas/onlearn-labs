import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Award, 
  Settings, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import courseWeb from "@/assets/course-web.jpg";

const activeCourses = [
  {
    id: "1",
    title: "Веб-разработка для начинающих",
    image: courseWeb,
    progress: 37.5,
    lessons: "3 из 8 уроков",
  },
  {
    id: "2",
    title: "Python для анализа данных",
    image: courseWeb,
    progress: 62.5,
    lessons: "5 из 8 уроков",
  },
];

const achievements = [
  { icon: Trophy, title: "Первый курс", description: "Завершите первый курс" },
  { icon: Target, title: "Целеустремленный", description: "7 дней подряд" },
  { icon: TrendingUp, title: "Быстрый старт", description: "3 курса за месяц" },
];

const MobileProfile = () => {
  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                ИП
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1">Иван Петров</h1>
            <p className="text-sm text-muted-foreground mb-4">ivan.petrov@example.com</p>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Редактировать профиль
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container px-4 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground mt-1">Курсов</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-primary">45</div>
              <div className="text-xs text-muted-foreground mt-1">Часов</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground mt-1">Наград</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Courses */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Активные курсы</h2>
            <Link to="/learning" className="flex items-center text-sm font-medium text-primary">
              Все <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {activeCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3 mb-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{course.lessons}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Достижения</h2>
            <Link to="/achievements" className="flex items-center text-sm font-medium text-primary">
              Все <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-3 text-center">
                    <div className="flex h-12 w-12 mx-auto mb-2 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-xs font-semibold line-clamp-1">{achievement.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {[
              { icon: User, label: "Личные данные", path: "/profile/settings" },
              { icon: CreditCard, label: "Платежи и подписки", path: "/profile/payments" },
              { icon: Bell, label: "Уведомления", path: "/profile/notifications" },
              { icon: Award, label: "Сертификаты", path: "/profile/certificates" },
              { icon: HelpCircle, label: "Помощь и поддержка", path: "/help" },
            ].map((item, index, arr) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                    index !== arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full mt-6" size="lg">
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default MobileProfile;
