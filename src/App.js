import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import EmployeeForm from './components/form/EmployeeForm';
import EmployeeDetails from './components/details/EmployeeDetails';
import Signup from './components/signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/employee-form' element={<EmployeeForm />} />
        <Route path='/employee-form/:id' element={<EmployeeForm />} />
        <Route path='/employee-details/:id' element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
