import { useState } from 'react';
import { Box, TextField, Button, List, ListItem, Checkbox, Typography, Stack, Chip, IconButton, InputAdornment } from '@mui/material';
import { Plus, Circle, CheckCircle2, Clock, User, Search } from 'lucide-react';

export default function TasksPanel() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const tasks = [
    { id: 1, title: 'Design new landing page', completed: false, priority: 'high', assignee: 'Sarah', due: 'Today' },
    { id: 2, title: 'Review pull request #234', completed: false, priority: 'medium', assignee: 'Mike', due: 'Tomorrow' },
    { id: 3, title: 'Update documentation', completed: true, priority: 'low', assignee: 'You', due: 'Yesterday' },
    { id: 4, title: 'Fix authentication bug', completed: false, priority: 'high', assignee: 'John', due: 'Today' },
    { id: 5, title: 'Prepare demo presentation', completed: false, priority: 'medium', assignee: 'You', due: 'Next week' },
  ];

  const filtered = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !t.completed) ||
      (filter === 'completed' && t.completed);
    return matchesSearch && matchesFilter;
  });

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success',
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1.5 }}
        />
        <Stack direction="row" spacing={1}>
          {['all', 'active', 'completed'].map((f) => (
            <Chip
              key={f}
              label={f}
              size="small"
              onClick={() => setFilter(f)}
              color={filter === f ? 'primary' : 'default'}
              variant={filter === f ? 'filled' : 'outlined'}
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {filtered.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <Checkbox
              checked={task.completed}
              icon={<Circle size={18} />}
              checkedIcon={<CheckCircle2 size={18} />}
              sx={{ mr: 1 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary',
                  fontWeight: 500,
                }}
              >
                {task.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip
                  label={task.priority}
                  size="small"
                  color={priorityColors[task.priority]}
                  sx={{ height: 18, fontSize: '0.7rem' }}
                />
                <Chip
                  icon={<User size={10} />}
                  label={task.assignee}
                  size="small"
                  variant="outlined"
                  sx={{ height: 18, fontSize: '0.7rem' }}
                />
                <Chip
                  icon={<Clock size={10} />}
                  label={task.due}
                  size="small"
                  variant="outlined"
                  sx={{ height: 18, fontSize: '0.7rem' }}
                />
              </Stack>
            </Box>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button fullWidth variant="outlined" startIcon={<Plus size={16} />}>
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
