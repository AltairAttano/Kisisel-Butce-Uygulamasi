import React, { useContext, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { calculateCategoryExpenses } from '../utils/calculateCategoryExpenses';

const CategoryDetails = () => {
  const { transactions } = useContext(BudgetContext);
  const categoryExpenses = calculateCategoryExpenses(transactions);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Kategori Bazında Harcamalar</h2>
      <ul>
        {Object.keys(categoryExpenses).map((category) => (
          <li key={category} className="mb-4">
            <button
              className="w-full text-left bg-gray-100 p-2 rounded-md font-bold hover:bg-gray-200"
              onClick={() => handleCategoryClick(category)}
            >
              {category}: {categoryExpenses[category].toFixed(2)} TL
            </button>
            {selectedCategory === category && (
              <ul className="ml-4 mt-2">
                {transactions
                  .filter(
                    (transaction) =>
                      transaction.category === category &&
                      transaction.type === 'expense'
                  )
                  .map((transaction, index) => (
                    <li key={index} className="p-2 border-b last:border-b-0">
                      <span className="block font-semibold">
                        {transaction.description || 'Açıklama Yok'}
                      </span>
                      <span className="text-gray-600 text-sm">
                        Tarih: {transaction.date}, Tutar: {transaction.amount} TL
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetails;