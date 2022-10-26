import { Box, Text, Textarea } from "@chakra-ui/react";
import { TextInput } from "../../components/Inputs/CustomInputs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanySummary = (props) => {
  const { item } = props;
  const [inputDisabled, setInputDisabled] = useState(true);

  const data = {
    firmaUnvanı: item?.firmaUnvani,
    kısaAdı: item?.kisaAd,
    ulke: item?.ulke,
    sehir: item?.sehir,
    adres: item?.adres,
    postaKodu: item?.postaKodu,
    vergiDairesi: item?.vergiDairesi,
    vergiNo: item?.vergiNo,
    sektoru: item?.sektoru,
    telefon: item?.Telefon,
    website: item?.web,
    infoMail: item?.infomail,
    vchat: item?.vchat,
    yetkiliGorevi: item?.firmaYetkilileri[0]?.gorevi,
    yetkiliAd: item?.firmaYetkilileri[0]?.ad,
    yetkiliSoyad: item?.firmaYetkilileri[0]?.soyad,
    yetkiliGSM: item?.firmaYetkilileri[0]?.gsm,
    yetkiliEmail: item?.firmaYetkilileri[0]?.email,
  };
  return (
    <Box px="50px" mt="40px">
      <form>
        <Box display={["block", "block", "block", "flex"]} mt="20px">
          <Box width={{ lg: "35%", "2xl": "30%" }}>
            <Text fontSize={"24px"} fontWeight="bold">
              Firma Bilgileri
            </Text>
            <Box>
              <TextInput
                disabled={inputDisabled}
                name={"FirmaUnvani"}
                value={data?.firmaUnvanı}
              >
                Firma Unvanı
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"KisaAd"}
                value={data?.kısaAdı}
              >
                Kısa Adı
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"UlkeId"}
                value={data?.ulke}
              >
                Ülke
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"SehirId"}
                value={data?.sehir}
              >
                Şehir
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"Adres"}
                value={data?.adres}
              >
                Adres
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"PostaKodu"}
                value={data?.postaKodu}
              >
                Posta Kodu
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"VergiDairesi"}
                value={data?.vergiDairesi}
              >
                Vergi Dairesi
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"VergiNo"}
                value={data?.vergiNo}
              >
                Vergi No
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"Sektoru"}
                value={data?.sektoru}
              >
                Sektörü
              </TextInput>
            </Box>
          </Box>

          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <Text fontSize={"24px"} fontWeight="bold">
              Firma İletişim Bilgileri
            </Text>
            <Box>
              <TextInput
                disabled={inputDisabled}
                name={"Telefon"}
                value={data?.telefon}
              >
                Telefon
              </TextInput>
              <TextInput
                disabled={"Web"}
                name={"Sektoru"}
                value={data?.website}
              >
                Web
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"mail"}
                value={data?.infoMail}
              >
                Info Mail
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"vchat"}
                value={data?.vchat}
              >
                Vchat
              </TextInput>
            </Box>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <Text fontSize={"24px"} fontWeight="bold">
              Yetkili Kişi
            </Text>
            <Box>
              <TextInput
                disabled={inputDisabled}
                name={"Telefon"}
                value={data?.yetkiliGorevi}
              >
                Görevi
              </TextInput>
              <TextInput
                disabled={"Web"}
                name={"Sektoru"}
                value={data?.yetkiliAd}
              >
                Adı
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"soyad"}
                value={data?.yetkiliSoyad}
              >
                Soyadı
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"gsn"}
                value={data?.yetkiliGSM}
              >
                GSM No
              </TextInput>
              <TextInput
                disabled={inputDisabled}
                name={"email"}
                value={data?.yetkiliEmail}
              >
                E-mail
              </TextInput>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default CompanySummary;
