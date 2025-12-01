import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Button, Avatar, AvatarGroup, Divider } from '@mui/material';
import { Plus, ArrowRight, Clock, Users, TrendingUp, CheckCircle2, MessageSquare, FileText, Activity } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useRoomsStore } from '../../store/useRoomsStore';

export default function DashboardTogethry() {
  const { user } = useAuthStore();
  const { rooms } = useRoomsStore();

  const activeRooms = rooms.filter(r => r.active);

  const quickActions = [
    { icon: Plus, label: 'New Room', to: '/rooms/create', color: '#2563eb' },
    { icon: MessageSquare, label: 'Messages', to: '/rooms', color: '#10b981' },
    { icon: FileText, label: 'Notes', to: '/rooms', color: '#f59e0b' },
    { icon: Activity, label: 'Activity', to: '/rooms', color: '#ef4444' },
  ];

  const recentActivity = [
    { text: 'Completed 3 tasks in Design System', time: '2h ago', icon: CheckCircle2, color: '#10b981' },
    { text: 'New message in AI Startup MVP', time: '4h ago', icon: MessageSquare, color: '#2563eb' },
    { text: 'Sarah joined Mobile App Development', time: '5h ago', icon: Users, color: '#f59e0b' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e5e5', py: { xs: 2, md: 3 } }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 0 }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Box>
              <Typography variant={{ xs: 'h5', md: 'h4' }} fontWeight={600} sx={{ mb: 0.5 }}>
                Good morning, {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
            <Button 
              component={Link} 
              to="/rooms/create" 
              variant="contained" 
              startIcon={<Plus size={18} />}
              size="medium"
            >
              New Room
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Grid container spacing={{ xs: 1.5, md: 2 }}>
                <Grid item xs={6} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                      <Typography variant={{ xs: 'h4', md: 'h3' }} fontWeight={600} color="primary.main">
                        {activeRooms.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Active Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                      <Typography variant={{ xs: 'h4', md: 'h3' }} fontWeight={600} color="success.main">
                        24
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Tasks Done
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                      <Typography variant={{ xs: 'h4', md: 'h3' }} fontWeight={600} color="warning.main">
                        {rooms.reduce((sum, r) => sum + (r.members || 0), 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Team Members
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                      <Typography variant={{ xs: 'h4', md: 'h3' }} fontWeight={600} color="error.main">
                        {Math.round(rooms.reduce((sum, r) => sum + (r.progress || 0), 0) / rooms.length)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Avg Progress
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" fontWeight={600}>Your Rooms</Typography>
                    <Button 
                      component={Link} 
                      to="/rooms" 
                      size="small"
                      endIcon={<ArrowRight size={16} />}
                    >
                      View All
                    </Button>
                  </Stack>

                  <Stack spacing={{ xs: 1.5, md: 2 }}>
                    {activeRooms.slice(0, 4).map((room) => (
                      <Box
                        key={room.id}
                        component={Link}
                        to={`/workspace/${room.id}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 1.5, md: 2 },
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 1.5,
                          border: '1px solid #e5e5e5',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            bgcolor: '#fafafa',
                            borderColor: '#d4d4d4',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            borderRadius: 1.5,
                            background: `linear-gradient(135deg, ${room.color}, ${room.colorEnd})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            flexShrink: 0,
                          }}
                        >
                          {room.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant={{ xs: 'body2', md: 'body1' }} fontWeight={600} noWrap>
                            {room.name}
                          </Typography>
                          <Stack direction="row" spacing={{ xs: 1.5, md: 2 }} sx={{ mt: 0.5 }}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Users size={14} color="#737373" />
                              <Typography variant="caption" color="text.secondary">
                                {room.members}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                              <Clock size={14} color="#737373" />
                              <Typography variant="caption" color="text.secondary">
                                Active today
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant={{ xs: 'body1', md: 'h6' }} fontWeight={600}>
                            {room.progress}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Complete
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: { xs: 2, md: 3 } }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={{ xs: 1.5, md: 2 }}>
                    {quickActions.map((action) => (
                      <Grid item xs={6} sm={6} md={3} key={action.label}>
                        <Button
                          component={Link}
                          to={action.to}
                          fullWidth
                          sx={{
                            height: { xs: 80, md: 100 },
                            flexDirection: 'column',
                            gap: 1,
                            border: '1px solid #e5e5e5',
                            bgcolor: 'white',
                            color: 'text.primary',
                            '&:hover': {
                              bgcolor: '#fafafa',
                              borderColor: action.color,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 32, md: 40 },
                              height: { xs: 32, md: 40 },
                              borderRadius: 1.5,
                              bgcolor: action.color + '15',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: action.color,
                            }}
                          >
                            <action.icon size={20} />
                          </Box>
                          <Typography variant="body2" fontWeight={500}>
                            {action.label}
                          </Typography>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: { xs: 2, md: 3 } }}>
                    Recent Activity
                  </Typography>
                  <Stack spacing={{ xs: 1.5, md: 2 }}>
                    {recentActivity.map((activity, i) => (
                      <Box key={i}>
                        <Stack direction="row" spacing={{ xs: 1, md: 1.5 }} alignItems="flex-start">
                          <Box
                            sx={{
                              width: { xs: 28, md: 32 },
                              height: { xs: 28, md: 32 },
                              borderRadius: 1,
                              bgcolor: activity.color + '15',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: activity.color,
                              flexShrink: 0,
                            }}
                          >
                            <activity.icon size={16} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">{activity.text}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        </Stack>
                        {i < recentActivity.length - 1 && <Divider sx={{ mt: { xs: 1.5, md: 2 } }} />}
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ bgcolor: 'white', border: '1px solid #e5e5e5' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: { xs: 2, md: 3 } }}>
                    Team Members
                  </Typography>
                  <AvatarGroup max={{ xs: 6, md: 8 }} sx={{ justifyContent: 'flex-start' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter, i) => (
                      <Avatar key={i} sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, bgcolor: 'grey.300' }}>
                        {letter}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <Button fullWidth variant="outlined" sx={{ mt: { xs: 2, md: 3 } }} component={Link} to="/people">
                    View All Members
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
