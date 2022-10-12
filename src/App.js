import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react';
import ProtectedRoute from "./utils/ProtectedRoute"
import Home from './pages/Home';
import DemandSummary from './pages/Demand/DemandSummary';
// import ProductList from './pages/ProductList';
import ProductList from './pages/Products/ProductList';
import NewProduct from './pages/Products/NewProduct';
import ListMenu from './components/Talepler/ListMenu/ListMenu';
import ProductDetail from './pages/Products/ProductDetail';
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
import DemandList from './pages/Demand/DemandList';
import CountryList from './pages/tanimlamalar/Country';
import UnitType from './pages/tanimlamalar/UnitType';
import City from './pages/tanimlamalar/City';
import District from './pages/tanimlamalar/District';
import NewDemand from './pages/Demand/NewDemand';
import DeliveryType from './pages/tanimlamalar/DeliveryType';
import ProductProperty from './pages/tanimlamalar/ProductProperty';
import ProductPropertyValue from './pages/tanimlamalar/ProductPropertyValue';
import ChildrenCategory from './pages/tanimlamalar/ChildrenCategory';
import Category from './pages/tanimlamalar/Category';
import PublicCategory from './pages/tanimlamalar/PublicCategory';
import UpdateProduct from './pages/Products/UpdateProduct';
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ListMenu>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/talepler" element={<ProtectedRoute><DemandList/></ProtectedRoute>} exact />
            <Route path="/talepler/yeni" element={<ProtectedRoute><NewDemand/></ProtectedRoute>} exact />

            <Route path="/urunler" element={<ProtectedRoute><ProductList/></ProtectedRoute>} exact />
            <Route path="/urunler/yeni" element={<ProtectedRoute><NewProduct/></ProtectedRoute>} exact />
            <Route path="/urunler/guncelle" element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>} exact />
            <Route path="/urunler/:id" element={<ProtectedRoute><ProductDetail/></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi" element={<ProtectedRoute><ProductList /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/fiyatarastirmalari" element={<ProtectedRoute><PriceSurveys /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/fiyatarastirmalari/:id" element={<ProtectedRoute><PriceSurveysDetail /></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/lojistik" element={<ProtectedRoute><Logistics /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/lojistik/yenimaliyet" element={<ProtectedRoute><LogisticsAdd /></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/gumrukleme" element={<ProtectedRoute><CustomsList /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/gumrukleme/yenimaliyet" element={<ProtectedRoute><CostomsAdd /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/gorevler/gumrukleme/:id" element={<ProtectedRoute><CostomsDetail /></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi/:id/maliyetler" element={<ProtectedRoute><CostList /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/maliyetler/yenimaliyet" element={<ProtectedRoute><CostAdd /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/maliyetler/:id" element={<ProtectedRoute><CostDetail /></ProtectedRoute>} exact />

            <Route path="/:id/:id/:id/urunlistesi/:id/teklifler" element={<ProtectedRoute><Offers /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/teklifler/yenimaliyet" element={<ProtectedRoute><CostAdd /></ProtectedRoute>} exact />
            <Route path="/:id/:id/:id/urunlistesi/:id/teklifler/:id" element={<ProtectedRoute><OffersDetail /></ProtectedRoute>} exact />

            <Route path="/siparisler" element={<ProtectedRoute><Offers2 /></ProtectedRoute>} exact />
            <Route path="/siparisler/:id" element={<ProtectedRoute><OffersCard /></ProtectedRoute>} exact />

            <Route path="/tanimlamalar/ulkeler" element={<ProtectedRoute><CountryList /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/birimtipi" element={<ProtectedRoute><UnitType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/sehirler" element={<ProtectedRoute><City /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/ilceler" element={<ProtectedRoute><District /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/tasimatipi" element={<ProtectedRoute><DeliveryType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/nitelik" element={<ProtectedRoute><ProductProperty /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/nitelikdeger" element={<ProtectedRoute><ProductPropertyValue /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/genelkategori" element={<ProtectedRoute><PublicCategory /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/altkategori" element={<ProtectedRoute><ChildrenCategory /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/kategori" element={<ProtectedRoute><Category /></ProtectedRoute>} exact />
            <Route path='*' element={<div>NOT FOUND</div>} />
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
