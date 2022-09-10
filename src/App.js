import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cities from './pages/Cities';
import City from './pages/City';
import States from './pages/States';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<States />} />
      <Route path="/:state" element={<Cities />} />
      <Route path="/:state/:city" element={<City />} />
    </Routes>
  </>
);

export default App;
