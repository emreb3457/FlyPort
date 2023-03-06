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
import NewLogisticsProduct from './pages/Products/Logistics/NewLogistics';
import NewLogisticsProductDetail from './pages/Products/Logistics/LogisticsDetail';
import NewLogisticsProductTable from './pages/Products/Logistics/LogisticsTable';
import TransportType from './pages/tanimlamalar/TransportType';
import GtipList from './pages/Gtip/GtipList';
import NewGtip from './pages/Gtip/NewGtip';
import NewCustom from './pages/Customs/NewCustom';
import Customs from './pages/Customs/Customs';
import CustomDetail from './pages/Customs/CustomDetail';
import OtherCosts from './pages/OtherCosts/OtherCosts';
import OffertList from './pages/Offers/OffertList';
import NewOffer from './pages/Offers/NewOffer';
import ProductOffertList from './pages/Products/Offers/OffertList';
import ProductNewOffer from './pages/Products/Offers/NewOffer';
import ProductCertificates from './pages/Products/ProductCertificates';
import { SideBarIdContextProvider } from './context/SideBarContext';
import ProductPrice from './pages/Products/ProducerCost/ProductPriceNew';
import ProductCustomsDuties from './pages/Products/ProducerCost/ProductCustomsDuties';
import ProductPriceList from './pages/Products/ProducerCost/ProductPriceList';
import NewProductCargo from './pages/Products/ProducerCost/NewProductCargo';
import ProductCargoList from './pages/Products/ProducerCost/ProductCargoList';

const App = () => {
  return (
    <SideBarIdContextProvider>
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

            <Route path="/maliyetler/:id" element={<ProtectedRoute><OtherCosts /></ProtectedRoute>} exact />

            <Route path="/teklif/:id" element={<ProtectedRoute><OffertList /></ProtectedRoute>} exact />
            <Route path="/teklif/:id/yeni" element={<ProtectedRoute><NewOffer /></ProtectedRoute>} exact />

            <Route path="/firmalar" element={<ProtectedRoute><Company/></ProtectedRoute>} exact />
            <Route path="/firmalar/yeni" element={<ProtectedRoute><NewCompany/></ProtectedRoute>} exact />
            <Route path="/firmalar/:id" element={<ProtectedRoute><CompanyDetail/></ProtectedRoute>} exact />
            
            <Route path="/urunler" element={<ProtectedRoute><ProductList/></ProtectedRoute>} exact />
            <Route path="/urunler/yeni" element={<ProtectedRoute><NewProduct/></ProtectedRoute>} exact />
            <Route path="/urunler/guncelle" element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>} exact />
            <Route path="/urun-detay/detay/:id" element={<ProtectedRoute><ProductDetail/></ProtectedRoute>} exact />

            <Route path="/urun-detay/sertifika/:id" element={<ProtectedRoute><ProductCertificates/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id" element={<ProtectedRoute><ProductCustomsDuties/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id/uretici-fiyat" element={<ProtectedRoute><ProductPriceList/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id/uretici-fiyat/yeni" element={<ProtectedRoute><ProductPrice/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id/uretici-fiyat/:detayId" element={<ProtectedRoute><ProductPrice/></ProtectedRoute>} exact />

            <Route path="/urun-detay/urun-maliyet/:id/kargo/yeni" element={<ProtectedRoute><NewProductCargo/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id/kargo/:detayId" element={<ProtectedRoute><NewProductCargo/></ProtectedRoute>} exact />
            <Route path="/urun-detay/urun-maliyet/:id/kargo" element={<ProtectedRoute><ProductCargoList/></ProtectedRoute>} exact />

            <Route path="/urun-detay/lojistik-maliyet/:id/yeni" element={<ProtectedRoute><NewLogisticsProduct/></ProtectedRoute>} exact />
            <Route path="/urun-detay/lojistik-maliyet/:id/detay/:detayId" element={<ProtectedRoute><NewLogisticsProductDetail/></ProtectedRoute>} exact />
            <Route path="/urun-detay/lojistik-maliyet/:id" element={<ProtectedRoute><NewLogisticsProductTable/></ProtectedRoute>} exact />
            
            <Route path="/urun-detay/teklifler/:id/yeni" element={<ProtectedRoute><ProductNewOffer/></ProtectedRoute>} exact />
            <Route path="/urun-detay/teklifler/:id/:detayId" element={<ProtectedRoute><ProductNewOffer/></ProtectedRoute>} exact />
            <Route path="/urun-detay/teklifler/:id" element={<ProtectedRoute><ProductOffertList/></ProtectedRoute>} exact />

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
      </SideBarIdContextProvider>
  );
}

export default App;
