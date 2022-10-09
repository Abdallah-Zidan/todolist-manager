import {
  IconButton, useToast,
} from '@chakra-ui/react';

import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Todo } from './types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleComplete } from './api';

function ToggleTodo({ todo }: { todo: Todo }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const completeMutation = useMutation(toggleComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
    },
  });

  async function onClick() {
    completeMutation.mutate({ id: todo._id as string, completed: !todo.completed }, {
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
    <IconButton icon={<FiCheck />} isRound={true} onClick={onClick} aria-label='toggle todo' />
  );
}

export default ToggleTodo;