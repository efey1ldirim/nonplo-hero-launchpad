import Header from "@/components/Header";

const Account = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Çok Yakında
            </h1>
            <p className="text-muted-foreground text-lg">
              Bu sayfa yakında kullanıma sunulacak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;