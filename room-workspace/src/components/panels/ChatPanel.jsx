import { Box, TextField, IconButton, Stack, Avatar, Typography, Paper } from '@mui/material';
import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatPanel() {
  const messages = [
    { id: 1, user: 'John Doe', text: 'Hey team, how is the project going?', time: '10:30 AM', avatar: 'JD', isOwn: false },
    { id: 2, user: 'Jane Smith', text: 'Making good progress on the frontend! The new design looks great.', time: '10:32 AM', avatar: 'JS', isOwn: false },
    { id: 3, user: 'You', text: 'Backend APIs are almost ready. Should be done by EOD.', time: '10:35 AM', avatar: 'ME', isOwn: true },
    { id: 4, user: 'Sarah Wilson', text: 'Perfect! Let me know when we can start integration testing.', time: '10:38 AM', avatar: 'SW', isOwn: false },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={1.5}>
          {messages.map((msg) => (
            <Stack key={msg.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              {!msg.isOwn && (
                <Avatar sx={{ width: 28, height: 28, bgcolor: 'grey.300', fontSize: '0.7rem', fontWeight: 500 }}>
                  {msg.avatar}
                </Avatar>
              )}
              <Box sx={{ flex: 1, maxWidth: msg.isOwn ? '70%' : '100%', ml: msg.isOwn ? 'auto' : 0 }}>
                {!msg.isOwn && (
                  <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" fontWeight={500}>{msg.user}</Typography>
                    <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                  </Stack>
                )}
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: msg.isOwn ? 'primary.main' : 'grey.100',
                    color: msg.isOwn ? 'white' : 'text.primary',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
                {msg.isOwn && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                    {msg.time}
                  </Typography>
                )}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box sx={{ borderTop: 1, borderColor: 'divider', p: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small">
            <Paperclip size={16} />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type a message..."
            size="small"
            multiline
            maxRows={3}
          />
          <IconButton size="small">
            <Smile size={16} />
          </IconButton>
          <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
            <Send size={16} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
