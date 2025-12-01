import { useState } from 'react';
import { Box, Typography, Stack, TextField, IconButton, Avatar, Chip, Paper } from '@mui/material';
import { Send, Sparkles, Lightbulb, Code, FileText, Zap } from 'lucide-react';

const SUGGESTIONS = [
  { icon: <Lightbulb size={14} />, text: 'Summarize recent activity', color: 'warning' },
  { icon: <Code size={14} />, text: 'Review code changes', color: 'info' },
  { icon: <FileText size={14} />, text: 'Generate meeting notes', color: 'success' },
  { icon: <Zap size={14} />, text: 'Suggest next tasks', color: 'error' },
];

const MESSAGES = [
  {
    role: 'assistant',
    content: 'Hello! I\'m your workspace AI assistant. I can help you with tasks, analyze your work, generate content, and answer questions about your project.',
    time: '10:30 AM',
  },
  {
    role: 'user',
    content: 'What are the pending tasks for this week?',
    time: '10:32 AM',
  },
  {
    role: 'assistant',
    content: 'Based on your Task Board, you have 3 pending tasks:\n\n1. Design new landing page (High priority, 2h)\n2. Update API documentation (Medium priority, 4h)\n3. Implement auth flow (High priority, 6h)\n\nWould you like me to help prioritize these?',
    time: '10:32 AM',
  },
];

export default function AIAgentPanel() {
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, {
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m processing your request. This is a demo response showing AI capabilities.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkles size={20} color="white" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
            AI Assistant
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Context-aware workspace helper
          </Typography>
        </Box>
      </Stack>

      {/* Quick Suggestions */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {SUGGESTIONS.map((suggestion, i) => (
            <Chip
              key={i}
              icon={suggestion.icon}
              label={suggestion.text}
              size="small"
              clickable
              sx={{ bgcolor: 'white' }}
            />
          ))}
        </Stack>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={2}>
          {messages.map((message, i) => (
            <Stack
              key={i}
              direction="row"
              spacing={1.5}
              sx={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              {message.role === 'assistant' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                  }}
                >
                  <Sparkles size={16} />
                </Avatar>
              )}
              
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    borderTopLeftRadius: message.role === 'assistant' ? 0 : 2,
                    borderTopRightRadius: message.role === 'user' ? 0 : 2,
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    mt: 0.5,
                    display: 'block',
                    textAlign: message.role === 'user' ? 'right' : 'left',
                  }}
                >
                  {message.time}
                </Typography>
              </Box>

              {message.role === 'user' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'secondary.main',
                  }}
                >
                  U
                </Avatar>
              )}
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask AI anything about your workspace..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&.Mui-disabled': { bgcolor: 'grey.200' },
            }}
          >
            <Send size={18} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
