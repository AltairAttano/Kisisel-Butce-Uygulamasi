import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

const TransactionWarnings = () => {
  const { transactions, budgetLimits } = useContext(BudgetContext);

  // Kategori bazında harcamaları hesapla
  const calculateSpendingByCategory = () => {
    const spending = {};
    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        spending[transaction.category] =
          (spending[transaction.category] || 0) + transaction.amount;
      }
    });
    return spending;
  };

  const spendingByCategory = calculateSpendingByCategory();

  // Uyarı oluştur
  const warnings = Object.keys(budgetLimits).map((category) => {
    const limit = budgetLimits[category];
    const spent = spendingByCategory[category] || 0;
    const percentage = (spent / limit) * 100;

    if (percentage >= 80 && percentage < 100) {
      return `Uyarı: ${category} kategorisinde harcamalar limitin %80'ine ulaştı (${spent} TL / ${limit} TL).`;
    }
    if (percentage >= 100) {
      return `Dikkat! ${category} kategorisindeki harcamalar limiti aştı (${spent} TL / ${limit} TL).`;
    }
    return null;
  });

  return (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 mb-4 rounded">
      <h2 className="font-bold text-lg mb-2">Uyarılar</h2>
      {warnings.filter((warning) => warning !== null).length === 0 ? (
        <p>Henüz herhangi bir uyarı yok.</p>
      ) : (
        <ul>
          {warnings.map(
            (warning, index) =>
              warning && <li key={index} className="mb-2">{warning}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TransactionWarnings;
