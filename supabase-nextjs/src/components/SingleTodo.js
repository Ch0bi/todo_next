import {Box, Divider, Heading, Text, Tag} from '@chakra-ui/react'


const SingleTodo = ({todo}) => {
    const getDateInMonthDayYear = (date) => {
        const d = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        const n = d.toLocaleDateString('en-us', options);
        const replase = n.replace(new RegExp(',', 'g'), '');
        return replase;
    };

    return (
        <Box 
        position='relative'
        maxW='sm'
        borderWidth='1px'
        bordeRadius='lg'
        overflow='hidden'
        p='4'>
            <Heading size='md' mt='3'>{todo.title}</Heading>
            <Tag 
            position='absolute'
            top='3'
            right='2'
            bg={todo.isComplete ? 'green.500' : 'yellow.400'}
            borderRadius='3xl'
            size='sm'/>
            <text color='gray.400' mt='1' fontSize='sm'>
                {getDateInMonthDayYear(todo.insertedat)}
            </text>
            <Divider my='4'/>
            <Text  noOfLines={[1,2,3]} color='gray.800'>
                {todo.description}
            </Text>
        </Box>
    );
}

export default SingleTodo;