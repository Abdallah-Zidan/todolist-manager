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

function TodoList({  updateTodo, deleteTodo , markCompleted }: TodoListProps) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(['todos'], getTodos);
  if (isLoading) return <p>Loading...</p> ;
  if (error) return <p style={{color:"red"}}>{'An error happened: ' + (error as Error).message}</p> ;

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
        w='100%'
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems='stretch'
      >
        {data.map((todo) => (
          <HStack key={todo._id} opacity={todo.completed ? '0.2' : '1'}>
            <Text
              w='100%'
              p='8px'
              borderRadius='lg'
              as={todo.completed ? 's' : 'p'}
              cursor='pointer'
              onClick={()=>markCompleted(todo._id ?? '')}
            >
              {todo.title}
            </Text>
            <DeleteTodo
              todo={todo}
              deleteTodo={deleteTodo}
            />
            <UpdateTodo todo={todo} updateTodo={updateTodo} />
          </HStack>
        ))}
      </VStack>
    </>
  );
}

export default TodoList;