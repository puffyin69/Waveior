"use client";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartStep = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="p-4 bg-gray-800 border-gray-700">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{item.name}</h3>
                <div className="flex space-x-2 mt-1">
                  {item.color && <Badge variant="secondary" className="bg-gray-700 text-gray-300">{item.color}</Badge>}
                  {item.size && <Badge variant="secondary" className="bg-gray-700 text-gray-300">{item.size}</Badge>}
                </div>
                <p className="text-lg font-bold text-white mt-2">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center text-white">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CartStep;
