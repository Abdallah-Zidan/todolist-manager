import { Button, HStack, Input, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTodo } from './api';

function AddTodo() {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']).catch(console.error);
      toast({
        title: 'Todo created.',
        description: 'Created your todo',
        status: 'success',
        duration: 500,
        isClosable: true,
      });
      reset();
    },
    onError: (error: any) => {
      let description = error.message || 'error during creating your todo';
      toast({
        title: 'Creation failed.',
        description,
        status: 'error',
        duration: 700,
        isClosable: true,
      });
    },
  });


  async function onSubmit(data: any) {
    createMutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60%' }}>
      <HStack mt='4' mb='4' style={{ width: '100%' }}>
        <VStack style={{ width: '100%', margin: 'auto' }}>
          <Input
            h='46'
            variant='filled'
            placeholder='title'
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
            fontSize='1.2rem'
          />
          <Textarea
            h='120'
            borderColor={errors['description'] ? 'red.300' : 'transparent'}
            variant='filled'
            placeholder='description'
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
            resize='none'
            fontSize='1.2rem'
          />
        </VStack>

        <Button
          colorScheme='twitter'
          px='8'
          pl='10'
          pr='10'
          h='166'
          type='submit'
        >
          Add
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;