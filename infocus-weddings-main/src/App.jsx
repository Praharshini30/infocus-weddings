import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import CrewBooking from './pages/CrewBooking';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PortfolioManager from './pages/admin/PortfolioManager';
import CategoryManager from './pages/admin/CategoryManager';
import ServiceManager from './pages/admin/ServiceManager';
import InquiryManager from './pages/admin/InquiryManager';
import BookCrew from './pages/BookCrew';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/crew" element={<PublicLayout><CrewBooking /></PublicLayout>} />
          <Route path="/book-crew" element={<PublicLayout><BookCrew /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="portfolio" element={<PortfolioManager />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="inquiries" element={<InquiryManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}