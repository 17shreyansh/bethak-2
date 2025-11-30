import { Box, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Upload, File, ExternalLink } from 'lucide-react';

export default function ResourcesPanel() {
  const resources = [
    { id: 1, name: 'Design System.pdf', type: 'PDF', size: '2.4 MB', icon: File },
    { id: 2, name: 'API Documentation', type: 'Link', url: '#', icon: ExternalLink },
    { id: 3, name: 'Wireframes.fig', type: 'Figma', size: '1.8 MB', icon: File },
    { id: 4, name: 'Brand Guidelines', type: 'Link', url: '#', icon: ExternalLink },
    { id: 5, name: 'Sprint Report.xlsx', type: 'Excel', size: '856 KB', icon: File },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Button fullWidth variant="outlined" startIcon={<Upload size={16} />}>
          Upload
        </Button>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <ListItem key={resource.id} sx={{ borderRadius: 1, '&:hover': { bgcolor: 'grey.50' } }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon size={16} />
              </ListItemIcon>
              <ListItemText
                primary={resource.name}
                secondary={`${resource.type}${resource.size ? ` • ${resource.size}` : ''}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
