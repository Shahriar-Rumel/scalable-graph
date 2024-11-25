import Router from './routes';
import { ThemeProvider } from './theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
}
