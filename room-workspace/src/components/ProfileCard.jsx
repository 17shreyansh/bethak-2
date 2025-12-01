import { Card, CardContent, Box, Typography, Stack, Chip, Avatar, Button, IconButton } from '@mui/material';
import { Mail, MessageCircle, UserPlus, MapPin, Briefcase, Star, MoreVertical } from 'lucide-react';

export default function ProfileCard({ profile, variant = 'default' }) {
  const isCompact = variant === 'compact';

  return (
    <Card sx={{ 
      height: '100%',
      transition: 'all 0.3s ease',
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': { 
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transform: 'translateY(-4px)',
      }
    }}>
      <CardContent sx={{ p: isCompact ? 2 : 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src={profile.avatar} 
                  sx={{ 
                    width: isCompact ? 48 : 64, 
                    height: isCompact ? 48 : 64,
                    border: '3px solid',
                    borderColor: profile.online ? 'success.main' : 'divider'
                  }}
                >
                  {profile.name?.[0]}
                </Avatar>
                {profile.online && (
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 2, 
                    right: 2, 
                    width: 12, 
                    height: 12, 
                    bgcolor: 'success.main',
                    border: '2px solid white',
                    borderRadius: '50%'
                  }} />
                )}
              </Box>
              <Box>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant={isCompact ? "body1" : "h6"} fontWeight={600}>
                    {profile.name}
                  </Typography>
                  {profile.verified && <Star size={14} fill="gold" color="gold" />}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  @{profile.username}
                </Typography>
              </Box>
            </Stack>
            <IconButton size="small">
              <MoreVertical size={16} />
            </IconButton>
          </Stack>

          {!isCompact && (
            <>
              <Stack spacing={0.5}>
                {profile.role && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Briefcase size={14} color="#666" />
                    <Typography variant="body2">{profile.role}</Typography>
                  </Stack>
                )}
                {profile.location && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MapPin size={14} color="#666" />
                    <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
                  </Stack>
                )}
              </Stack>

              {profile.bio && (
                <Typography variant="body2" color="text.secondary" sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {profile.bio}
                </Typography>
              )}
            </>
          )}

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {profile.skills?.slice(0, isCompact ? 2 : 4).map((skill) => (
              <Chip key={skill} label={skill} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
            ))}
            {profile.skills?.length > (isCompact ? 2 : 4) && (
              <Chip label={`+${profile.skills.length - (isCompact ? 2 : 4)}`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
            )}
          </Stack>

          {!isCompact && profile.stats && (
            <Stack direction="row" spacing={3}>
              <Box>
                <Typography variant="h6" fontWeight={700}>{profile.stats.projects}</Typography>
                <Typography variant="caption" color="text.secondary">Projects</Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{profile.stats.connections}</Typography>
                <Typography variant="caption" color="text.secondary">Connections</Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{profile.stats.rating}</Typography>
                <Typography variant="caption" color="text.secondary">Rating</Typography>
              </Box>
            </Stack>
          )}

          <Stack direction="row" spacing={1}>
            <Button 
              variant="contained" 
              size="small" 
              startIcon={<UserPlus size={14} />}
              fullWidth
            >
              Connect
            </Button>
            <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <MessageCircle size={16} />
            </IconButton>
            <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Mail size={16} />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
