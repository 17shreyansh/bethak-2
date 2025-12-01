import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Button, Divider, Avatar, Chip, Paper, IconButton, Tab, Tabs } from '@mui/material';
import { Plus, Users, Sparkles, Clock, ArrowRight, TrendingUp, Star, Zap, Target, BookOpen, Filter } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useRoomsStore } from '../../store/useRoomsStore';
import RoomCard from '../../components/RoomCard';
import ProfileCard from '../../components/ProfileCard';
import SuggestionCard from '../../components/SuggestionCard';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { rooms } = useRoomsStore();
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState('all');

  const activities = [
    { id: 1, text: 'New task assigned in Design System Project', time: '5m ago', type: 'task', avatar: '📝' },
    { id: 2, text: 'Sarah commented on your note', time: '1h ago', type: 'comment', avatar: '👩' },
    { id: 3, text: 'AI Startup MVP room updated', time: '2h ago', type: 'update', avatar: '🚀' },
    { id: 4, text: 'You completed 5 tasks today', time: '3h ago', type: 'achievement', avatar: '✅' },
  ];

  const suggestions = [
    { id: 1, title: 'Connect with John Doe', description: 'Frontend Developer with React expertise', type: 'people', color: 'primary', reason: 'Based on your interests', actionText: 'View Profile' },
    { id: 2, title: 'Join Mobile App Development', description: 'Trending room with 15 active members', type: 'room', color: 'success', reason: 'Matches your skills', actionText: 'Join Room', highlighted: true },
    { id: 3, title: 'Complete Your Profile', description: 'Add skills to get better recommendations', type: 'ai', color: 'warning', reason: 'AI Suggestion', actionText: 'Update' },
    { id: 4, title: 'Learn Web3 Development', description: 'New course available in your field', type: 'learning', color: 'info', actionText: 'Explore' },
  ];

  const recommendedPeople = [
    { id: 1, name: 'Sarah Johnson', username: 'sarahj', role: 'UI/UX Designer', location: 'San Francisco, CA', bio: 'Passionate about creating beautiful and functional user experiences', skills: ['Figma', 'UI Design', 'Prototyping', 'Design Systems'], online: true, verified: true, stats: { projects: 24, connections: 156, rating: 4.9 } },
    { id: 2, name: 'Mike Chen', username: 'mikechen', role: 'Full Stack Developer', location: 'New York, NY', bio: 'Building scalable web applications with modern technologies', skills: ['React', 'Node.js', 'TypeScript', 'AWS'], online: false, verified: true, stats: { projects: 38, connections: 203, rating: 4.8 } },
    { id: 3, name: 'Emily Rodriguez', username: 'emilyrod', role: 'Product Manager', location: 'Austin, TX', bio: 'Driving product strategy and user-centric solutions', skills: ['Product Strategy', 'Agile', 'Analytics'], online: true, verified: false, stats: { projects: 19, connections: 142, rating: 4.7 } },
  ];

  const stats = [
    { label: 'Active Rooms', value: rooms.filter(r => r.active).length, icon: Users, color: '#6366f1', trend: '+2' },
    { label: 'Tasks Completed', value: 47, icon: Target, color: '#10b981', trend: '+12' },
    { label: 'Connections', value: 128, icon: Users, color: '#f59e0b', trend: '+8' },
    { label: 'Learning Hours', value: 24, icon: BookOpen, color: '#ec4899', trend: '+5' },
  ];

  const filteredRooms = filter === 'all' ? rooms : rooms.filter(r => 
    filter === 'starred' ? r.starred : 
    filter === 'trending' ? r.trending : 
    filter === 'active' ? r.active : true
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Welcome back, {user?.name || 'User'} 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">Here's what's happening with your projects today</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<Filter size={18} />}>Filter</Button>
            <Button variant="contained" startIcon={<Plus size={18} />} component={Link} to="/rooms/create">
              Create Room
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ 
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    </Box>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: stat.color + '20',
                      color: stat.color
                    }}>
                      <stat.icon size={24} />
                    </Box>
                  </Stack>
                  <Chip 
                    label={stat.trend} 
                    size="small" 
                    icon={<TrendingUp size={12} />}
                    sx={{ mt: 1, height: 20, bgcolor: 'success.100', color: 'success.700' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Your Rooms</Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => setFilter('all')} color={filter === 'all' ? 'primary' : 'default'}>
                      <Users size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setFilter('starred')} color={filter === 'starred' ? 'primary' : 'default'}>
                      <Star size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setFilter('trending')} color={filter === 'trending' ? 'primary' : 'default'}>
                      <TrendingUp size={18} />
                    </IconButton>
                  </Stack>
                </Stack>
                <Grid container spacing={2}>
                  {filteredRooms.slice(0, 4).map((room) => (
                    <Grid item xs={12} sm={6} key={room.id}>
                      <RoomCard room={room} variant="compact" />
                    </Grid>
                  ))}
                </Grid>
                <Button component={Link} to="/rooms" fullWidth sx={{ mt: 2 }} endIcon={<ArrowRight size={16} />}>
                  View all {rooms.length} rooms
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Sparkles size={20} color="#f59e0b" />
                  <Typography variant="h6" fontWeight={600}>AI Recommendations</Typography>
                  <Chip label="Powered by AI" size="small" icon={<Zap size={12} />} sx={{ ml: 1 }} />
                </Stack>
                <Stack spacing={2}>
                  {suggestions.map((suggestion) => (
                    <SuggestionCard 
                      key={suggestion.id} 
                      suggestion={suggestion}
                      onDismiss={(id) => console.log('Dismiss', id)}
                      onAction={(s) => console.log('Action', s)}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Clock size={18} />
                    <Typography variant="h6" fontWeight={600}>Recent Activity</Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {activities.map((activity) => (
                      <Stack key={activity.id} direction="row" spacing={1.5} alignItems="flex-start">
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1.5, 
                          bgcolor: 'grey.100',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          flexShrink: 0
                        }}>
                          {activity.avatar}
                        </Box>
                        <Box flex={1}>
                          <Typography variant="body2">{activity.text}</Typography>
                          <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>Recommended People</Typography>
                    <Button size="small" component={Link} to="/people">View All</Button>
                  </Stack>
                  <Stack spacing={2}>
                    {recommendedPeople.slice(0, 2).map((profile) => (
                      <ProfileCard key={profile.id} profile={profile} variant="compact" />
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
