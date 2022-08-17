import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react';
import Home from './pages/Home';
import DemandSummary from './pages/DemandSummary';
import ProductList from './pages/ProductList';
import ListMenu from './components/Talepler/ListMenu/ListMenu';
import ProductDetail from './pages/ProductDetail';
import PriceSurveys from './pages/PriceSurveys';
import PriceSurveysDetail from './pages/PriceSurveysDetail';
import Logistics from './pages/Logistics';
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ListMenu>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/talepler" element={<DemandSummary />} exact />

            <Route path="/:id/:id/urunlistesi" element={<ProductList />} exact />
            <Route path="/:id/:id/urunlistesi/:id" element={<ProductDetail />} exact />

            <Route path="/:id/:id/urunlistesi/:id/gorevler/fiyatarastirmalari" element={<PriceSurveys />} exact />
            <Route path="/:id/:id/urunlistesi/:id/gorevler/fiyatarastirmalari/:id" element={<PriceSurveysDetail />} exact />
    
            <Route path="/:id/:id/urunlistesi/:id/gorevler/lojistik" element={<Logistics />} exact />
            <Route path="/:id/:id/urunlistesi/:id/gorevler/lojistik/yenimaliyet" element={<Logistics />} exact />
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
