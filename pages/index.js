import React from 'react';
import Head from 'next/head';
import TransactionForm from '../components/TransactionForm';
import BudgetLimitForm from '../components/BudgetLimitForm';
import TransactionWarnings from '../components/TransactionWarnings';
import Reports from '../components/Reports';
import CategoryDetails from '../components/CategoryDetails';
import SavingSuggestions from '../components/SavingSuggestions';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  return (
    <>
      {/* Sayfa başlığı ve meta bilgileri */}
      <Head>
        <title>Kişisel Bütçe Uygulaması</title>
        <meta name="description" content="Gelir ve giderlerinizi kolayca yönetin!" />
      </Head>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Kişisel Bütçe Uygulaması</h1>
          <ThemeToggle />
        </div>

        {/* Tasarruf Önerileri */}
        <SavingSuggestions />

        {/* Uyarılar */}
        <TransactionWarnings />

        {/* Formlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransactionForm />
          <BudgetLimitForm />
        </div>

        {/* Raporlar */}
        <div className="mt-8">
          <Reports />
        </div>

        {/* Kategorilere Ait Detaylar */}
        <div className="mt-8">
          <CategoryDetails />
        </div>
      </div>
    </>
  );
};

export default Home;
