import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigationItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Oluşturucu", href: "/builder" },
    { name: "Fiyatlandırma", href: "/pricing" },
  ];

  const resourcesItems = [
    { name: "Dokümantasyon", href: "/resources/documentation" },
    { name: "Blog", href: "/resources/blog" },
    { name: "Video Eğitimler", href: "/resources/videos" },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-[40] w-full pt-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-background/80 backdrop-blur-xl border border-border/20 rounded-2xl shadow-lg shadow-black/5">
          <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              Nonplo
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Kaynaklar
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] left-0 top-0 w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
                    <div className="grid w-[200px] gap-1 p-2 bg-background/95 backdrop-blur-sm border border-border/20 rounded-lg shadow-lg z-[100]">
                      {resourcesItems.map((item) => (
                        <NavigationMenuLink
                          key={item.name}
                          href={item.href}
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/account')}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Hesabım
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                >
                  Giriş Yap
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                >
                  Kayıt Ol
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 z-[60]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Kaynaklar</p>
                    {resourcesItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block text-foreground hover:text-primary transition-colors py-2 pl-4"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  
                  {/* Auth Section */}
                  <div className="border-t pt-4">
                    {user ? (
                      <div className="space-y-3">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2"
                          onClick={() => { navigate('/account'); setIsOpen(false); }}
                        >
                          <User className="w-4 h-4" />
                          Hesabım
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start gap-2"
                          onClick={() => { handleSignOut(); setIsOpen(false); }}
                        >
                          <LogOut className="w-4 h-4" />
                          Çıkış Yap
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => { navigate('/auth'); setIsOpen(false); }}
                        >
                          Giriş Yap
                        </Button>
                        <Button 
                          variant="hero" 
                          className="w-full"
                          onClick={() => { navigate('/auth'); setIsOpen(false); }}
                        >
                          Kayıt Ol
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;