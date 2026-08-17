import React, { useState, useEffect } from 'react';
import { ProductItem, OrderItem } from './types';
import { PRODUCTS_DATA } from './data/products';
import { observability } from './lib/observability';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoShowcase } from './components/BentoShowcase';
import { MenuSection } from './components/MenuSection';
import { SeasonalKits } from './components/SeasonalKits';
import { CraftsmanshipManifesto } from './components/CraftsmanshipManifesto';
import { CakeCalculator } from './components/CakeCalculator';
import { HowToOrder } from './components/HowToOrder';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { OrderDrawer } from './components/OrderDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastFeedback } from './components/ToastFeedback';
import { LegalModal } from './components/LegalModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'bolos' | 'cones' | 'fatias' | 'doces'>('todos');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [toastProduct, setToastProduct] = useState<ProductItem | null>(null);

  // Initialize observability and telemetry on mount
  useEffect(() => {
    observability.init();
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProduct(null);
        setIsOrderDrawerOpen(false);
        setIsLegalModalOpen(false);
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
    setToastProduct(product);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);

    setTimeout(() => {
      setToastProduct((current) => (current?.id === product.id ? null : current));
    }, 3800);
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

  const handleSelectProductForOrder = (productId: string) => {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (product) {
      handleAddToCart(product);
      setIsOrderDrawerOpen(true);
    }
  };

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAFAF8] text-[#1E2024] flex flex-col font-sans selection:bg-[#C49A6C]/30">
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

          {/* Seasonal & Curated Gift Kits with Decorative Micro-Badges */}
          <SeasonalKits
            onAddToCart={handleAddToCart}
            addedProductId={addedProductId}
          />

          {/* Interactive Cake Yield Calculator */}
          <CakeCalculator onSelectProductForOrder={handleSelectProductForOrder} />

          {/* Craftsmanship Manifesto (3 Pillars) */}
          <CraftsmanshipManifesto />

          {/* How to Order (3 Steps) */}
          <HowToOrder onExploreMenu={handleExploreMenu} />

          {/* Interactive FAQ Section */}
          <FaqSection />
        </main>

        {/* Footer & Location / Instagram */}
        <Footer onOpenLegalModal={() => setIsLegalModalOpen(true)} />

        {/* Floating High-Conversion WhatsApp Action */}
        <FloatingWhatsApp />

        {/* Toast Feedback on Add to Bag */}
        <ToastFeedback
          product={toastProduct}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onDismiss={() => setToastProduct(null)}
        />

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

        {/* Legal Terms & Privacy Modal */}
        <LegalModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
