import { Box } from '@mui/material';
import { useEffect } from 'react';
import CanvasCard from './CanvasCard';
import { useCanvasStore } from '../store/useCanvasStore';
import { useAuthStore } from '../store/useAuthStore';

export default function CanvasSpace() {
  const { cards, initializeUserCard } = useCanvasStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      initializeUserCard(user.id, user.name);
    }
  }, [user, initializeUserCard]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 500,
        bgcolor: 'grey.100',
        backgroundImage: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        overflow: 'auto',
      }}
    >
      {Object.values(cards).map((card) => (
        <CanvasCard key={card.id} card={card} />
      ))}
    </Box>
  );
}
