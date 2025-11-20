import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: 'food' | 'transport' | 'bill' | 'shopping' | 'salary' | 'other';
  type: 'income' | 'expense';
  date: Date;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'add' | 'list' | 'profile'>('home');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      name: 'Salary',
      amount: 2500000,
      category: 'salary',
      type: 'income',
      date: new Date(2025, 10, 18)
    },
    {
      id: '2',
      name: 'Gojek Ride',
      amount: 18000,
      category: 'transport',
      type: 'expense',
      date: new Date(2025, 10, 19)
    },
    {
      id: '3',
      name: 'Alfamart',
      amount: 52000,
      category: 'shopping',
      type: 'expense',
      date: new Date(2025, 10, 19)
    },
    {
      id: '4',
      name: 'Warteg Sederhana',
      amount: 25000,
      category: 'food',
      type: 'expense',
      date: new Date(2025, 10, 20)
    },
    {
      id: '5',
      name: 'PLN Token',
      amount: 100000,
      category: 'bill',
      type: 'expense',
      date: new Date(2025, 10, 20)
    }
  ]);

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date()
    };
    setTransactions([newTransaction, ...transactions]);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="mx-auto max-w-md min-h-screen bg-white/50 backdrop-blur-sm relative pb-20">
        {currentScreen === 'home' && (
          <Dashboard 
            balance={balance} 
            transactions={transactions.slice(0, 5)} 
            onAddMoney={() => setCurrentScreen('add')}
            onSpend={() => setCurrentScreen('add')}
          />
        )}
        {currentScreen === 'add' && (
          <AddTransaction 
            onCancel={() => setCurrentScreen('home')}
            onAddTransaction={addTransaction}
          />
        )}
        {currentScreen === 'list' && (
          <TransactionList transactions={transactions} />
        )}
        {currentScreen === 'profile' && (
          <Profile />
        )}
        
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    </div>
  );
}
