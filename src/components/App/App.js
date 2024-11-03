
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import './App.css';
import Layout from '../Layout/Layout';
import FormAsistencia from '../FormAsistencia/FormAsistencia';
import FormAttendance from '../FormAsistencia/FormAttendance';
import Manager from '../Manager/Manager';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="asistencia" element={<Layout />}>
          <Route index element={<FormAttendance />} />
          <Route path="administration" element={<Manager />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
