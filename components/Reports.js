import React, { useContext } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { BudgetContext } from '../context/BudgetContext';
import { format } from 'date-fns';
import PDFDownloadButton from './PDFDownloadButton';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
const Reports = () => {
  const { transactions } = useContext(BudgetContext);

  // Aylık Gelir ve Gider Toplamları
  const calculateMonthlyTotals = () => {
    const income = {};
    const expenses = {};

    transactions.forEach((transaction) => {
      const month = format(new Date(transaction.date), 'yyyy-MM');

      if (transaction.type === 'income') {
        income[month] = (income[month] || 0) + transaction.amount;
      } else if (transaction.type === 'expense') {
        expenses[month] = (expenses[month] || 0) + transaction.amount;
      }
    });

    return { income, expenses };
  };

  const { income, expenses } = calculateMonthlyTotals();

  const monthlyLabels = Array.from(
    new Set([...Object.keys(income), ...Object.keys(expenses)])
  ).sort();

  const monthlyData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Gelir',
        data: monthlyLabels.map((month) => income[month] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gider',
        data: monthlyLabels.map((month) => expenses[month] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Kategori Bazında Harcamalar
  const calculateCategoryExpenses = () => {
    const categories = {};

    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        categories[transaction.category] =
          (categories[transaction.category] || 0) + transaction.amount;
      }
    });

    return categories;
  };

  const categoryExpenses = calculateCategoryExpenses();

  const categoryData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        label: 'Kategori Harcamaları',
        data: Object.values(categoryExpenses),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Raporlama ve Analiz</h2>

      {/* PDF İçeriği */}
      <div id="reportContent">
        <div className="mb-6">
          <h3 className="font-bold mb-2">Aylık Gelir-Gider Karşılaştırması</h3>
          <Bar data={monthlyData} />
        </div>

        <div>
          <h3 className="font-bold mb-2">Kategori Bazında Harcamalar</h3>
          <Pie data={categoryData} />
        </div>
      </div>

      {/* PDF İndirme Düğmesi */}
      <div className="mt-4">
        <PDFDownloadButton elementId="reportContent" filename="Finansal_Rapor.pdf" />
      </div>
    </div>
  );
};

export default Reports;
