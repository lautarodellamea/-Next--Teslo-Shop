// snippet para crear un layout: "lrc"
export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}