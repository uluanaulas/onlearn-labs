import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import Home from "./pages/Home";
import MobileHome from "./pages/mobile/MobileHome";
import Courses from "./pages/Courses";
import MobileCourses from "./pages/mobile/MobileCourses";
import CoursePage from "./pages/CoursePage";
import MobileCoursePage from "./pages/mobile/MobileCoursePage";
import Learning from "./pages/Learning";
import MobileLearning from "./pages/mobile/MobileLearning";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import MobileProfile from "./pages/mobile/MobileProfile";
import Login from "./pages/Login";
import Achievements from "./pages/Achievements";
import Design from "./pages/Design";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen flex-col">
              {isMobile ? <MobileHeader /> : <Header />}
              <Routes>
                <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
                <Route path="/courses" element={isMobile ? <MobileCourses /> : <Courses />} />
                <Route path="/course/:id" element={isMobile ? <MobileCoursePage /> : <CoursePage />} />
                <Route path="/learning" element={isMobile ? <MobileLearning /> : <Learning />} />
                <Route path="/learning/:id" element={isMobile ? <MobileLearning /> : <Learning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/design" element={<Design />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={isMobile ? <MobileProfile /> : <Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {isMobile ? <MobileNav /> : <Footer />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
