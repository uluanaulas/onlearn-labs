import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const navItems = [
    { label: "Главная", path: "/" },
    { label: "Курсы", path: "/courses" },
    { label: "Обучение", path: "/learning" },
    { label: "Дизайн", path: "/design" },
    { label: "Сообщество", path: "/community" },
    { label: "Профиль", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">O</span>
          </div>
          <span className="text-xl font-bold">Onlearn</span>
        </Link>
        
        <nav className="flex items-center space-x-1 text-sm font-medium flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-md transition-colors hover:bg-muted",
                location.pathname === item.path
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск курсов..."
              className="w-64 pl-9"
            />
          </div>
          
          {isAuthenticated ? (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile" title={user?.name || "Профиль"}>
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login">Войти</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
