import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
const testimonials = [{
  name: "Ayşe Demir",
  business: "Yerel Kafe Sahibi",
  quote: "Nonplo'nun AI ajanı müşteri sorularımızı 7/24 yanıtlıyor. Artık gün boyu aynı soruları yanıtlamak yerine harika kahve yapmaya odaklanabiliyorum.",
  avatar: "photo-1581091226825-a6a2a5aee158",
  rating: 5
}, {
  name: "Mehmet Özkan",
  business: "Pazarlama Danışmanı",
  quote: "Potansiyel müşteri değerlendirme kurulumunu 10 dakikada tamamladım. Yanıt süremiz %80 iyileşti ve her zamankinden daha fazla anlaşma kapatıyoruz.",
  avatar: "photo-1581092795360-fd1ca04f0952",
  rating: 5
}, {
  name: "Zeynep Yılmaz",
  business: "Online Butik",
  quote: "E-posta otomasyon ajanı günde 3 saat tasarruf sağladı. Artık tekrarlayan e-postalar yazmak yerine yeni ürünler tasarlamaya zaman ayırabiliyorum.",
  avatar: "photo-1581090464777-f3220bbe1b8b",
  rating: 5
}, {
  name: "Can Kaya",
  business: "Danışmanlık Firması",
  quote: "Kodlama bilgisi gerekmedi - ilk AI ajanımı bir saatten kısa sürede çalıştırdım. Hiç uyumayan dijital bir asistana sahip olmak gibi.",
  avatar: "photo-1519389950473-47ba0277781c",
  rating: 5
}];
const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false
  });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track selected slide index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Auto-advance every 3 seconds with proper cleanup
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 3000);
  }, [emblaApi]);
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  useEffect(() => {
    if (!emblaApi) return;

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const carouselNode = emblaApi.rootNode();
    const handleMouseEnter = () => stopAutoplay();
    const handleMouseLeave = () => startAutoplay();
    carouselNode.addEventListener('mouseenter', handleMouseEnter);
    carouselNode.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      stopAutoplay();
      carouselNode.removeEventListener('mouseenter', handleMouseEnter);
      carouselNode.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            İşletmelerin Hakkımızdaki Düşüncleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Nonplo'yu her gün kullanan ekiplerden hikayeler</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => {
              const isCenter = index === selectedIndex;
              return <div key={index} className={`flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] px-4 transition-all duration-500 ${isCenter ? 'opacity-100 scale-105' : 'opacity-60 scale-95 blur-[2px]'}`}>
                    <div className="mx-auto max-w-md h-[280px] relative">
                      {/* Glassmorphic Card */}
                      <div className={`h-full backdrop-blur-[10px] bg-white/10 border border-white/20 rounded-2xl p-6 transition-all duration-500 flex flex-col justify-center ${isCenter ? 'shadow-2xl' : 'shadow-lg'}`}>
                        <Quote className="w-6 h-6 text-primary mb-3" />
                        
                        <p className="text-foreground mb-4 text-base leading-relaxed">
                          "{testimonial.quote}"
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center overflow-hidden">
                              <img src={`https://images.unsplash.com/${testimonial.avatar}?w=40&h=40&fit=crop&crop=face`} alt={testimonial.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                              <p className="text-xs text-muted-foreground">{testimonial.business}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>;
            })}
            </div>
          </div>

          {/* Custom Navigation Buttons */}
          <Button variant="outline" size="icon" onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 hover:scale-110 transition-all duration-300 shadow-lg">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 hover:scale-110 transition-all duration-300 shadow-lg">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;