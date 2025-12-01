import { Box, Container, Typography, Paper, Stack, Alert } from '@mui/material';
import { Info } from 'lucide-react';
import CanvasSpace from '../../components/CanvasSpace';
import { useAuthStore } from '../../store/useAuthStore';

export default function KanbanDemo() {
  const { user } = useAuthStore();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={700}>
              Canvas Space Demo
            </Typography>
            <Alert severity="info" icon={<Info size={20} />}>
              <Typography variant="body2">
                <strong>How it works:</strong> Each member gets their own draggable card. Add rich content like headings, text, lists, checklists, images, and links. 
                Drag your card anywhere on the canvas. Resize it to fit your content. Only you can edit your card, but everyone can see it.
              </Typography>
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Logged in as: <strong>{user?.name || 'Guest'}</strong>
            </Typography>
          </Stack>
        </Paper>

        <CanvasSpace />
      </Container>
    </Box>
  );
}
