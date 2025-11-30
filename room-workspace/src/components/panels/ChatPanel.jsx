import { Box, TextField, IconButton, Stack, Avatar, Typography, Paper } from '@mui/material';
import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatPanel() {
  const messages = [
    { id: 1, user: 'John Doe', text: 'Hey team, how is the project going?', time: '10:30 AM', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', text: 'Making good progress on the frontend! The new design looks great.', time: '10:32 AM', avatar: 'JS' },
    { id: 3, user: 'Mike Johnson', text: 'Backend APIs are almost ready. Should be done by EOD.', time: '10:35 AM', avatar: 'MJ' },
    { id: 4, user: 'Sarah Wilson', text: 'Perfect! Let me know when we can start integration testing.', time: '10:38 AM', avatar: 'SW' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Stack key={msg.id} direction="row" spacing={1.5}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.400', fontSize: '0.75rem' }}>
                {msg.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="body2" fontWeight={500}>{msg.user}</Typography>
                  <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">{msg.text}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Type a message..."
              size="small"
            />
            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
              <IconButton size="small">
                <Paperclip size={16} />
              </IconButton>
              <IconButton size="small">
                <Smile size={16} />
              </IconButton>
            </Stack>
          </Box>
          <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
            <Send size={16} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
