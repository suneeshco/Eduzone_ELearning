// // App.tsx

// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import StudentPage from './Pages/studentPage.tsx';


// const App: React.FC = () => {
//   return (
//     <Router>
//       <div>
//         <h1>My App</h1>
//           <Route path="/" element={<StudentPage/>} />
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.tsx

import React from 'react';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Routes} from 'react-router-dom'
import StudentPage from './Pages/StudentPage';

const appRouter=createBrowserRouter(
 
  createRoutesFromElements(
    <>
    <Routes>
       <Route path='/' element={<StudentPage/>}/>
    </Routes>
    
      
    
    
    </>

  )
)

export default appRouter

