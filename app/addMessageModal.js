import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Input, ModalFooter, Button } from '@nextui-org/react';

export default function AddMessageModal(isOpen, onOpenChange) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Impart a Message</ModalHeader>
                            <ModalBody>
                                Hello
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}