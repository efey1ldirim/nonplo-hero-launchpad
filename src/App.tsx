import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import DashboardAgents from "./pages/dashboard/DashboardAgents";
import DashboardMessages from "./pages/dashboard/DashboardMessages";
import DashboardIntegrations from "./pages/dashboard/DashboardIntegrations";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import Documentation from "./pages/resources/Documentation";
import DocumentationArticle from "./pages/resources/DocumentationArticle";
import Blog from "./pages/resources/Blog";
import BlogArticle from "./pages/resources/BlogArticle";
import VideoTutorials from "./pages/resources/VideoTutorials";
import VideoTutorialArticle from "./pages/resources/VideoTutorialArticle";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/agents" element={<ProtectedRoute><DashboardAgents /></ProtectedRoute>} />
          <Route path="/dashboard/messages" element={<ProtectedRoute><DashboardMessages /></ProtectedRoute>} />
          <Route path="/dashboard/integrations" element={<ProtectedRoute><DashboardIntegrations /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/resources/documentation" element={<Documentation />} />
          <Route path="/resources/documentation/:sectionId/:articleIndex" element={<DocumentationArticle />} />
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/blog/:articleId" element={<BlogArticle />} />
          <Route path="/resources/videos" element={<VideoTutorials />} />
          <Route path="/resources/videos/:videoId" element={<VideoTutorialArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
