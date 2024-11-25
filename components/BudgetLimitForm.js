import React, { useState, useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
const BudgetLimitForm = () => {
  const { setBudgetLimit } = useContext(BudgetContext);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !limit) {
      alert('Kategori ve limit zorunludur!');
      return;
    }

    setBudgetLimit(category, limit);
    setCategory('');
    setLimit('');
    alert('Bütçe limiti başarıyla kaydedildi!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Bütçe Limiti Belirle</h2>

      <div className="mb-3">
        <label className="block font-bold mb-1">Kategori</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori (ör. Gıda, Ulaşım)"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block font-bold mb-1">Limit (TL)</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Limit"
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
      >
        Kaydet
      </button>
    </form>
  );
};

export default BudgetLimitForm;
