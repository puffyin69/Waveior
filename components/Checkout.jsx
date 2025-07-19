"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CartStep from './checkout/CartStep';
import ShippingStep from './checkout/ShippingStep';
import PaymentStep from './checkout/PaymentStep';
import ReviewStep from './checkout/ReviewStep';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
      color: 'Black',
      size: 'One Size'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
      color: 'Silver',
      size: '42mm'
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [currentStep, setCurrentStep] = useState('cart');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const OrderSummary = () => (
    <Card className="sticky top-4 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className={`${outfit.className} text-white`}>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Shipping</span>
            <span className="text-white">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Tax</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-white">Total</span>
            <span className="text-white">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Free returns within 30 days</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Secure checkout</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[
        { key: 'cart', label: 'Cart' },
        { key: 'shipping', label: 'Shipping' },
        { key: 'payment', label: 'Payment' },
        { key: 'review', label: 'Review' }
      ].map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === step.key 
              ? 'bg-white text-black' 
              : 'bg-gray-800 text-gray-400'
          }`}>
            {index + 1}
          </div>
          <span className={`ml-2 text-sm ${
            currentStep === step.key ? 'text-white font-medium' : 'text-gray-400'
          }`}>
            {step.label}
          </span>
          {index < 3 && <div className="w-8 h-px bg-gray-700 ml-4" />}
        </div>
      ))}
    </div>
  );

  const getStepContent = () => {
    const stepProps = {
      cartItems,
      updateQuantity,
      removeItem,
      shippingInfo,
      handleShippingChange,
      paymentInfo,
      handlePaymentChange
    };

    switch (currentStep) {
      case 'cart':
        return <CartStep {...stepProps} />;
      case 'shipping':
        return <ShippingStep {...stepProps} />;
      case 'payment':
        return <PaymentStep {...stepProps} />;
      case 'review':
        return <ReviewStep {...stepProps} />;
      default:
        return <CartStep {...stepProps} />;
    }
  };

  const getNextStep = () => {
    const steps = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1];
  };

  const getPrevStep = () => {
    const steps = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex - 1];
  };

  return (
    <div className={`min-h-screen bg-black p-4 ${outfit.className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-gray-400">Complete your purchase</p>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {currentStep === 'cart' && 'Shopping Cart'}
                  {currentStep === 'shipping' && 'Shipping Information'}
                  {currentStep === 'payment' && 'Payment Details'}
                  {currentStep === 'review' && 'Review Order'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStepContent()}
                
                <div className="flex justify-between mt-6 pt-6 border-t border-gray-800">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(getPrevStep())}
                    disabled={currentStep === 'cart'}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentStep === 'review') {
                        alert('Order placed successfully!');
                      } else {
                        setCurrentStep(getNextStep());
                      }
                    }}
                    disabled={cartItems.length === 0}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {currentStep === 'review' ? 'Place Order' : 'Continue'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
