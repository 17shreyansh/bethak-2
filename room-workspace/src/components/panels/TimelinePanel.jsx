import { Box, Typography, Stack, Chip, Avatar } from '@mui/material';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const MILESTONES = [
  { id: 1, title: 'Project Kickoff', date: '2024-01-15', status: 'completed', team: ['JD', 'SK'] },
  { id: 2, title: 'Design Phase Complete', date: '2024-02-01', status: 'completed', team: ['AM'] },
  { id: 3, title: 'Development Sprint 1', date: '2024-02-15', status: 'in-progress', team: ['RK', 'SK'] },
  { id: 4, title: 'Beta Testing', date: '2024-03-01', status: 'upcoming', team: ['JD', 'AM'] },
  { id: 5, title: 'Production Launch', date: '2024-03-15', status: 'upcoming', team: ['All'] },
];

export default function TimelinePanel() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'upcoming': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} />;
      case 'in-progress': return <Clock size={16} />;
      case 'upcoming': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Calendar size={24} color="#6366f1" />
          <Typography variant="h6" fontWeight={600}>Project Timeline</Typography>
        </Stack>

        <Box sx={{ position: 'relative', pl: 4 }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: 15,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: 'grey.200',
            }}
          />

          <Stack spacing={4}>
            {MILESTONES.map((milestone, index) => (
              <Box key={milestone.id} sx={{ position: 'relative' }}>
                {/* Timeline dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -28,
                    top: 8,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: milestone.status === 'completed' ? 'success.main' : 
                             milestone.status === 'in-progress' ? 'warning.main' : 'grey.300',
                    border: '3px solid',
                    borderColor: 'background.paper',
                    boxShadow: '0 0 0 2px',
                    boxShadowColor: milestone.status === 'completed' ? 'success.light' : 
                                   milestone.status === 'in-progress' ? 'warning.light' : 'grey.200',
                  }}
                />

                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: 'white',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {milestone.title}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(milestone.status)}
                        label={milestone.status.replace('-', ' ')}
                        size="small"
                        color={getStatusColor(milestone.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Calendar size={14} />
                        <Typography variant="caption">{milestone.date}</Typography>
                      </Stack>

                      <Stack direction="row" spacing={-1}>
                        {milestone.team.map((member, i) => (
                          <Avatar
                            key={i}
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: '0.7rem',
                              border: '2px solid white',
                            }}
                          >
                            {member}
                          </Avatar>
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
