import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getAlternativeDemand, getProduct } from "../../api/api";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import DesiredProduct from "../../components/Talepler/ProductDetailPage/DesiredProduct/DesiredProduct";
import Keywords from "../../components/Talepler/ProductDetailPage/Keywords/Keywords";
import MatchingProduct from "../../components/Talepler/ProductDetailPage/MatchingProduct/MatchingProduct";
import { baseApi } from "../../config/config";
import { routes } from "../../constants/routes";
import colors from "../../theme/colors";
import { StyledButton } from "../ProductList";

const AlternativeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error } = useSWR(
    ["getAlternativeDemand", id ?? null],
    getAlternativeDemand
  );

  const Tabs = [
    {
      title: "İstenen Ürün",
      comp: DesiredProduct,
    },
    {
      title: "Eşleşen Ürün",
      comp: MatchingProduct,
    },
    {
      title: "Keywords",
      comp: Keywords,
    },
    {
      title: "İstenen Belgeler",
      comp: MatchingProduct,
    },
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
        funct={{
          title: "Görevler",
          function: () => {
            navigate(routes.gorevler.replace(":id", id), { state: id });
          },
        }}
        funct1={{
          title: "Maliyetler",
          function: () => {
            navigate(routes.maliyetler, { state: id });
          },
        }}
        funct2={{
          title: "Teklif",
          function: () => {
            navigate(routes.teklif, { state: id });
          },
        }}
      >
        {data?.ad}
      </BreadCrumb>
      <Box display={"flex"} mt="20px" px={"38px"}>
        <ImageComp images={images} disabled={true} />
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
          <Box w="100%">
            {<activeTab.comp detail={data} page={"alternative"} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AlternativeDetail;
