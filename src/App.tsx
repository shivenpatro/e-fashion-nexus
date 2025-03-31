
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/layout/MainLayout";

// Pages
import HomePage from "@/pages/HomePage";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              } />
              <Route path="/products" element={
                <MainLayout>
                  <ProductListingPage />
                </MainLayout>
              } />
              <Route path="/products/:category" element={
                <MainLayout>
                  <ProductListingPage />
                </MainLayout>
              } />
              <Route path="/product/:productId" element={
                <MainLayout>
                  <ProductDetailPage />
                </MainLayout>
              } />
              <Route path="/cart" element={
                <MainLayout>
                  <CartPage />
                </MainLayout>
              } />
              <Route path="/checkout" element={
                <MainLayout>
                  <CheckoutPage />
                </MainLayout>
              } />
              <Route path="/order-confirmation" element={
                <MainLayout>
                  <OrderConfirmationPage />
                </MainLayout>
              } />
              <Route path="/login" element={
                <MainLayout>
                  <LoginPage />
                </MainLayout>
              } />
              <Route path="/register" element={
                <MainLayout>
                  <RegisterPage />
                </MainLayout>
              } />
              <Route path="/profile" element={
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              } />
              <Route path="/profile/orders/:orderId" element={
                <MainLayout>
                  <OrderDetailPage />
                </MainLayout>
              } />
              <Route path="*" element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
