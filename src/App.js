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
import LogisticsAdd from './pages/LogisticsAdd';
import CustomsList from './pages/CustomsList';
import CostomsDetail from './pages/CostomsDetail';
import CostomsAdd from './pages/CostomsAdd';
import CostList from './pages/CustomsList';
import CostAdd from './pages/CostAdd';
import CostDetail from './pages/CostDetail';
import Offers from './pages/Offers';
import OffersDetail from './pages/OffersDetail';
import Offers2 from './pages/Offers2';
import OffersCard from './pages/OffersCard';
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
            <Route path="/:id/:id/urunlistesi/:id/gorevler/lojistik/yenimaliyet" element={<LogisticsAdd />} exact />

            <Route path="/:id/:id/urunlistesi/:id/gorevler/gumrukleme" element={<CustomsList />} exact />
            <Route path="/:id/:id/urunlistesi/:id/gorevler/gumrukleme/yenimaliyet" element={<CostomsAdd />} exact />
            <Route path="/:id/:id/urunlistesi/:id/gorevler/gumrukleme/:id" element={<CostomsDetail />} exact />

            <Route path="/:id/:id/urunlistesi/:id/maliyetler" element={<CostList />} exact />
            <Route path="/:id/:id/urunlistesi/:id/maliyetler/yenimaliyet" element={<CostAdd />} exact />
            <Route path="/:id/:id/urunlistesi/:id/maliyetler/:id" element={<CostDetail />} exact />

            <Route path="/:id/:id/urunlistesi/:id/teklifler" element={<Offers />} exact />
            <Route path="/:id/:id/urunlistesi/:id/teklifler/yenimaliyet" element={<CostAdd />} exact />
            <Route path="/:id/:id/urunlistesi/:id/teklifler/:id" element={<OffersDetail />} exact />

            <Route path="/siparisler" element={<Offers2 />} exact />
            <Route path="/siparisler/:id" element={<OffersCard />} exact />
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
