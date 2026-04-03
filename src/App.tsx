import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import ToolsPage from "./pages/ToolsPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import GuidesPage from "./pages/GuidesPage";
import GuideCategoryPage from "./pages/GuideCategoryPage";
import HowToPage from "./pages/HowToPage";
import HowToDetailPage from "./pages/HowToDetailPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import CalculatorDetailPage from "./pages/CalculatorDetailPage";
import ComparisonsPage from "./pages/ComparisonsPage";
import ComparisonDetailPage from "./pages/ComparisonDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/:slug" element={<ToolDetailPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/:category" element={<GuideCategoryPage />} />
              <Route path="/how-to" element={<HowToPage />} />
              <Route path="/how-to/:slug" element={<HowToDetailPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              <Route path="/calculators/:slug" element={<CalculatorDetailPage />} />
              <Route path="/comparisons" element={<ComparisonsPage />} />
              <Route path="/comparisons/:slug" element={<ComparisonDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
