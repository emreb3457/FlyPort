import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
} from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
const DrawerModal = ({ click, title, component, size }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnref = useRef();

  useMemo(() => {
    click !== null && btnref.current?.click();
  }, [click]);

  return (
    <>
      <Button
        id="drawerbtn"
        style={{ visibility: "hidden" }}
        ref={btnref}
        onClick={() => onOpen()}
      ></Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{component}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default DrawerModal;
