"use client";

import { useState } from "react";
import Link from "next/link";
import { Pill, Search, ShoppingCart, ChevronLeft, Plus, Minus, Trash2 } from "lucide-react";

const medicines = [
  { id: 1, name: "Aspirin 75mg", price: "₹50", prescription: "Required", image: "💊" },
  { id: 2, name: "Atorvastatin 10mg", price: "₹120", prescription: "Required", image: "💊" },
  { id: 3, name: "Paracetamol 500mg", price: "₹30", prescription: "OTC", image: "💊" },
  { id: 4, name: "Vitamin B12", price: "₹80", prescription: "OTC", image: "💊" },
];

export default function OrderMedicinePage() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicines.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.id === medicine.id);
    if (existing) {
      setCart(cart.map(item => item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalAmount = cart.reduce((sum, item) => sum + parseInt(item.price.replace("₹", "")) * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart is empty");
    alert(`Order placed successfully! Total: ₹${totalAmount}. Delivery in 3-5 days.`);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Order Medicine
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Order medicines online</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search medicines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm" />
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {filteredMedicines.map((med) => (
            <div key={med.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="text-4xl mb-2">{med.image}</div>
              <h3 className="font-semibold text-slate-800 text-sm">{med.name}</h3>
              <p className="text-lg font-bold text-[#00A99D]">{med.price}</p>
              <p className={`text-xs ${med.prescription === "Required" ? "text-red-500" : "text-green-500"}`}>{med.prescription}</p>
              <button onClick={() => addToCart(med)} className="w-full mt-3 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#00A99D]" />
              <h3 className="font-semibold text-[#013A63] text-sm">Your Cart ({cart.length} items)</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Total: ₹{totalAmount}</span>
              <button onClick={handlePlaceOrder} className="px-6 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition">
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}