import { Box } from '@mui/material';
import CanvasSpace from './CanvasSpace';

export default function KanbanRibbon() {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', bgcolor: 'grey.50' }}>
      <CanvasSpace />
    </Box>
  );
}
