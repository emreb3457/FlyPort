import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react';
import Home from './pages/Home';
import BreadCrums from './components/Breadcrums/BreadCrums';
import ListMenu from './components/ListMenu/ListMenu';
import DemandSummary from './pages/DemandSummary';
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ListMenu>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/a" element={<DemandSummary />} exact />
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
