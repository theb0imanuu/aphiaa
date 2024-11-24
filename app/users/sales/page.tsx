'use client';

import { useState } from 'react';

// Define the types for drug and cart items
interface Drug {
  id: number;
  name: string;
  price: number;
  quantity?: number; // Optional, because quantity is added to cart separately
}

interface CartItem extends Drug {
  totalPrice: number;
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [drugs, setDrugs] = useState<Drug[]>([]); // Type for drugs
  const [cart, setCart] = useState<CartItem[]>([]); // Type for cart items
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Handle search for drugs
  const handleSearch = async () => {
    const response = await fetch(`/api/searchDrug?name=${searchTerm}`);
    const result = await response.json();
    setDrugs(result); // Assuming result is an array of Drug objects
  };

  // Add drug to cart
  const addToCart = (drug: Drug, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...drug, quantity, totalPrice: drug.price * quantity }];
      const updatedTotalPrice = updatedCart.reduce((total, item) => total + item.totalPrice, 0);
      setTotalPrice(updatedTotalPrice);
      return updatedCart;
    });
  };

  // Update drug quantity in cart
  const updateQuantity = (drugId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === drugId ? { ...item, quantity, totalPrice: item.price * quantity } : item
      );
      const updatedTotalPrice = updatedCart.reduce((total, item) => total + item.totalPrice, 0);
      setTotalPrice(updatedTotalPrice);
      return updatedCart;
    });
  };

  // Finalize sale
  const finalizeSale = async () => {
    if (window.confirm('Are you sure you want to finalize the sale?')) {
      const response = await fetch('/api/finalizeSale', {
        method: 'POST',
        body: JSON.stringify({
          cart,
          paymentMethod,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        alert('Sale finalized successfully!');
        setCart([]);
        setTotalPrice(0);
      } else {
        alert('Error finalizing sale');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sales</h1>
      <div className="mt-6">
        {/* Search Form */}
        <div className="mb-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded mr-2"
            placeholder="Search for a drug"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        <div className="bg-white shadow-md p-4 rounded-md">
          {drugs.length > 0 && (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Drug Name</th>
                  <th className="border px-4 py-2">Price (KES)</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Add to Cart</th>
                </tr>
              </thead>
              <tbody>
                {drugs.map((drug) => (
                  <tr key={drug.id}>
                    <td className="border px-4 py-2">{drug.name}</td>
                    <td className="border px-4 py-2">{drug.price} KES</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={drug.quantity || 1}
                        onChange={(e) => updateQuantity(drug.id, parseInt(e.target.value))}
                        className="border p-2"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => addToCart(drug, drug.quantity || 1)}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div className="mt-6 bg-white shadow-md p-4 rounded-md">
            <h3 className="font-semibold">Cart</h3>
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Drug Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Total Price (KES)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.totalPrice} KES</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-lg font-semibold">
              Total: {totalPrice} KES
            </div>

            {/* Payment Method Dropdown */}
            <div className="mt-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 border p-2 w-full rounded"
              >
                <option value="">Select Payment Method</option>
                <option value="mpesa">Mpesa</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>

            {/* Finalize Sale Button */}
            <button
              onClick={finalizeSale}
              className="mt-6 bg-red-500 text-white p-2 rounded"
            >
              Finalize Sale
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
