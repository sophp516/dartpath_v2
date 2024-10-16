import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import CourseDetail from './pages/CourseDetail/CourseDetail.tsx';
import './App.css';

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;