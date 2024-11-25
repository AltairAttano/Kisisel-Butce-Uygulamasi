export const generateSavingSuggestions = (transactions, budgetLimits) => {
    const suggestions = [];
  
    // Kategori bazında harcamaları hesapla
    const categoryExpenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      }
      return acc;
    }, {});
  
    // Harcama limitlerine göre öneriler
    Object.keys(budgetLimits).forEach((category) => {
      const limit = budgetLimits[category];
      const spent = categoryExpenses[category] || 0;
  
      if (spent > limit) {
        suggestions.push(
          `${category} kategorisindeki harcamalarınız bütçeyi aştı. Daha az harcayarak ${spent - limit} TL tasarruf edebilirsiniz.`
        );
      } else if (spent >= 0.8 * limit) {
        suggestions.push(
          `${category} kategorisindeki harcamalarınız bütçenize yaklaşıyor. Harcamalarınızı kontrol ederek ${limit - spent} TL tasarruf sağlayabilirsiniz.`
        );
      }
    });
  
    // Toplam harcamalara dayalı genel öneriler
    const totalIncome = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    if (totalExpenses > totalIncome) {
      suggestions.push(
        `Toplam harcamalarınız (${totalExpenses} TL), toplam gelirinizden (${totalIncome} TL) fazla. Harcamalarınızı gözden geçirin.`
      );
    }
  
    return suggestions;
  };
  