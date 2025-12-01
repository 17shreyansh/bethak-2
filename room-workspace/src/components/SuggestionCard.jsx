import { Card, CardContent, Box, Typography, Stack, Button, IconButton } from '@mui/material';
import { X, ArrowRight, Sparkles, Users, Briefcase, BookOpen, TrendingUp } from 'lucide-react';

const iconMap = {
  people: Users,
  room: Briefcase,
  learning: BookOpen,
  trending: TrendingUp,
  ai: Sparkles
};

export default function SuggestionCard({ suggestion, onDismiss, onAction }) {
  const Icon = iconMap[suggestion.type] || Sparkles;

  return (
    <Card sx={{ 
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: suggestion.highlighted ? 'primary.50' : 'background.paper',
      transition: 'all 0.2s ease',
      '&:hover': { 
        boxShadow: 2,
        borderColor: 'primary.main',
      }
    }}>
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ 
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${suggestion.color || 'primary'}.100`,
            color: `${suggestion.color || 'primary'}.700`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} />
          </Box>
          
          <Stack spacing={1} flex={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {suggestion.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {suggestion.description}
                </Typography>
              </Box>
              {onDismiss && (
                <IconButton size="small" onClick={() => onDismiss(suggestion.id)}>
                  <X size={14} />
                </IconButton>
              )}
            </Stack>
            
            {suggestion.reason && (
              <Typography variant="caption" sx={{ 
                px: 1, 
                py: 0.5, 
                bgcolor: 'grey.100', 
                borderRadius: 1,
                display: 'inline-block',
                width: 'fit-content'
              }}>
                {suggestion.reason}
              </Typography>
            )}

            <Stack direction="row" spacing={1}>
              <Button 
                size="small" 
                variant="contained"
                endIcon={<ArrowRight size={14} />}
                onClick={() => onAction?.(suggestion)}
                sx={{ textTransform: 'none' }}
              >
                {suggestion.actionText || 'View'}
              </Button>
              {suggestion.secondaryAction && (
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => suggestion.secondaryAction()}
                  sx={{ textTransform: 'none' }}
                >
                  {suggestion.secondaryActionText}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
