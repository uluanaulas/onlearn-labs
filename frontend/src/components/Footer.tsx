import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">O</span>
            </div>
            <span className="text-lg font-bold">Onlearn</span>
          </div>
          
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="transition-colors hover:text-foreground">
              О нас
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link to="/support" className="transition-colors hover:text-foreground">
              Поддержка
            </Link>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © 2024 Onlearn. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
