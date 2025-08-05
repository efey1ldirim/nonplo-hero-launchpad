import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Agent Yönetim Paneli
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          AI çalışanlarınızı yönetin ve kontrol edin
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
        <Card className="min-h-[100px] md:min-h-[120px]">
          <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              Aktif Agent Sayısı
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-3 md:p-6">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">2</div>
          </CardContent>
        </Card>

        <Card className="min-h-[100px] md:min-h-[120px]">
          <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              Günlük Mesaj
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-3 md:p-6">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">147</div>
          </CardContent>
        </Card>

        <Card className="min-h-[100px] md:min-h-[120px] sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              Toplam Etkileşim
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-3 md:p-6">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">1.2k</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="w-full overflow-hidden">
        <CardHeader className="pb-4 p-3 md:p-6">
          <CardTitle className="flex items-center space-x-2 text-sm md:text-base lg:text-lg">
            <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
            <span>Son 7 Gün Etkileşim Trendi</span>
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Günlük mesaj ve etkileşim istatistikleri
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 p-3 md:p-6">
          <div className="h-40 md:h-48 lg:h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg flex items-end justify-center space-x-1 md:space-x-2 p-2 md:p-3 lg:p-4 w-full max-w-full">
            {[20, 35, 45, 30, 55, 40, 60].map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-primary to-purple-500 rounded-t-sm w-4 md:w-6 lg:w-8 transition-all hover:opacity-80 flex-shrink-0"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 md:mt-3 lg:mt-4 text-xs text-muted-foreground px-1">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span>Cmt</span>
            <span>Paz</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;