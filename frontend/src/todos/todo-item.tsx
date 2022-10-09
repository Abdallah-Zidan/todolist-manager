import React, { RefObject } from 'react';
import UpdateTodo from './update-todo';
import DeleteTodo from './delete-todo';

import {
  HStack,
  Box,
  VStack,
  Text,
  StackDivider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

import { Todo } from './types';
import ToggleTodo from './toggle-todo';

function TodoItem({ todo }: { todo: Todo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef: RefObject<any> = React.useRef();

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='md'>{todo.title.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody pb={6}>
            <Text
              fontSize='lg'
              lineHeight={1.75}
              fontFamily="'Cairo', sans-serif"
              letterSpacing='wide'
              dangerouslySetInnerHTML={{ __html: todo.description?.replace?.(/\n/g, '<br/>') || '' }}
            >
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              onClick={onClose}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack key={todo._id} opacity={todo.completed ? '0.5' : '1'}>
        <Text
          w='100%'
          p='8px'
          borderRadius='lg'
          as={todo.completed ? 's' : 'p'}
          cursor='pointer'
          onClick={onOpen}
        >
          {todo.title}
        </Text>
        <DeleteTodo
          todo={todo}
        />
        <UpdateTodo todo={todo} />
        <ToggleTodo todo={todo} />
      </HStack>
    </>
  );
}

export default TodoItem;