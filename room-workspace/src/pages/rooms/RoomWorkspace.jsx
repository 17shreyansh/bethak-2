import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, Tabs, Tab, Stack, Avatar, AvatarGroup, IconButton, Chip } from '@mui/material';
import { Settings, Users, MessageSquare, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import CanvasSpace from '../../components/CanvasSpace';
import { useRoomsStore } from '../../store/useRoomsStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function RoomWorkspace() {
  const { id } = useParams();
  const { rooms } = useRoomsStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  
  const room = rooms.find(r => r.id === parseInt(id));

  if (!room) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Room not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Paper sx={{ borderRadius: 0, mb: 2 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" py={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                {room.icon || '🚀'}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {room.name}
                </Typography>
                <Stack direction="row" spacing={1} mt={0.5}>
                  <Chip label={room.category} size="small" />
                  {room.tags?.map(tag => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <AvatarGroup max={4}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.name?.[0] || 'U'}
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>B</Avatar>
              </AvatarGroup>
              <IconButton>
                <MessageSquare size={20} />
              </IconButton>

              <IconButton>
                <Settings size={20} />
              </IconButton>
            </Stack>
          </Stack>

          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)}
            variant="standard"
            sx={{
              '& .MuiTabs-scrollButtons': { display: 'none' },
              '& .MuiTabs-scroller': { overflow: 'visible !important' }
            }}
          >
            <Tab label="Canvas Space" />
            <Tab label="Files" />
            <Tab label="Chat" />
            <Tab label="Activity" />
          </Tabs>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 0 }}>
        {activeTab === 0 && <CanvasSpace />}
        {activeTab === 1 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Files view coming soon</Typography>
          </Paper>
        )}
        {activeTab === 2 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Chat view coming soon</Typography>
          </Paper>
        )}
        {activeTab === 3 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Activity view coming soon</Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
