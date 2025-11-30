import { Link } from 'react-router-dom';
import { Box, Container, Typography, Avatar, Button, Stack, Chip, Card, CardContent, Divider, IconButton } from '@mui/material';
import { MapPin, Link as LinkIcon, Calendar, Edit } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Profile() {
  const { user } = useAuthStore();

  const skills = ['React', 'TypeScript', 'Node.js', 'UI/UX', 'Figma'];
  const interests = ['Web Development', 'Design Systems', 'Open Source'];
  
  const rooms = [
    { id: 1, name: 'Design System Project', role: 'Owner' },
    { id: 2, name: 'AI Startup MVP', role: 'Member' },
  ];

  const contributions = [
    { id: 1, text: 'Completed task "Update landing page"', date: '2 days ago' },
    { id: 2, text: 'Created room "Design System Project"', date: '1 week ago' },
    { id: 3, text: 'Joined "AI Startup MVP"', date: '2 weeks ago' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={3}>
                <Avatar sx={{ width: 96, height: 96, bgcolor: 'grey.400', fontSize: '2rem' }}>
                  {user?.name?.[0] || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h3" fontWeight={700} gutterBottom>{user?.name || 'User'}</Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>Full-stack developer & designer</Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <MapPin size={16} />
                      <Typography variant="body2">San Francisco, CA</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Calendar size={16} />
                      <Typography variant="body2">Joined Jan 2024</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Button
                component={Link}
                to="/settings"
                variant="outlined"
                startIcon={<Edit size={16} />}
              >
                Edit Profile
              </Button>
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Passionate about building beautiful and functional web applications. 
              Love collaborating on innovative projects and learning new technologies.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<LinkIcon size={16} />}
                size="small"
              >
                portfolio.com
              </Button>
              <Button
                variant="outlined"
                startIcon={<LinkIcon size={16} />}
                size="small"
              >
                github.com
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Skills</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {skills.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Interests</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {interests.map((interest) => (
                  <Chip key={interest} label={interest} />
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Rooms</Typography>
              <Stack spacing={2}>
                {rooms.map((room) => (
                  <Card key={room.id} component={Link} to={`/workspace/${room.id}`} variant="outlined" sx={{ textDecoration: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                      <Typography variant="body2" fontWeight={500}>{room.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{room.role}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Recent Activity</Typography>
              <Stack spacing={2} divider={<Divider />}>
                {contributions.map((contribution) => (
                  <Box key={contribution.id}>
                    <Typography variant="body2" gutterBottom>{contribution.text}</Typography>
                    <Typography variant="caption" color="text.secondary">{contribution.date}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
