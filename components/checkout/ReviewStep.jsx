"use client";
import { CreditCard } from 'lucide-react';

const ReviewStep = ({ shippingInfo, paymentInfo, cartItems }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2 text-white">Shipping Information</h3>
        <div className="text-sm text-gray-400 space-y-1">
          <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
          <p>{shippingInfo.email}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-white">Payment Method</h3>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">**** **** **** {paymentInfo.cardNumber.slice(-4)}</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-white">Order Items</h3>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-300">{item.name} x {item.quantity}</span>
              <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
