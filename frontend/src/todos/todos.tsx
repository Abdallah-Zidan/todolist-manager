import { Heading, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddTodo from './add-todo';
import TodoList from './todo-list';
import { Todo } from './types';
import { toggleComplete, deleteTodo, postTodo, updateTodo } from './api';

export default function Todos() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });


  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });

  const completeMutation = useMutation(toggleComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });

  function removeTodo(id: string) {
    deleteMutation.mutate(id);
  }

  function modifyTodo(id: string, todo: Todo, onClose: () => void) {
    const info = todo.title.trim();
    if (!info) {
      toast({
        title: 'Enter your task',
        position: 'top',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    updateMutation.mutate({
      ...todo,
      _id: id,
    }, {
      onSuccess: () => onClose(),
    });
  }

  function addTodo(todo: Todo) {
    createMutation.mutate(todo);
  }

  function toggleCompletion(id: string, complete: boolean) {
    completeMutation.mutate({ id, completed: complete });
  }


  return (
    <VStack p={4} minH='100vh' pb={28}>
      <Heading
        p='5'
        fontWeight='extrabold'
        size='xl'
        bgGradient='linear(to-r, red.500, yellow.500)'
        bgClip='text'
      >
        Todo list
      </Heading>
      <AddTodo addTodo={addTodo} />
      <TodoList
        deleteTodo={removeTodo}
        updateTodo={modifyTodo}
        toggleComplete={toggleCompletion}
      />
    </VStack>
  );
}