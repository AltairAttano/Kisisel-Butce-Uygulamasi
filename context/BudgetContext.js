import React, { createContext, useState, useEffect } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({}); // Her kategori için bütçe limitleri

  // Verileri localStorage'dan yükleme
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const storedLimits = JSON.parse(localStorage.getItem('budgetLimits')) || {};
    setTransactions(storedTransactions);
    setBudgetLimits(storedLimits);
  }, []);

  // Verileri localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
  }, [transactions, budgetLimits]);

  // İşlem ekleme
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Bütçe limiti belirleme
  const setBudgetLimit = (category, limit) => {
    setBudgetLimits((prev) => ({ ...prev, [category]: parseFloat(limit) }));
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        budgetLimits,
        setBudgetLimit,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
