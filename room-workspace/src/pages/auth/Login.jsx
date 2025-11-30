import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, TextField, Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { Layout } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Shreyansh', email, avatar: 'S' });
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Layout size={24} color="white" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>Welcome back</Typography>
          <Typography variant="body1" color="text.secondary">Sign in to your account</Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
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

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Button component={Link} to="/forgot-password" size="small">Forgot password?</Button>
              </Stack>

              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Button component={Link} to="/signup" size="small">Sign up</Button>
        </Typography>
      </Container>
    </Box>
  );
}
