import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, TextField, InputAdornment, Stack, Chip, Grid, Card, CardContent, Button } from '@mui/material';
import { Search, Users, ArrowRight } from 'lucide-react';
import { useRoomsStore } from '../../store/useRoomsStore';

export default function ExploreRooms() {
  const { rooms } = useRoomsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', 'Design', 'Startup', 'Content', 'Software', 'Study'];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || room.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>Explore Rooms</Typography>
          <Typography variant="body1" color="text.secondary">Discover projects and join collaborative workspaces</Typography>
        </Box>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat === 'all' ? 'All' : cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? 'primary' : 'default'}
                variant={category === cat ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 3 } }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{room.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{room.category}</Typography>
                      </Box>
                      <Chip
                        label={room.visibility}
                        size="small"
                        color={room.visibility === 'public' ? 'success' : 'default'}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {room.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Users size={16} />
                        <Typography variant="body2">{room.members} members</Typography>
                      </Stack>
                      <Button
                        component={Link}
                        to={`/workspace/${room.id}`}
                        endIcon={<ArrowRight size={16} />}
                        size="small"
                      >
                        Join
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredRooms.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No rooms found. Try adjusting your filters.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
