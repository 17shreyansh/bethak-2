import { Box, Typography, Stack, Card, CardContent, Grid, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, Activity, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const METRICS = [
  { label: 'Tasks Completed', value: 24, change: '+12%', trend: 'up', icon: <CheckCircle size={20} />, color: 'success' },
  { label: 'Active Members', value: 8, change: '+2', trend: 'up', icon: <Activity size={20} />, color: 'primary' },
  { label: 'Messages Today', value: 156, change: '+23%', trend: 'up', icon: <MessageSquare size={20} />, color: 'info' },
  { label: 'Avg Response Time', value: '2.4h', change: '-15%', trend: 'down', icon: <Clock size={20} />, color: 'warning' },
];

const ACTIVITY_DATA = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 90 },
  { day: 'Thu', value: 81 },
  { day: 'Fri', value: 56 },
  { day: 'Sat', value: 32 },
  { day: 'Sun', value: 28 },
];

const TASK_PROGRESS = [
  { category: 'Design', completed: 12, total: 15, color: '#8b5cf6' },
  { category: 'Development', completed: 8, total: 20, color: '#3b82f6' },
  { category: 'Testing', completed: 5, total: 8, color: '#10b981' },
  { category: 'Documentation', completed: 3, total: 5, color: '#f59e0b' },
];

export default function AnalyticsPanel() {
  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>Workspace Analytics</Typography>
          <Chip label="Last 7 days" size="small" variant="outlined" />
        </Stack>

        {/* Metrics Grid */}
        <Grid container spacing={2}>
          {METRICS.map((metric, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: `${metric.color}.50`,
                          color: `${metric.color}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Chip
                        icon={metric.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        label={metric.change}
                        size="small"
                        color={metric.trend === 'up' ? 'success' : 'error'}
                        sx={{ height: 24 }}
                      />
                    </Stack>
                    <Box>
                      <Typography variant="h4" fontWeight={700}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.label}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Activity Chart */}
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Weekly Activity
            </Typography>
            <Stack spacing={2}>
              {ACTIVITY_DATA.map((item, i) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ minWidth: 40, color: 'text.secondary' }}>
                    {item.day}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 1,
                          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 40, textAlign: 'right' }}>
                    {item.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Task Progress */}
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Task Progress by Category
            </Typography>
            <Stack spacing={2.5}>
              {TASK_PROGRESS.map((item, i) => (
                <Box key={i}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.completed}/{item.total}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(item.completed / item.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 1,
                        bgcolor: item.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
