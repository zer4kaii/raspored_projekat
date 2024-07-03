import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import SveUcionice from './pages/SveUcionice';
import TrazenjePoTerminu from './pages/TrazenjePoTerminu';
import TrazenjePoUcionici from './pages/TrazenjePoUcionici';
import MojeAktivnosti from './pages/MojeAktivnosti';

const ROLES = {
  'User': "USER",
  'Admin': "ADMIN"
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/sve-ucionice" element={<SveUcionice />} />
          <Route path="/trazenje-po-terminu" element={<TrazenjePoTerminu />} />
          <Route path="/trazenje-po-ucionici" element={<TrazenjePoUcionici />} />
          <Route path="/moje-aktivnosti" element={<MojeAktivnosti />} />
        </Route>



        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;