import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { MessageSquare, Upload, CheckCircle, UserPlus, FileText } from 'lucide-react';

export default function ActivityPanel() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'created a new task', time: '5m ago', icon: CheckCircle, color: 'success.main' },
    { id: 2, user: 'Jane Smith', action: 'uploaded Design System.pdf', time: '12m ago', icon: Upload, color: 'primary.main' },
    { id: 3, user: 'Mike Johnson', action: 'commented on Sprint Planning', time: '1h ago', icon: MessageSquare, color: 'grey.500' },
    { id: 4, user: 'Sarah Wilson', action: 'joined the workspace', time: '2h ago', icon: UserPlus, color: 'secondary.main' },
    { id: 5, user: 'John Doe', action: 'updated Meeting Notes', time: '3h ago', icon: FileText, color: 'warning.main' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <ListItem key={activity.id} sx={{ borderRadius: 1, '&:hover': { bgcolor: 'grey.50' }, alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                <Icon size={16} style={{ color: activity.color }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <Typography component="span" fontWeight={500}>{activity.user}</Typography> {activity.action}
                  </Typography>
                }
                secondary={activity.time}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
