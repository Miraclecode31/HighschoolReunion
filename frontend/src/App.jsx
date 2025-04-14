import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/Home'));
const SchoolList = React.lazy(() => import('./components/SchoolList'));
const SchoolPage = React.lazy(() => import('./components/schoolPage'));
const CommentBox = React.lazy(() => import('./components/commentBox'));
import Sidebar from './components/Sidebar'; 

const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const showSidebar = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {showSidebar && <Sidebar />}
      <main className="p-8 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schools" element={<SchoolList />} />
          <Route path="/schools/:schoolId" element={<SchoolPage />} />
          <Route path="/schools/:schoolId/comments" element={<CommentBox />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Router>
      <AppRoutes />
    </Router>
  </Suspense>
);

export default App;
