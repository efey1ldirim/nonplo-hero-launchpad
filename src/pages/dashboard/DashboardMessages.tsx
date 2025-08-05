const DashboardMessages = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Mesajlar</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          AI çalışanlarınızın mesaj geçmişini görüntüleyin ve yönetin
        </p>
      </div>
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Bu sayfa şu anda geliştirme sürecindedir. Yakında aktif olacaktır.
        </p>
      </div>
    </div>
  );
};

export default DashboardMessages;