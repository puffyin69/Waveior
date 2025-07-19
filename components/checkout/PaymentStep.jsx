"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PaymentStep = ({ paymentInfo, handlePaymentChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nameOnCard" className="text-gray-300">Name on Card</Label>
        <Input
          id="nameOnCard"
          value={paymentInfo.nameOnCard}
          onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
          placeholder="John Doe"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <div>
        <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
        <Input
          id="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
          <Input
            id="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
          <Input
            id="cvv"
            value={paymentInfo.cvv}
            onChange={(e) => handlePaymentChange('cvv', e.target.value)}
            placeholder="123"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
