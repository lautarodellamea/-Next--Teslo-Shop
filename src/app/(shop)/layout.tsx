import { Footer, Sidebar, TopMenu } from "@/components";

// snippet para crear un layout: "lrc"
export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">
        {children}
      </div>
      <Footer />
    </main>

  );
}