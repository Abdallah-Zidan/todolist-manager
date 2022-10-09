import React from 'react';
import UpdateTodo from './update-todo';
import DeleteTodo from './delete-todo';

import {
  HStack,
  Box,
  VStack,
  Text,
  StackDivider,
} from '@chakra-ui/react';

import { TodoListProps } from './types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos } from './api';
import ToggleTodo from './toggle-todo';
import TodoItem from './todo-item';

function TodoList() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(['todos'], getTodos);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{'An error happened: ' + (error as Error).message}</p>;

  if (!data || !data.length) {
    return (
      <Box maxW='80%'>
        <h1>your todo list is empty</h1>
      </Box>
    );
  }
  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor='gray.100'
        borderWidth='2px'
        p='5'
        borderRadius='lg'
        w='60%'
        alignItems='stretch'
      >
        {data.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </VStack>
    </>
  );
}

export default TodoList;