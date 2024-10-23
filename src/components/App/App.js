
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import './App.css';
import Layout from '../Layout/Layout';
import FormAsistencia from '../FormAsistencia/FormAsistencia';

function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/asistencia" element={<Layout />} >
          <Route index element={<FormAsistencia />} />
        </Route>

      </Routes>
 
    </div>
  );
}

export default App;
