import { useState } from 'react';
import { Box, Typography, Stack, IconButton, Chip, Avatar, TextField, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Search, FileText, Image, File, Folder, MoreVertical, Download, Star, Clock } from 'lucide-react';

const FILES = [
  { id: 1, name: 'Project Brief.pdf', type: 'pdf', size: '2.4 MB', modified: '2h ago', starred: true, tags: ['important'] },
  { id: 2, name: 'Design Mockups', type: 'folder', items: 12, modified: '5h ago', starred: false },
  { id: 3, name: 'Screenshot_2024.png', type: 'image', size: '1.2 MB', modified: '1d ago', starred: false, tags: ['design'] },
  { id: 4, name: 'Meeting Notes.md', type: 'doc', size: '45 KB', modified: '3d ago', starred: true, tags: ['notes'] },
  { id: 5, name: 'API Documentation.pdf', type: 'pdf', size: '890 KB', modified: '1w ago', starred: false },
];

export default function FileDrawerPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const getFileIcon = (type) => {
    switch (type) {
      case 'folder': return <Folder size={20} />;
      case 'image': return <Image size={20} />;
      case 'pdf':
      case 'doc': return <FileText size={20} />;
      default: return <File size={20} />;
    }
  };

  const filteredFiles = FILES.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {filteredFiles.map(file => (
          <ListItem
            key={file.id}
            disablePadding
            secondaryAction={
              <Stack direction="row" spacing={0.5}>
                {file.starred && <Star size={14} fill="currentColor" color="#f59e0b" />}
                <IconButton size="small" edge="end">
                  <MoreVertical size={16} />
                </IconButton>
              </Stack>
            }
            sx={{ mb: 0.5 }}
          >
            <ListItemButton
              selected={selectedFile === file.id}
              onClick={() => setSelectedFile(file.id)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  '&:hover': {
                    bgcolor: 'primary.100',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                {getFileIcon(file.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={500} noWrap>
                    {file.name}
                  </Typography>
                }
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {file.size || `${file.items} items`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">•</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {file.modified}
                    </Typography>
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {selectedFile && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" fontWeight={600}>Quick Actions</Typography>
            <Stack direction="row" spacing={1}>
              <Chip icon={<Download size={14} />} label="Download" size="small" clickable />
              <Chip icon={<Star size={14} />} label="Star" size="small" clickable />
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
