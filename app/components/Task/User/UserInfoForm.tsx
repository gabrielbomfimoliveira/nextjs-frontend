'use client';

// components/UserInfoForm.js
import { useState } from 'react';
import { Box, Button, Input, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '@/app/authContext';

const UserInfoForm = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      // Optionally, handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Failed to update user info', error);
      setError('Failed to update user info');
    }
  };

  return (
    <Box p={4} bg="white" color="black" shadow="md" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <Button type="submit" colorScheme="blue">Update</Button>
      </form>
    </Box>
  );
};

export default UserInfoForm;
