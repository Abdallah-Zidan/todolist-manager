import { useState } from 'react';
import { Button, HStack, Input, Textarea, useToast, VStack } from '@chakra-ui/react';
import { AddTodoProps } from './types';

function AddTodo({ addTodo }: AddTodoProps) {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statusTitle, setStatusTitle] = useState(true);
  const [statusDescription, setStatusDescription] = useState(true);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const titleText = title.trim();
    const descriptionText = description.trim();

    if (!titleText) {
      toast({
        title: 'title is required',
        position: 'top',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });

      setStatusTitle(false);
      return setTitle('');
    }

    if (!descriptionText) {
      toast({
        title: 'description is required',
        position: 'top',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });

      setStatusDescription(false);
      return setDescription('');
    }

    const todo = {
      title: titleText,
      description: descriptionText,
      completed: false,
    };

    await addTodo(todo);
    setTitle('');
    setDescription('');
  }

  if (title && !statusTitle) {
    setStatusTitle(true);
  }
  if (description && !statusDescription) {
    setStatusDescription(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{width:'60%'}}>
      <HStack mt='4' mb='4' style={{width:'100%'}}>
        <VStack style={{width:'100%', margin:'auto'}}>
          <Input
            h='46'
            borderColor={!statusTitle ? 'red.300' : 'transparent'}
            variant='filled'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fontSize="1.2rem"
          />
          <Textarea
            h='120'
            borderColor={!statusDescription ? 'red.300' : 'transparent'}
            variant='filled'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            resize="none"
            fontSize="1.2rem"
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