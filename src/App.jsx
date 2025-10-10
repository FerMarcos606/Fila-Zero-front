import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideHeaderAndFooter = location.pathname === "/";

  return (
    // header and footer not in first page
    <div className="page-wrapper">
      {!hideHeaderAndFooter && <Header />} 
      <main className="main-content">
        <AppRoutes />
      </main>
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
}
export default App