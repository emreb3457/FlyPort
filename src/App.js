import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react';
import Home from './pages/Home';
import BreadCrums from './components/Breadcrums/BreadCrums';
import DemandSummary from './pages/DemandSummary';
import ProductList from './pages/ProductList';
import ListMenu from './components/Talepler/ListMenu/ListMenu';
import ProductDetail from './pages/ProductDetail';
import PriceSurveys from './components/Talepler/ProductDetailPage/Tasks/PriceSurveys';
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
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
