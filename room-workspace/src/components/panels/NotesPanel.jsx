import { Box, TextField, Button, List, ListItem, ListItemIcon, ListItemText, Typography, InputAdornment } from '@mui/material';
import { FileText, Plus, Search } from 'lucide-react';

export default function NotesPanel() {
  const notes = [
    { id: 1, title: 'Meeting Notes - Sprint Planning', date: 'Today, 2:30 PM', preview: 'Discussed Q1 goals and deliverables...' },
    { id: 2, title: 'Project Ideas', date: 'Yesterday', preview: 'New feature concepts for the dashboard...' },
    { id: 3, title: 'Research - User Feedback', date: '2 days ago', preview: 'Compiled feedback from beta testers...' },
    { id: 4, title: 'Technical Documentation', date: 'Last week', preview: 'API endpoints and authentication flow...' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search notes..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
        <Button fullWidth variant="outlined" startIcon={<Plus size={16} />}>
          New Note
        </Button>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {notes.map((note) => (
          <ListItem key={note.id} sx={{ borderRadius: 1, '&:hover': { bgcolor: 'grey.50' }, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
              <FileText size={16} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" fontWeight={500}>{note.title}</Typography>}
              secondary={
                <>
                  <Typography variant="caption" display="block">{note.date}</Typography>
                  <Typography variant="caption" color="text.secondary">{note.preview}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
