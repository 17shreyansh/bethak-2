import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import { Layout } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email, avatar: name[0] });
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Layout size={24} color="white" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>Create your account</Typography>
          <Typography variant="body1" color="text.secondary">Start collaborating today</Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                fullWidth
              />

              <Button type="submit" variant="contained" size="large" fullWidth>
                Create Account
              </Button>
            </Stack>
          </form>
        </Paper>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Button component={Link} to="/login" size="small">Sign in</Button>
        </Typography>
      </Container>
    </Box>
  );
}
