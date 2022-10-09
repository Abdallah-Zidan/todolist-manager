import { Heading, VStack } from '@chakra-ui/react';
import AddTodo from './add-todo';
import TodoList from './todo-list';

export default function Todos() {
  return (
    <VStack p={4} minH='100vh' pb={28}>
      <Heading
        p='5'
        fontWeight='extrabold'
        size='xl'
        colorScheme='twitter'
      >
        Todo list
      </Heading>
      <AddTodo />
      <TodoList />
    </VStack>
  );
}