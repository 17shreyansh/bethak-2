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
            <Typography variant="h6" fontWeight={600}>Bethak</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/signup" variant="contained" color="primary">Sign Up</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Collaborate in Real-Time<br />Workspaces
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Create project rooms with customizable panels. Chat, plan, and build together in one unified workspace.
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
                <Typography variant="h6" fontWeight={600} gutterBottom>Flexible Workspaces</Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag-and-drop panels like VS Code. Customize your workspace layout for any project.
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
                <Typography variant="h6" fontWeight={600} gutterBottom>Real-Time Collaboration</Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat, kanban boards, notes, and file sharing all in one place. Stay in sync with your team.
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
                <Typography variant="h6" fontWeight={600} gutterBottom>Find Collaborators</Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover people with the right skills. Build teams and work on projects together.
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
              <Typography variant="h6" fontWeight={600}>Bethak</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">© 2024 Bethak. All rights reserved.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
