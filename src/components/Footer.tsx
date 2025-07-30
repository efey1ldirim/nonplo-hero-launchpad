import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Nonplo</h3>
            <p className="text-muted-foreground text-sm">
              İşletmenizi güçlendiren akıllı AI ajanları oluşturun. Müşteri hizmetlerinden satış otomasyonuna kadar her alanda size yardımcı oluyoruz.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" asChild>
                <a href="https://www.facebook.com/profile.php?id=61578490186349" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" asChild>
                <a href="https://www.instagram.com/nonplo.ai" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" asChild>
                <a href="https://x.com/nonploai" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" asChild>
                <a href="https://www.linkedin.com/company/nonplo" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Sayfalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="/builder" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Ajan Oluşturucu
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Fiyatlandırma
                </a>
              </li>
              <li>
                <a href="/account" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Hesap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Kaynaklar</h4>
            <ul className="space-y-2">
              <li>
                <a href="/resources/documentation" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Dokümantasyon
                </a>
              </li>
              <li>
                <a href="/resources/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/resources/videos" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Video Eğitimler
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@nonplo.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+90 212 555 0123</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 Nonplo. Tüm hakları saklıdır.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Çerez Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;