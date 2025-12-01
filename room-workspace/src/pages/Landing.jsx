import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, AppBar, Toolbar, Stack, Card, CardContent, Grid } from '@mui/material';
import { ArrowRight, Users, Layout, MessageSquare } from 'lucide-react';

export default function Landing() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 32, height: 32, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layout size={18} color="white" />
            </Box>
            <Typography variant="h6" fontWeight={600}>Togethry</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/signup" variant="contained" color="primary">Sign Up</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Work Together,<br />Beautifully Simple
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Togethry is a minimal, modern workspace where teams collaborate inside customizable rooms and modular panels.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={Link} to="/signup" variant="contained" size="large" endIcon={<ArrowRight size={18} />}>
            Get Started
          </Button>
          <Button component={Link} to="/rooms" variant="outlined" size="large">
            Explore Rooms
          </Button>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Layout size={24} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Modular Panels</Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag, resize, and arrange panels. Build your perfect workspace layout.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <MessageSquare size={24} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Everything in One Place</Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat, tasks, notes, files, whiteboard, and AI assistant. All synchronized in real-time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Users size={24} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Fast & Minimal</Typography>
                <Typography variant="body2" color="text.secondary">
                  Clean interface inspired by Linear and Notion. No clutter, just productivity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', mt: 12 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 32, height: 32, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layout size={18} color="white" />
              </Box>
              <Typography variant="h6" fontWeight={600}>Togethry</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">© 2024 Togethry. All rights reserved.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
