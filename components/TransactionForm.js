import React, { useState, useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { format } from 'date-fns';

const TransactionForm = () => {
  const { addTransaction } = useContext(BudgetContext);

  <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-md">
  <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Gelir ve Gider Ekle</h2>
  {/* Form içeriği */}
  </div>

  const [formData, setFormData] = useState({
    type: 'income',
    category: '',
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) {
      alert('Tutar ve kategori zorunludur!');
      return;
    }

    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    addTransaction(newTransaction);
    setFormData({
      type: 'income',
      category: '',
      amount: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Gelir ve Gider Ekle</h2>

      {/* Kategori ve Tür */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold mb-1">Tür</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-1">Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Kategori (ör. Gıda, Ulaşım)"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Tutar ve Tarih */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block font-bold mb-1">Tutar</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Tutar"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Tarih</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Açıklama */}
      <div className="mt-4">
        <label className="block font-bold mb-1">Açıklama</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Açıklama"
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full mt-4"
      >
        Ekle
      </button>
    </form>
  );
};

export default TransactionForm;
