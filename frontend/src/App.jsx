import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminArticles from './pages/AdminArticles.jsx';
import AdminNewArticle from './pages/AdminNewArticle.jsx';
import AdminComments from './pages/AdminComments.jsx';
import Weather from './pages/Weather.jsx';
import Markets from './pages/Markets.jsx';
import Puzzles from './pages/Puzzles.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/puzzles" element={<Puzzles />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminNewArticle />} />
          <Route path="/admin/comments" element={<AdminComments />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
