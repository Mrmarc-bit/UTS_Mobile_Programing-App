import { Plus, TrendingDown, Wallet } from 'lucide-react';
import { Transaction } from '../App';

interface DashboardProps {
  balance: number;
  transactions: Transaction[];
  onAddMoney: () => void;
  onSpend: () => void;
}

export default function Dashboard({ balance, transactions, onAddMoney, onSpend }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hari ini';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin';
    } else {
      return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date);
    }
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Balance</p>
          <h1 className="text-gray-900 mt-1">{formatCurrency(balance)}</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-yellow-600" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl p-6 shadow-lg shadow-orange-100/50 border border-orange-100/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Saldo Tersedia</p>
            <h2 className="text-gray-900 mt-1">{formatCurrency(balance)}</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
            💳
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onAddMoney}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl py-4 px-4 flex items-center justify-center gap-2 transition-all shadow-md shadow-yellow-400/30"
          >
            <Plus className="w-5 h-5" />
            <span>Add Money</span>
          </button>
          <button 
            onClick={onSpend}
            className="bg-white hover:bg-gray-50 text-gray-900 rounded-2xl py-4 px-4 flex items-center justify-center gap-2 transition-all border border-gray-200 shadow-sm"
          >
            <TrendingDown className="w-5 h-5" />
            <span>Spend</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Transaksi Terbaru</h3>
          <button className="text-sm text-yellow-600 hover:text-yellow-700">Lihat Semua</button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
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
              <div className={`${transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount).replace('Rp', 'Rp ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
