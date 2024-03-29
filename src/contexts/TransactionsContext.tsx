import { createContext, ReactNode, useEffect, useState } from 'react';

interface Transaction {
  [x: string]: ReactNode;
  id: number;
  description: string;
  cliente: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}