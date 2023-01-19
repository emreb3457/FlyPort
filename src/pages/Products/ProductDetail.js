import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getProduct } from "../../api/api";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import DesiredProduct from "../../components/Talepler/ProductDetailPage/DesiredProduct/DesiredProduct";
import Keywords from "../../components/Talepler/ProductDetailPage/Keywords/Keywords";
import TechnicialSpecifications from "../../components/Talepler/ProductDetailPage/TechnicialSpecifications/TechnicialSpecifications";
import { baseApi } from "../../config/config";
import { routes } from "../../constants/routes";
import colors from "../../theme/colors";
import { StyledButton } from "../ProductList";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error } = useSWR(["getProduct", id ?? null], getProduct);
  const Tabs = [
    {
      title: "İstenen Ürün",
      comp: DesiredProduct,
    },
    {
      title: "Teknik Özellikleri",
      comp: TechnicialSpecifications,
    },
    {
      title: "Keywords",
      comp: Keywords,
    },
    // {
    //   title: "İstenen Belgeler",
    //   comp: <>e</>,
    // },
  ];
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    data?.resimler?.forEach((image) =>
      setImages((prev) => [...prev, baseApi + image.dosyaYolu])
    );
  }, [data]);

  const loading = !data && !error;
  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        funct2={{
          title: "Düzenle",
          function: () => {
            navigate(routes.urunguncelle, { state: data });
          },
        }}
      >
        {data?.ad}
      </BreadCrumb>
      <Box display={"flex"} mt="20px" px={"38px"}>
        <ImageComp images={images} />
        <Box display={"flex"} flexDirection="column" pl={{ sm: "71px" }}>
          <Box borderBottom={"1px solid black"}>
            {Tabs?.map((tab, index) => (
              <StyledButton
                key={index}
                onClick={() => setActiveTab(tab)}
                fontSize="22px"
                color={
                  tab.title === activeTab.title
                    ? colors.lightdarkblue
                    : colors.gray
                }
              >
                {tab.title}
              </StyledButton>
            ))}
          </Box>
          <Box>
            <activeTab.comp detail={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
