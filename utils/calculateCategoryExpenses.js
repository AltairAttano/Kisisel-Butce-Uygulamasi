export const calculateCategoryExpenses = (transactions) => {
    const categoryExpenses = {};
  
    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        categoryExpenses[transaction.category] =
          (categoryExpenses[transaction.category] || 0) + transaction.amount;
      }
    });
  
    return categoryExpenses;
  };
  