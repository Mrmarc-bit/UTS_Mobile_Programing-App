import { useState } from 'react';
import { Transaction } from '../App';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      food: '🍔',
      transport: '🚗',
      bill: '📄',
      shopping: '🛒',
      salary: '💰',
      other: '📦'
    };
    return iconMap[category] || '📦';
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">Semua Transaksi</h2>
        <p className="text-sm text-gray-500">Riwayat transaksi lengkap Anda</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
          <p className="text-sm text-green-700 mb-1">Pemasukan</p>
          <p className="text-green-900">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 border border-red-100">
          <p className="text-sm text-red-700 mb-1">Pengeluaran</p>
          <p className="text-red-900">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-1 flex gap-1 shadow-sm border border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-3 rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-yellow-400 text-gray-900 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`flex-1 py-3 rounded-xl transition-all ${
            filter === 'income'
              ? 'bg-yellow-400 text-gray-900 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pemasukan
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`flex-1 py-3 rounded-xl transition-all ${
            filter === 'expense'
              ? 'bg-yellow-400 text-gray-900 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pengeluaran
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <p className="text-gray-500">Tidak ada transaksi</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
                  <span className="text-xl">{getCategoryIcon(transaction.category)}</span>
                </div>
                <div>
                  <p className="text-gray-900">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                <p className="">
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount).replace('Rp', 'Rp ')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
