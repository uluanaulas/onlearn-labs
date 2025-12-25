import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Award, 
  Zap,
  BookOpen,
  Star,
  Medal,
  Flame
} from "lucide-react";

const achievements = [
  { 
    icon: Trophy, 
    title: "Первый курс", 
    description: "Завершите первый курс",
    progress: 100,
    unlocked: true,
    date: "15 ноября 2024"
  },
  { 
    icon: Target, 
    title: "Целеустремленный", 
    description: "Учитесь 7 дней подряд",
    progress: 100,
    unlocked: true,
    date: "10 ноября 2024"
  },
  { 
    icon: TrendingUp, 
    title: "Быстрый старт", 
    description: "Завершите 3 курса за месяц",
    progress: 66,
    unlocked: false
  },
  { 
    icon: Star, 
    title: "5 звезд", 
    description: "Получите оценку 5 за курс",
    progress: 100,
    unlocked: true,
    date: "8 ноября 2024"
  },
  { 
    icon: Flame, 
    title: "В огне", 
    description: "Учитесь 30 дней подряд",
    progress: 40,
    unlocked: false
  },
  { 
    icon: BookOpen, 
    title: "Книжный червь", 
    description: "Завершите 10 курсов",
    progress: 20,
    unlocked: false
  },
  { 
    icon: Zap, 
    title: "Молниеносный", 
    description: "Завершите курс за 1 день",
    progress: 0,
    unlocked: false
  },
  { 
    icon: Medal, 
    title: "Чемпион", 
    description: "Попадите в топ-10 учеников",
    progress: 0,
    unlocked: false
  },
];

const Achievements = () => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen pb-20">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Достижения</h1>
          <p className="text-muted-foreground">
            Открыто {unlockedCount} из {totalCount} достижений
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Общий прогресс</span>
                <span className="font-medium">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </span>
              </div>
              <Progress value={(unlockedCount / totalCount) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={index}
                className={achievement.unlocked ? "border-primary/50 bg-primary/5" : "opacity-60"}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        achievement.unlocked 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{achievement.title}</CardTitle>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Получено: {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Открыто
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
