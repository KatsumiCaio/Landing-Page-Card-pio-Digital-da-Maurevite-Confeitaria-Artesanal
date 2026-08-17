import React, { useState, useEffect } from 'react';
import { ProductItem, OrderItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoShowcase } from './components/BentoShowcase';
import { MenuSection } from './components/MenuSection';
import { CraftsmanshipManifesto } from './components/CraftsmanshipManifesto';
import { HowToOrder } from './components/HowToOrder';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { OrderDrawer } from './components/OrderDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'bolos' | 'cones' | 'fatias' | 'doces'>('todos');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProduct(null);
        setIsOrderDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddToCart = (product: ProductItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Provide visual feedback
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBentoCategory = (category: 'todos' | 'bolos' | 'cones' | 'fatias' | 'doces') => {
    setSelectedCategory(category);
    handleExploreMenu();
  };

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAFAF8] text-[#1E2024] flex flex-col font-sans">
      {/* Sticky Header / Navbar */}
      <Navbar
        orderCount={totalOrderCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* First Fold: Editorial Hero */}
        <Hero onExploreMenu={handleExploreMenu} />

        {/* Bento Grid Editorial Showcase */}
        <BentoShowcase onSelectCategory={handleSelectBentoCategory} />

        {/* Interactive Digital Menu Section */}
        <MenuSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenProductModal={(product) => setActiveModalProduct(product)}
          onAddToCart={handleAddToCart}
          addedProductId={addedProductId}
        />

        {/* Craftsmanship Manifesto (3 Pillars) */}
        <CraftsmanshipManifesto />

        {/* How to Order (3 Steps) */}
        <HowToOrder onExploreMenu={handleExploreMenu} />

        {/* Interactive FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer & Location / Instagram */}
      <Footer />

      {/* Floating High-Conversion WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        isAdded={
          activeModalProduct
            ? orderItems.some((item) => item.product.id === activeModalProduct.id)
            : false
        }
      />

      {/* Order Summary / WhatsApp Message Builder Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />
    </div>
  );
}
