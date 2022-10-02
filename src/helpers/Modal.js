import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
const BasicModal = ({ click, contentComponent,title }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnref = useRef();

  useEffect(() => {
    click !== null && btnref.current?.click();
  }, [click]);

  return (
    <>
      <Button
        id="modalbtn"
        style={{ visibility: "hidden" }}
        ref={btnref}
        onClick={() => onOpen()}
      ></Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{contentComponent}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BasicModal;
