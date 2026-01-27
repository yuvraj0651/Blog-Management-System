import { lazy, Suspense, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import BlogPage from './components/Pages/BlogPage'
import Account from './components/Pages/Account/Account'
import AuthProvider from './components/context/auth/AuthProvider';
import ErrorBoundary from './components/Class Components/ErrorBounsary'
const BlogDetailPage = lazy(() => import("./components/Pages/BlogDetail/BlogDetail"));
import { useSelector } from 'react-redux'
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import UserProfile from './components/Pages/User Profile/UserProfile'
import UserAdmin from './components/Pages/User Admin/UserAdmin'

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const { blogData } = useSelector((state) => state.blog);

  const filteredBlogData = useMemo(() => {
    return searchTerm
      ? blogData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : blogData;
  }, [searchTerm, blogData]);

  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          {/* Header Component */}
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {/* Blog Page */}
          <main className="main-section">
            <Suspense fallback={<p className='text-center min-h-screen flex items-center justify-center h-full tracking-wide capitalize'>Loading page....</p>}>
              <Routes>
                <Route path="/" element={<Navigate to="/blog" replace />} />
                <Route path="/blog" element={<BlogPage filteredBlogData={filteredBlogData} />} />
                <Route path="/account" element={<Account />} />
                <Route path="/blog/:id" element={
                  <ProtectedRoutes>
                    <BlogDetailPage />
                  </ProtectedRoutes>
                } />
                <Route path="/profile" element={
                  <ProtectedRoutes>
                    <UserProfile />
                  </ProtectedRoutes>
                } />
                <Route path="/admin" element={
                  <ProtectedRoutes>
                    <UserAdmin />
                  </ProtectedRoutes>
                } />
              </Routes>
            </Suspense>
          </main>
          {/* Footer Component */}
          <Footer />
        </AuthProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
