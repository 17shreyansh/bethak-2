import { Card, CardContent, Box, Typography, Stack, Chip, Avatar, AvatarGroup, IconButton, LinearProgress } from '@mui/material';
import { Users, Lock, Globe, Star, MoreVertical, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoomCard({ room, variant = 'default' }) {
  const isCompact = variant === 'compact';

  return (
    <Card 
      component={Link} 
      to={`/workspace/${room.id}`}
      sx={{ 
        textDecoration: 'none',
        height: '100%',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { 
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
        }
      }}
    >
      <CardContent sx={{ p: isCompact ? 2 : 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
              <Box sx={{ 
                width: isCompact ? 40 : 48, 
                height: isCompact ? 40 : 48, 
                borderRadius: 2,
                background: `linear-gradient(135deg, ${room.color || '#6366f1'} 0%, ${room.colorEnd || '#8b5cf6'} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isCompact ? 20 : 24,
                flexShrink: 0
              }}>
                {room.icon || '📁'}
              </Box>
              <Box flex={1} minWidth={0}>
                <Typography variant={isCompact ? "body1" : "h6"} fontWeight={600} noWrap>
                  {room.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {room.category}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {room.starred && <Star size={14} fill="gold" color="gold" />}
              <IconButton size="small" onClick={(e) => e.preventDefault()}>
                <MoreVertical size={16} />
              </IconButton>
            </Stack>
          </Stack>

          {!isCompact && room.description && (
            <Typography variant="body2" color="text.secondary" sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {room.description}
            </Typography>
          )}

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {room.tags?.slice(0, isCompact ? 2 : 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
            ))}
            {room.tags?.length > (isCompact ? 2 : 3) && (
              <Chip label={`+${room.tags.length - (isCompact ? 2 : 3)}`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
            )}
          </Stack>

          {room.progress !== undefined && (
            <Box>
              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <Typography variant="caption" fontWeight={600}>{room.progress}%</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={room.progress} sx={{ height: 6, borderRadius: 1 }} />
            </Box>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                {room.visibility === 'private' ? <Lock size={14} /> : <Globe size={14} />}
                <Typography variant="caption" color="text.secondary">
                  {room.visibility}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Users size={14} />
                <Typography variant="caption" color="text.secondary">
                  {room.members}
                </Typography>
              </Stack>
              {room.trending && (
                <Chip icon={<TrendingUp size={12} />} label="Trending" size="small" color="error" sx={{ height: 20 }} />
              )}
            </Stack>
            {room.avatars && (
              <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                {room.avatars.map((avatar, i) => (
                  <Avatar key={i} src={avatar} sx={{ width: 24, height: 24 }} />
                ))}
              </AvatarGroup>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
