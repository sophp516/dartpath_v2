import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import CourseDetail from './pages/CourseDetail/CourseDetail.tsx';
import Community from './pages/Community/Community.tsx';
import SearchResult from './pages/SearchResult/SearchResult.tsx';
import ProfDetail from './pages/ProfDetail/ProfDetail.tsx';
import Profile from './pages/Profile/Profile.tsx';
import './App.css';

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresult/coursedetail" element={<CourseDetail />} />
        <Route path="/searchresult/profdetail" element={<ProfDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;