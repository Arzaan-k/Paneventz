import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import CloudinaryDebug from "./components/debug/CloudinaryDebug";

// Initialize debug logging
if (import.meta.env.DEV) {
  console.log('Environment Variables:', {
    VITE_CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    VITE_CLOUDINARY_API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY ? '***' : 'Not set'
  });
}
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";
import GalleryPage from "@/pages/GalleryPage";
import EventDetailPage from "@/pages/EventDetailPage";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import EventManager from "@/pages/admin/EventManager";
import ContentManager from "@/pages/admin/ContentManager";
import GalleryManager from "@/pages/admin/GalleryManager";
import Statistics from "@/pages/admin/Statistics";
import Services from "@/pages/admin/Services";
import Team from "@/pages/admin/Team";
import Inquiries from "@/pages/admin/Inquiries";
import Testimonials from "@/pages/admin/Testimonials";
import Settings from "@/pages/admin/Settings";
import Blog from "@/pages/admin/Blog";
import EnhancedGalleryManager from "@/pages/admin/EnhancedGalleryManager";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/services/:serviceType?" component={ServicePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/event/:slug" component={EventDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={EventManager} />
      <Route path="/admin/statistics" component={Statistics} />
      <Route path="/admin/content" component={ContentManager} />
      <Route path="/admin/services" component={Services} />
      <Route path="/admin/events" component={EventManager} />
      <Route path="/admin/gallery" component={EnhancedGalleryManager} />
      <Route path="/admin/blog" component={Blog} />
      <Route path="/admin/team" component={Team} />
      <Route path="/admin/inquiries" component={Inquiries} />
      <Route path="/admin/testimonials" component={Testimonials} />
      <Route path="/admin/settings" component={Settings} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <CloudinaryDebug />}
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
