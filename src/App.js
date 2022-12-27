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
import Company from './pages/Company/Company';
import CompanyDetail from './pages/Company/CompanyDetail';
import NewCompany from './pages/Company/NewCompany';
import AdressType from './pages/tanimlamalar/AdressType';
import { routes } from './constants/routes';
import AlternativeNewDemand from './pages/AlternativeDemand/AlternativeNewDemandProduct';
import AlternativeDemandList from './pages/AlternativeDemand/AlternativeDemandList';
import AlternativeDetail from './pages/AlternativeDemand/AlternativeDetail';
import UpdateAlternative from './pages/AlternativeDemand/UpdateAlternative';
import PriceResearch from './pages/PriceResearch/PriceResearch';
import NewPriceResearch from './pages/PriceResearch/NewPriceResearch';
import CurrencyType from './pages/tanimlamalar/CurrencyType';
import PriceResearchDetail from './pages/PriceResearch/PriceResearchDetail';
import LogisticsTable from './pages/Logistics/LogisticsTable';
import LogisticsDetail from './pages/Logistics/LogisticsDetail';
import NewLogistics from './pages/Logistics/NewLogistics';
import TransportType from './pages/tanimlamalar/TransportType';
import GtipList from './pages/Gtip/GtipList';
import NewGtip from './pages/Gtip/NewGtip';
import NewCustom from './pages/Customs/NewCustom';
import Customs from './pages/Customs/Customs';
import CustomDetail from './pages/Customs/CustomDetail';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <ListMenu>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/talepler" element={<ProtectedRoute><DemandList/></ProtectedRoute>} exact />
            <Route path="/talepler/yeni" element={<ProtectedRoute><NewDemand/></ProtectedRoute>} exact />
            <Route path="/talepler/:id" element={<ProtectedRoute><DemandSummary/></ProtectedRoute>} exact />

            <Route path="/talepler/alternatifler/yeni" element={<ProtectedRoute><AlternativeNewDemand/></ProtectedRoute>} exact />
            <Route path="/talepler/alternatifler" element={<ProtectedRoute><AlternativeDemandList/></ProtectedRoute>} exact />
            <Route path="/talepler/alternatifler/:id" element={<ProtectedRoute><AlternativeDetail/></ProtectedRoute>} exact />
            <Route path="/talepler/alternatifler/guncelle" element={<ProtectedRoute><UpdateAlternative/></ProtectedRoute>} exact />

            <Route path="/gorevler/:id" element={<ProtectedRoute><>Doldurulacak</></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/fiyatarastirma" element={<ProtectedRoute><PriceResearch/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/fiyatarastirma/:detayId" element={<ProtectedRoute><PriceResearchDetail/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/fiyatarastirma/yeni" element={<ProtectedRoute><NewPriceResearch/></ProtectedRoute>} exact />

            <Route path="/gorevler/:id/lojistik" element={<ProtectedRoute><LogisticsTable/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/lojistik/:detayId" element={<ProtectedRoute><LogisticsDetail/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/lojistik/yeni" element={<ProtectedRoute><NewLogistics/></ProtectedRoute>} exact />

            <Route path="/gorevler/:id/gumrukleme" element={<ProtectedRoute><Customs/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/gumrukleme/yeni" element={<ProtectedRoute><NewCustom/></ProtectedRoute>} exact />
            <Route path="/gorevler/:id/gumrukleme/:detayId" element={<ProtectedRoute><CustomDetail/></ProtectedRoute>} exact />

            <Route path="/firmalar" element={<ProtectedRoute><Company/></ProtectedRoute>} exact />
            <Route path="/firmalar/yeni" element={<ProtectedRoute><NewCompany/></ProtectedRoute>} exact />
            <Route path="/firmalar/:id" element={<ProtectedRoute><CompanyDetail/></ProtectedRoute>} exact />
            
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

            <Route path="/tanimlamalar/gtip" element={<ProtectedRoute><GtipList/></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/gtip/yeni" element={<ProtectedRoute><NewGtip/></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/gtip/:id" element={<ProtectedRoute><NewGtip/></ProtectedRoute>} exact />

            <Route path="/tanimlamalar" element={<ProtectedRoute><CountryList /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/ulkeler" element={<ProtectedRoute><CountryList /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/birimtipi" element={<ProtectedRoute><UnitType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/adrestipi" element={<ProtectedRoute><AdressType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/sehirler" element={<ProtectedRoute><City /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/ilceler" element={<ProtectedRoute><District /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/teslimattipi" element={<ProtectedRoute><DeliveryType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/nitelik" element={<ProtectedRoute><ProductProperty /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/nitelikdeger" element={<ProtectedRoute><ProductPropertyValue /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/genelkategori" element={<ProtectedRoute><PublicCategory /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/altkategori" element={<ProtectedRoute><ChildrenCategory /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/kategori" element={<ProtectedRoute><Category /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/dovizcinsi" element={<ProtectedRoute><CurrencyType /></ProtectedRoute>} exact />
            <Route path="/tanimlamalar/tasimatipi" element={<ProtectedRoute><TransportType /></ProtectedRoute>} exact />
            <Route path='*' element={<div>NOT FOUND</div>} />
          </Routes>
        </ListMenu>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
