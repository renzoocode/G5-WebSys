import ProductsGrid from "@/components/products/ProductsGrid";
import "./globals.css";

export default function Home() {
  return (
    <div
      className="
        font-sans
        min-h-screen
        grid
        grid-rows-[auto_1fr_auto]
        items-center
        justify-items-center
        gap-5
        p-8
        sm:p-20
        pb-20
        mx-auto
        overflow-y-auto
        text-center
        relative
        text-gray-100
      "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <ProductsGrid />
      </div>
    </div>
  );
}
