import { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Stack, Chip, Card, CardContent, Avatar } from '@mui/material';
import { Search as SearchIcon, Users, Folder, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const results = {
    rooms: [
      { id: 1, name: 'Design System Project', type: 'room', category: 'Design' },
      { id: 2, name: 'AI Startup MVP', type: 'room', category: 'Startup' },
    ],
    people: [
      { id: 1, name: 'John Doe', type: 'person', role: 'Frontend Developer' },
      { id: 2, name: 'Jane Smith', type: 'person', role: 'Data Scientist' },
    ],
    notes: [
      { id: 1, name: 'Meeting Notes - Sprint Planning', type: 'note', room: 'Design System' },
      { id: 2, name: 'Project Ideas', type: 'note', room: 'AI Startup' },
    ],
  };

  const getFilteredResults = () => {
    if (filter === 'all') {
      return [...results.rooms, ...results.people, ...results.notes];
    }
    return results[filter] || [];
  };

  const filteredResults = getFilteredResults().filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>Search</Typography>
          <Typography variant="body1" color="text.secondary">Find rooms, people, and content</Typography>
        </Box>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..."
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['all', 'rooms', 'people', 'notes'].map((f) => (
              <Chip
                key={f}
                label={f.charAt(0).toUpperCase() + f.slice(1)}
                onClick={() => setFilter(f)}
                color={filter === f ? 'primary' : 'default'}
                variant={filter === f ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Stack>

        <Stack spacing={2}>
          {filteredResults.map((result) => (
            <Card
              key={`${result.type}-${result.id}`}
              component={Link}
              to={result.type === 'room' ? `/workspace/${result.id}` : result.type === 'person' ? `/profile/${result.id}` : '#'}
              sx={{ textDecoration: 'none', '&:hover': { boxShadow: 3 } }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'grey.100' }}>
                  {result.type === 'room' && <Folder size={20} />}
                  {result.type === 'person' && <Users size={20} />}
                  {result.type === 'note' && <FileText size={20} />}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight={500}>{result.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.category || result.role || result.room}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {result.type}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {filteredResults.length === 0 && query && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No results found for "{query}"</Typography>
          </Box>
        )}

        {!query && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <SearchIcon size={48} style={{ color: '#ccc', marginBottom: 16 }} />
            <Typography color="text.secondary">Start typing to search</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
