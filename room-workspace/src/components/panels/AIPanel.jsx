import { Box, Typography, Stack, Paper } from '@mui/material';
import { Sparkles, TrendingUp, Users, Clock } from 'lucide-react';

export default function AIPanel() {
  const suggestions = [
    { 
      id: 1, 
      text: 'Consider breaking down the large task into smaller subtasks for better tracking', 
      type: 'productivity',
      icon: TrendingUp,
      color: 'primary.main'
    },
    { 
      id: 2, 
      text: 'Schedule a team sync for project alignment - 3 members are available now', 
      type: 'collaboration',
      icon: Users,
      color: 'secondary.main'
    },
    { 
      id: 3, 
      text: 'Review and update project documentation - last updated 5 days ago', 
      type: 'documentation',
      icon: Clock,
      color: 'warning.main'
    },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Sparkles size={16} />
        <Typography variant="body2" fontWeight={500}>AI Suggestions</Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={2}>
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <Paper
                key={suggestion.id}
                variant="outlined"
                sx={{ p: 2, cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Icon size={16} style={{ marginTop: 2, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" gutterBottom>{suggestion.text}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {suggestion.type}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
