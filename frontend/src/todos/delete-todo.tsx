import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { DeleteTodoProps } from './types';

export default function DeleteTodo({ todo, deleteTodo }: DeleteTodoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton icon={<FiTrash2 />} isRound={true} onClick={onOpen} aria-label="delete todo" />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='90%'>
          <ModalHeader>Do you really want to delete the todo?</ModalHeader>
          <ModalBody>
            <Text>{todo.title}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme='red'
              onClick={() => deleteTodo(todo._id ?? "", onClose)}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

