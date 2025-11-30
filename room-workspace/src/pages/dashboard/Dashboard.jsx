import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Button, Divider } from '@mui/material';
import { Plus, Users, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useRoomsStore } from '../../store/useRoomsStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { rooms } = useRoomsStore();

  const activities = [
    { id: 1, text: 'New task assigned in Design System Project', time: '5m ago' },
    { id: 2, text: 'Sarah commented on your note', time: '1h ago' },
    { id: 3, text: 'AI Startup MVP room updated', time: '2h ago' },
  ];

  const suggestions = [
    { id: 1, text: 'Connect with John Doe - Frontend Developer', type: 'people' },
    { id: 2, text: 'Join "Mobile App Design" room', type: 'room' },
    { id: 3, text: 'Complete your profile to get better matches', type: 'profile' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome back, {user?.name || 'User'}
          </Typography>
          <Typography variant="body1" color="text.secondary">Here's what's happening with your projects</Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card component={Link} to="/rooms/create" sx={{ textDecoration: 'none', '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Plus size={24} color="white" />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Create Room</Typography>
                <Typography variant="body2" color="text.secondary">Start a new project workspace</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card component={Link} to="/rooms" sx={{ textDecoration: 'none', '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Users size={24} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Explore Rooms</Typography>
                <Typography variant="body2" color="text.secondary">Find projects to join</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card component={Link} to="/workspace/1" sx={{ textDecoration: 'none', '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <ArrowRight size={24} />
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>Open Workspace</Typography>
                <Typography variant="body2" color="text.secondary">Continue where you left off</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Your Rooms</Typography>
                <Stack spacing={2}>
                  {rooms.slice(0, 3).map((room) => (
                    <Card key={room.id} component={Link} to={`/workspace/${room.id}`} variant="outlined" sx={{ textDecoration: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>{room.name}</Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary">{room.category}</Typography>
                            <Typography variant="caption" color="text.secondary">•</Typography>
                            <Typography variant="caption" color="text.secondary">{room.members} members</Typography>
                          </Stack>
                        </Box>
                        <ArrowRight size={16} />
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
                <Button component={Link} to="/rooms" fullWidth sx={{ mt: 2 }}>View all rooms →</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Sparkles size={18} />
                    <Typography variant="h6" fontWeight={600}>Recommended</Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {suggestions.map((suggestion) => (
                      <Box key={suggestion.id} sx={{ p: 2, bgcolor: 'grey.50', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Typography variant="body2">{suggestion.text}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Clock size={18} />
                    <Typography variant="h6" fontWeight={600}>Recent Activity</Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {activities.map((activity) => (
                      <Stack key={activity.id} direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="body2">{activity.text}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>{activity.time}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
