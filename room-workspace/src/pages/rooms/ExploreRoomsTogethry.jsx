import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, TextField, InputAdornment, Stack, Chip, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
import { Search, Users, Clock, TrendingUp, Star, MoreVertical } from 'lucide-react';
import { useRoomsStore } from '../../store/useRoomsStore';

export default function ExploreRoomsTogethry() {
  const { rooms } = useRoomsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', 'Design', 'Startup', 'Content', 'Software', 'Study'];

  const filtered = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || room.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="xl">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={600}>Explore Rooms</Typography>
          <Typography variant="body1" color="text.secondary">
            Discover and join {rooms.length} collaborative workspaces
          </Typography>
        </Stack>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms by name, category, or tags..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat === 'all' ? 'All Rooms' : cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? 'primary' : 'default'}
                variant={category === cat ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Showing {filtered.length} room{filtered.length !== 1 ? 's' : ''}
        </Typography>

        <Grid container spacing={2.5}>
          {filtered.map((room) => (
            <Grid item xs={12} sm={6} lg={4} key={room.id}>
              <Card 
                component={Link} 
                to={`/workspace/${room.id}`}
                sx={{ 
                  textDecoration: 'none',
                  height: '100%',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${room.color}, ${room.colorEnd})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            flexShrink: 0,
                          }}
                        >
                          {room.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="h6" fontWeight={600} noWrap>
                            {room.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {room.category}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        {room.starred && (
                          <IconButton size="small" sx={{ color: 'warning.main' }}>
                            <Star size={16} fill="currentColor" />
                          </IconButton>
                        )}
                        <IconButton size="small">
                          <MoreVertical size={16} />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: 40,
                      }}
                    >
                      {room.description}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                      {room.tags?.slice(0, 3).map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          variant="outlined"
                          sx={{ height: 22, fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {room.progress}%
                        </Typography>
                      </Stack>
                      <Box sx={{ 
                        height: 6, 
                        bgcolor: 'grey.100', 
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}>
                        <Box sx={{ 
                          width: `${room.progress}%`, 
                          height: '100%', 
                          background: `linear-gradient(90deg, ${room.color}, ${room.colorEnd})`,
                        }} />
                      </Box>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Users size={14} color="#737373" />
                          <Typography variant="caption" color="text.secondary">
                            {room.members}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Clock size={14} color="#737373" />
                          <Typography variant="caption" color="text.secondary">
                            Active
                          </Typography>
                        </Stack>
                      </Stack>
                      {room.trending && (
                        <Chip 
                          label="Trending" 
                          size="small" 
                          color="primary"
                          icon={<TrendingUp size={12} />}
                          sx={{ height: 22, fontSize: '0.75rem' }}
                        />
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 12 }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: 3, 
                bgcolor: 'grey.100', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                fontSize: '2rem',
              }}>
                🔍
              </Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                No rooms found
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your search or filters
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}
