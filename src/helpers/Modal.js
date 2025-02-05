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
import React, { useMemo, useRef } from "react";
const BasicModal = ({ click, title, component, size }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnref = useRef();

  useMemo(() => {
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
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{component}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default React.memo(BasicModal);
