import { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Stack, Chip, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import { Search, UserPlus } from 'lucide-react';

export default function PeopleSearch() {
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');

  const people = [
    { id: 1, name: 'John Doe', avatar: 'JD', skills: ['React', 'UI/UX'], bio: 'Frontend developer passionate about design', status: 'available' },
    { id: 2, name: 'Jane Smith', avatar: 'JS', skills: ['Python', 'ML'], bio: 'Data scientist and AI enthusiast', status: 'busy' },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', skills: ['Design', 'Figma'], bio: 'Product designer with 5 years experience', status: 'available' },
    { id: 4, name: 'Sarah Wilson', avatar: 'SW', skills: ['Writing', 'SEO'], bio: 'Content strategist and copywriter', status: 'available' },
  ];

  const skills = ['all', 'React', 'Python', 'Design', 'Writing', 'ML', 'UI/UX'];

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = skillFilter === 'all' || person.skills.includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>Find Collaborators</Typography>
          <Typography variant="body1" color="text.secondary">Connect with talented people for your projects</Typography>
        </Box>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill === 'all' ? 'All Skills' : skill}
                onClick={() => setSkillFilter(skill)}
                color={skillFilter === skill ? 'primary' : 'default'}
                variant={skillFilter === skill ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {filteredPeople.map((person) => (
            <Grid item xs={12} md={6} lg={4} key={person.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 3 } }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.400', fontSize: '1.5rem' }}>
                        {person.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600}>{person.name}</Typography>
                        <Chip
                          label={person.status}
                          size="small"
                          color={person.status === 'available' ? 'success' : 'warning'}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">{person.bio}</Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {person.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" variant="outlined" />
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<UserPlus size={16} />}
                    >
                      Invite to Room
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPeople.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No people found. Try adjusting your filters.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
