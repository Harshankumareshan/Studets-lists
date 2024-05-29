import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import StudentsList from './Components/StudentsList';




function App() {
  

  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentslist" element={<StudentsList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
