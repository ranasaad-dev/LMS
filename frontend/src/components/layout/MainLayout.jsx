import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="wrapper-container">
      <MainNavbar />
      <div className="main-layout">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;