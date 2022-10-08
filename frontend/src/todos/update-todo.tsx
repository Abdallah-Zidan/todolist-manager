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
  IconButton, Textarea,
} from '@chakra-ui/react';
import { RefObject, useState } from 'react';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { UpdateTodoProps } from './types';

function UpdateTodo({ todo, updateTodo }: UpdateTodoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const initialRef: RefObject<any> = React.useRef();

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
        <ModalContent w='90%' h="70%">
          <ModalHeader>Update your todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={6}>
              <Input
                placeholder='Edit todo title'
                defaultValue={todo.title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Textarea
                resize="none"
                h="60"
                placeholder='Edit todo description'
                defaultValue={todo.description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => updateTodo(todo._id as string, {
                title: title,
                description: description,
                completed: completed,
              }, onClose)}
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