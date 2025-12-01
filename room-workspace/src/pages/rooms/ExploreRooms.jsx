import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, TextField, InputAdornment, Stack, Chip, Grid, Card, CardContent, Button, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { Search, Users, ArrowRight, Grid3x3, List, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { useRoomsStore } from '../../store/useRoomsStore';
import RoomCard from '../../components/RoomCard';

export default function ExploreRooms() {
  const { rooms } = useRoomsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('trending');

  const categories = ['all', 'Design', 'Startup', 'Content', 'Software', 'Study'];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || room.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
    if (sortBy === 'members') return b.members - a.members;
    if (sortBy === 'progress') return (b.progress || 0) - (a.progress || 0);
    return 0;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>Explore Rooms</Typography>
            <Typography variant="body1" color="text.secondary">Discover {rooms.length}+ collaborative workspaces</Typography>
          </Box>
          <Button variant="contained" startIcon={<Users size={18} />} component={Link} to="/rooms/create">
            Create Room
          </Button>
        </Stack>

        <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rooms by name, tags, or category..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, flex: 1 }}>
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat === 'all' ? 'All Rooms' : cat}
                    onClick={() => setCategory(cat)}
                    color={category === cat ? 'primary' : 'default'}
                    variant={category === cat ? 'filled' : 'outlined'}
                    icon={category === cat ? <TrendingUp size={14} /> : undefined}
                  />
                ))}
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <SlidersHorizontal size={16} />
                  <Typography variant="body2" color="text.secondary">Sort:</Typography>
                  <ToggleButtonGroup
                    value={sortBy}
                    exclusive
                    onChange={(e, val) => val && setSortBy(val)}
                    size="small"
                  >
                    <ToggleButton value="trending">Trending</ToggleButton>
                    <ToggleButton value="members">Members</ToggleButton>
                    <ToggleButton value="progress">Progress</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>

                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, val) => val && setViewMode(val)}
                  size="small"
                >
                  <ToggleButton value="grid">
                    <Grid3x3 size={16} />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <List size={16} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {sortedRooms.length} room{sortedRooms.length !== 1 ? 's' : ''}
            {category !== 'all' && ` in ${category}`}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {sortedRooms.map((room) => (
            <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 6} lg={viewMode === 'grid' ? 3 : 4} key={room.id}>
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>

        {sortedRooms.length === 0 && (
          <Paper sx={{ textAlign: 'center', py: 8, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>No rooms found</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Try adjusting your search or filters</Typography>
            <Button variant="contained" component={Link} to="/rooms/create">
              Create Your First Room
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
