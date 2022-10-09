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
  IconButton, useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { DeleteTodoProps } from './types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from './api';

export default function DeleteTodo({ todo }: DeleteTodoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
      toast({
        title: 'Todo removed.',
        description: 'Removed your todo successfully',
        status: 'success',
        duration: 500,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      let description = error.message || 'error during removing your todo';
      toast({
        title: 'Removing failed.',
        description,
        status: 'error',
        duration: 700,
        isClosable: true,
      });
    },

  });

  async function onClick() {
    deleteMutation.mutate(todo._id as string);
    close();
  }

  return (
    <>
      <IconButton icon={<FiTrash2 />} isRound={true} onClick={onOpen} aria-label='delete todo' />

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
              onClick={onClick}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

