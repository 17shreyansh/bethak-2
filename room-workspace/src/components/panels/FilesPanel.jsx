import { useState } from 'react';
import { Box, TextField, InputAdornment, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Stack, Chip } from '@mui/material';
import { Search, File, Folder, Image, FileText, Code, Download, MoreVertical, Upload } from 'lucide-react';

export default function FilesPanel() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');

  const files = [
    { id: 1, name: 'Project Brief.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago', icon: FileText },
    { id: 2, name: 'Design Assets', type: 'folder', items: 12, modified: 'Yesterday', icon: Folder },
    { id: 3, name: 'screenshot.png', type: 'image', size: '1.2 MB', modified: 'Today', icon: Image },
    { id: 4, name: 'main.jsx', type: 'code', size: '8 KB', modified: '1 hour ago', icon: Code },
    { id: 5, name: 'Meeting Notes.md', type: 'markdown', size: '4 KB', modified: '3 hours ago', icon: FileText },
    { id: 6, name: 'Resources', type: 'folder', items: 8, modified: 'Last week', icon: Folder },
  ];

  const filtered = files.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          <IconButton size="small" sx={{ bgcolor: 'grey.100' }}>
            <Upload size={16} />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <Chip label={`${files.length} items`} size="small" />
        </Stack>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {filtered.map((file) => {
          const Icon = file.icon;
          return (
            <ListItem
              key={file.id}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                border: '1px solid transparent',
                '&:hover': {
                  bgcolor: 'grey.50',
                  borderColor: 'divider',
                },
              }}
              secondaryAction={
                <IconButton size="small">
                  <MoreVertical size={14} />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: file.type === 'folder' ? 'primary.50' : 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: file.type === 'folder' ? 'primary.main' : 'text.secondary',
                  }}
                >
                  <Icon size={16} />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={file.type === 'folder' ? `${file.items} items` : `${file.size} • ${file.modified}`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
