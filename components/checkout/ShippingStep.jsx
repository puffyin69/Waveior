"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ShippingStep = ({ shippingInfo, handleShippingChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
          <Input
            id="firstName"
            value={shippingInfo.firstName}
            onChange={(e) => handleShippingChange('firstName', e.target.value)}
            placeholder="John"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
          <Input
            id="lastName"
            value={shippingInfo.lastName}
            onChange={(e) => handleShippingChange('lastName', e.target.value)}
            placeholder="Doe"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-300">Email</Label>
        <Input
          id="email"
          type="email"
          value={shippingInfo.email}
          onChange={(e) => handleShippingChange('email', e.target.value)}
          placeholder="john.doe@example.com"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <div>
        <Label htmlFor="address" className="text-gray-300">Address</Label>
        <Input
          id="address"
          value={shippingInfo.address}
          onChange={(e) => handleShippingChange('address', e.target.value)}
          placeholder="123 Main Street"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-gray-300">City</Label>
          <Input
            id="city"
            value={shippingInfo.city}
            onChange={(e) => handleShippingChange('city', e.target.value)}
            placeholder="New York"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-gray-300">State</Label>
          <Select onValueChange={(value) => handleShippingChange('state', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ny" className="text-white hover:bg-gray-700">New York</SelectItem>
              <SelectItem value="ca" className="text-white hover:bg-gray-700">California</SelectItem>
              <SelectItem value="tx" className="text-white hover:bg-gray-700">Texas</SelectItem>
              <SelectItem value="fl" className="text-white hover:bg-gray-700">Florida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode" className="text-gray-300">ZIP Code</Label>
          <Input
            id="zipCode"
            value={shippingInfo.zipCode}
            onChange={(e) => handleShippingChange('zipCode', e.target.value)}
            placeholder="10001"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="country" className="text-gray-300">Country</Label>
          <Select onValueChange={(value) => handleShippingChange('country', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="us" className="text-white hover:bg-gray-700">United States</SelectItem>
              <SelectItem value="ca" className="text-white hover:bg-gray-700">Canada</SelectItem>
              <SelectItem value="uk" className="text-white hover:bg-gray-700">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ShippingStep;
