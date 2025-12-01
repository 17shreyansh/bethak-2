import { Box, Typography, Stack, Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Badge } from '@mui/material';
import { Circle, Eye, Edit, MessageSquare, Code } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'JD',
    status: 'online',
    activity: 'Editing Task Board',
    icon: <Edit size={14} />,
    color: '#10b981',
    lastSeen: 'now',
  },
  {
    id: 2,
    name: 'Sarah Kim',
    avatar: 'SK',
    status: 'online',
    activity: 'Viewing Timeline',
    icon: <Eye size={14} />,
    color: '#3b82f6',
    lastSeen: 'now',
  },
  {
    id: 3,
    name: 'Alex Morgan',
    avatar: 'AM',
    status: 'online',
    activity: 'Typing in Chat...',
    icon: <MessageSquare size={14} />,
    color: '#f59e0b',
    lastSeen: 'now',
  },
  {
    id: 4,
    name: 'Rachel Kumar',
    avatar: 'RK',
    status: 'idle',
    activity: 'Idle',
    icon: <Circle size={14} />,
    color: '#94a3b8',
    lastSeen: '5m ago',
  },
  {
    id: 5,
    name: 'Mike Chen',
    avatar: 'MC',
    status: 'offline',
    activity: 'Offline',
    icon: <Circle size={14} />,
    color: '#cbd5e1',
    lastSeen: '2h ago',
  },
];

export default function TeamPresencePanel() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'idle': return 'warning';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const onlineCount = TEAM_MEMBERS.filter(m => m.status === 'online').length;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600}>
            Team Presence
          </Typography>
          <Chip
            label={`${onlineCount} online`}
            size="small"
            color="success"
            sx={{ fontWeight: 500 }}
          />
        </Stack>
      </Box>

      {/* Team List */}
      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {TEAM_MEMBERS.map((member) => (
          <ListItem
            key={member.id}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'grey.50',
              },
            }}
          >
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: member.status === 'online' ? 'success.main' :
                             member.status === 'idle' ? 'warning.main' : 'grey.400',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    border: '2px solid white',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: member.status === 'online' ? 'primary.main' : 'grey.400',
                    width: 40,
                    height: 40,
                  }}
                >
                  {member.avatar}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={500}>
                  {member.name}
                </Typography>
              }
              secondary={
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                  <Box sx={{ color: member.color }}>
                    {member.icon}
                  </Box>
                  <Typography variant="caption" sx={{ color: member.color }}>
                    {member.activity}
                  </Typography>
                </Stack>
              }
            />

            <Typography variant="caption" color="text.secondary">
              {member.lastSeen}
            </Typography>
          </ListItem>
        ))}
      </List>

      {/* Activity Summary */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Current Activity
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          <Chip icon={<Edit size={12} />} label="1 editing" size="small" />
          <Chip icon={<Eye size={12} />} label="1 viewing" size="small" />
          <Chip icon={<MessageSquare size={12} />} label="1 typing" size="small" />
        </Stack>
      </Box>
    </Box>
  );
}
