import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton, Textarea, Checkbox, useToast,
} from '@chakra-ui/react';
import { RefObject } from 'react';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { UpdateTodoProps } from './types';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from './api';

function UpdateTodo({ todo }: UpdateTodoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const initialRef: RefObject<any> = React.useRef();

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });

  async function onClick(data: any) {
    updateMutation.mutate({ _id: todo._id, ...data }, {
      onSuccess: () => {
        toast({
          title: 'Todo updated.',
          description: 'Updated your todo',
          status: 'success',
          duration: 500,
          isClosable: true,
        });
        onClose();
      },
      onError: (error: any) => {
        let description = error.message || 'error during updating your todo';
        toast({
          title: 'Update failed.',
          description,
          status: 'error',
          duration: 700,
          isClosable: true,
        });
      },
    });
  }

  return (
    <>
      <IconButton icon={<FiEdit />} isRound={true} onClick={onOpen} aria-label='edit todo' />
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w='90%' h='70%'>
          <ModalHeader>Update your todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={6}>
              <Input
                placeholder='Edit todo title'
                defaultValue={todo.title}
                borderColor={errors['title'] ? 'red.300' : 'transparent'}
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 4,
                    message: 'Title must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 155,
                    message: 'Title must not exceed 155 characters',
                  },
                })}
              />

              {errors.title && <div style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors?.title?.message?.toString() || 'invalid input'}</div>}

            </FormControl>
            <FormControl>
              <Textarea
                resize='none'
                h='60'
                placeholder='Edit todo description'
                borderColor={errors['description'] ? 'red.300' : 'transparent'}
                defaultValue={todo.description}
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 4,
                    message: 'Description must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Description must not exceed 155 characters',
                  },
                })}
              />
              {errors.description && <div style={{
                color: 'red',
                marginBottom: '5px',
              }}>{errors?.description?.message?.toString() || 'invalid input'}</div>}
            </FormControl>
            <FormControl>
              <Checkbox colorScheme='twitter' defaultChecked={todo.completed}
                        {...register('completed')}
              >
                Mark as completed
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={handleSubmit(onClick)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTodo;