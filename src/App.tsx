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
import Documentation from "./pages/resources/Documentation";
import Blog from "./pages/resources/Blog";
import VideoTutorials from "./pages/resources/VideoTutorials";
import NotFound from "./pages/NotFound";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources/documentation" element={<Documentation />} />
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/videos" element={<VideoTutorials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
