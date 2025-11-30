import { Box, Chip, Stack, IconButton } from '@mui/material';
import { Plus } from 'lucide-react';

export default function KanbanPanel() {
  const columns = [
    { id: 1, title: 'To Do', count: 3, color: 'default' },
    { id: 2, title: 'In Progress', count: 2, color: 'primary' },
    { id: 3, title: 'Review', count: 1, color: 'warning' },
    { id: 4, title: 'Done', count: 5, color: 'success' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 2, px: 2, overflowX: 'auto' }}>
      {columns.map((col) => (
        <Chip
          key={col.id}
          label={`${col.title} (${col.count})`}
          color={col.color}
          variant="outlined"
        />
      ))}
      <IconButton size="small" sx={{ border: 1, borderStyle: 'dashed', borderColor: 'divider' }}>
        <Plus size={16} />
      </IconButton>
    </Box>
  );
}
