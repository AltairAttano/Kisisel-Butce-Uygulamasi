import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { generateSavingSuggestions } from '../utils/savingSuggestions';

const SavingSuggestions = () => {
  const { transactions, budgetLimits } = useContext(BudgetContext);
  const suggestions = generateSavingSuggestions(transactions, budgetLimits);

  <div className="p-4 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 rounded-md mb-6">
  <h2 className="text-lg font-bold mb-2 dark:text-gray-200">Tasarruf Önerileri</h2>
  {/* Öneriler */}
  </div>


  return (
    <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-md mb-6">
      <h2 className="text-lg font-bold mb-2">Tasarruf Önerileri</h2>
      {suggestions.length === 0 ? (
        <p>Henüz herhangi bir tasarruf önerisi bulunmamaktadır.</p>
      ) : (
        <ul className="list-disc pl-5">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="mb-2">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavingSuggestions;
