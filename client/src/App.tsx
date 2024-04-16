
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Toaster } from "react-hot-toast";
import NotFound from './Components/CommonComponents/PageNotFound/NotFound';
import StudentRoutes from './Routes/StudentRoutes';
import InstructorRoutes from './Routes/InstructorRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import StudentErrorBoundary from './Components/CommonComponents/ErrorBoundary/StudentErrorBoundary';
import InstructorErrorBoundary from './Components/CommonComponents/ErrorBoundary/InstructorErrorBoundary';
import AdminErrorBoundary from './Components/CommonComponents/ErrorBoundary/AdminErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/*" element={<StudentErrorBoundary><StudentRoutes /></StudentErrorBoundary>} />
        <Route path="/instructor/*" element={<InstructorErrorBoundary><InstructorRoutes /></InstructorErrorBoundary>} />
        <Route path="/admin/*" element={<AdminErrorBoundary><AdminRoutes /></AdminErrorBoundary>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;