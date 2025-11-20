import { useState } from 'react';
import { ArrowLeft, Delete } from 'lucide-react';

interface AddTransactionProps {
  onCancel: () => void;
  onAddTransaction: (transaction: {
    name: string;
    amount: number;
    category: 'food' | 'transport' | 'bill' | 'shopping' | 'salary' | 'other';
    type: 'income' | 'expense';
  }) => void;
}

export default function AddTransaction({ onCancel, onAddTransaction }: AddTransactionProps) {
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState<'food' | 'transport' | 'bill' | 'shopping' | 'salary' | 'other'>('food');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

  const categories = [
    { id: 'food' as const, name: 'Food', icon: '🍔', color: 'from-orange-50 to-yellow-50' },
    { id: 'transport' as const, name: 'Transport', icon: '🚗', color: 'from-blue-50 to-cyan-50' },
    { id: 'bill' as const, name: 'Bill', icon: '📄', color: 'from-purple-50 to-pink-50' },
    { id: 'shopping' as const, name: 'Shopping', icon: '🛒', color: 'from-green-50 to-emerald-50' },
    { id: 'salary' as const, name: 'Salary', icon: '💰', color: 'from-yellow-50 to-amber-50' },
    { id: 'other' as const, name: 'Other', icon: '📦', color: 'from-gray-50 to-slate-50' }
  ];

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDelete = () => {
    if (amount.length === 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const formatDisplayAmount = (value: string) => {
    const number = parseInt(value) || 0;
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handleContinue = () => {
    const numAmount = parseInt(amount) || 0;
    if (numAmount > 0) {
      const categoryNames: Record<string, string> = {
        food: 'Makanan',
        transport: 'Transportasi',
        bill: 'Tagihan',
        shopping: 'Belanja',
        salary: 'Gaji',
        other: 'Lainnya'
      };
      
      onAddTransaction({
        name: categoryNames[selectedCategory],
        amount: numAmount,
        category: selectedCategory,
        type: transactionType
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={onCancel} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-all">
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-gray-900">Add Transaction</h2>
        <div className="w-10" />
      </div>

      {/* Type Toggle */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-1 flex gap-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setTransactionType('expense')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              transactionType === 'expense'
                ? 'bg-yellow-400 text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pengeluaran
          </button>
          <button
            onClick={() => setTransactionType('income')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              transactionType === 'income'
                ? 'bg-yellow-400 text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pemasukan
          </button>
        </div>
      </div>

      {/* Amount Display */}
      <div className="px-6 mb-8">
        <p className="text-sm text-gray-500 mb-2">Nominal</p>
        <div className="text-gray-900 text-center">
          Rp {formatDisplayAmount(amount)}
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-8">
        <p className="text-sm text-gray-500 mb-3">Kategori</p>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 shadow-lg shadow-yellow-400/30 scale-105'
                  : `bg-gradient-to-br ${category.color} border border-gray-200 hover:scale-105`
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className={`text-sm ${selectedCategory === category.id ? 'text-gray-900' : 'text-gray-600'}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Keypad */}
      <div className="mt-auto px-6 pb-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="aspect-square rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-yellow-100 hover:to-orange-100 text-gray-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-orange-100/50"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleDelete}
              className="aspect-square rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-red-100/50"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleContinue}
            disabled={amount === '0'}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-gray-900 rounded-2xl py-4 transition-all shadow-md shadow-yellow-400/30 disabled:shadow-none"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
