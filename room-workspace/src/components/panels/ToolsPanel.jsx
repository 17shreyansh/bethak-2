import { Box, List, ListItemButton, ListItemIcon, ListItemText, Badge } from '@mui/material';
import { Settings, Calendar, Bell, Search, Bookmark, Clock, Video, Share2 } from 'lucide-react';

export default function ToolsPanel() {
  const tools = [
    { id: 1, name: 'Settings', icon: Settings, badge: null },
    { id: 2, name: 'Calendar', icon: Calendar, badge: 3 },
    { id: 3, name: 'Notifications', icon: Bell, badge: 12 },
    { id: 4, name: 'Search', icon: Search, badge: null },
    { id: 5, name: 'Bookmarks', icon: Bookmark, badge: null },
    { id: 6, name: 'History', icon: Clock, badge: null },
    { id: 7, name: 'Video Call', icon: Video, badge: null },
    { id: 8, name: 'Share', icon: Share2, badge: null },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <ListItemButton key={tool.id} sx={{ borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon size={18} />
              </ListItemIcon>
              <ListItemText primary={tool.name} />
              {tool.badge && (
                <Badge badgeContent={tool.badge} color="primary" />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
