import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Badge } from '@mui/material';
import { UserPlus } from 'lucide-react';

export default function MembersPanel() {
  const members = [
    { id: 1, name: 'John Doe', status: 'online', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', status: 'online', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', status: 'away', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', status: 'offline', avatar: 'SW' },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Button fullWidth variant="outlined" startIcon={<UserPlus size={16} />}>
          Add Member
        </Button>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {members.map((member) => (
          <ListItem key={member.id} sx={{ borderRadius: 1, '&:hover': { bgcolor: 'grey.50' } }}>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: member.status === 'online' ? 'success.main' : member.status === 'away' ? 'warning.main' : 'grey.400'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'grey.400' }}>{member.avatar}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={member.status} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
