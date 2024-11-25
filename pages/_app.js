import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { BudgetProvider } from '../context/BudgetContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <BudgetProvider>
        <Component {...pageProps} />
      </BudgetProvider>
    </ThemeProvider>
  );
}
