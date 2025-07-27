import { useState } from "react";
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
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Builder", href: "/builder" },
    { name: "Pricing", href: "/pricing" },
    { name: "Account", href: "/account" },
  ];

  const resourcesItems = [
    { name: "Documentation", href: "/resources/documentation" },
    { name: "Blog", href: "/resources/blog" },
    { name: "Video Tutorials", href: "/resources/videos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-4">
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
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-0 top-0 w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
                    <div className="grid w-[200px] gap-1 p-2 bg-background border border-border/20 rounded-lg shadow-lg">
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

            <Button variant="hero" size="default" className="ml-4">
              Start Building
            </Button>
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
              <SheetContent side="right" className="w-80">
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
                    <p className="text-sm font-medium text-muted-foreground mb-2">Resources</p>
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
                  
                  <div className="pt-4">
                    <Button variant="hero" size="lg" className="w-full">
                      Start Building
                    </Button>
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