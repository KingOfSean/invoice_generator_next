import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { GlobalFunctionsProvider } from "@/context/GlobalFunctionsContext";
import { AppStateVariablesProvider } from "@/context/AppStateVariablesContext";

export const metadata = {
  title: "Invoice Generator",
  description: "Invoice generator built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalFunctionsProvider>
          <AppStateVariablesProvider>
            <div className="App">
              {children}
            </div>
          </AppStateVariablesProvider>
        </GlobalFunctionsProvider>
      </body>
    </html>
  );
}

