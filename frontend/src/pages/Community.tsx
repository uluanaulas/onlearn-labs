import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, TrendingUp } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Сообщество</h1>
          <p className="text-lg text-muted-foreground">
            Общайтесь с другими студентами, делитесь опытом и находите новых друзей
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Форумы</h3>
              <p className="mb-4 text-muted-foreground">
                Обсуждайте курсы, задавайте вопросы и помогайте другим
              </p>
              <Button variant="outline">Перейти к форумам</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Users className="h-8 w-8 text-success" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Группы</h3>
              <p className="mb-4 text-muted-foreground">
                Вступайте в группы по интересам и находите единомышленников
              </p>
              <Button variant="outline">Найти группу</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Рейтинги</h3>
              <p className="mb-4 text-muted-foreground">
                Соревнуйтесь с другими студентами и получайте награды
              </p>
              <Button variant="outline">Посмотреть рейтинг</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
