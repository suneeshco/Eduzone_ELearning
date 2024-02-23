// StudentPage.tsx

import React from 'react';
import { Route } from 'react-router-dom';
import StudentHomeScreen from '../Components/Student/Homescreen.tsx'


const StudentPage: React.FC = () => {
  return (
    <div>
      <h2>Student Page</h2>
      <>
        <Route path="/" element={<StudentHomeScreen/>} />
      </>
    </div>
  );
};

export default StudentPage;
