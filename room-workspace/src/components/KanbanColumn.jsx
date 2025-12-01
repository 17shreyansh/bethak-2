import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper, Typography, Badge } from '@mui/material';
import KanbanCard from './KanbanCard';
import { useKanbanStore } from '../store/useKanbanStore';

export default function KanbanColumn({ column }) {
  const { setNodeRef } = useDroppable({ id: column?.id || 'unknown' });
  const { cards } = useKanbanStore();
  
  if (!column) return null;
  
  const columnCards = column.cardIds.map(cardId => cards[cardId]).filter(Boolean);

  return (
    <Paper
      sx={{
        minWidth: 320,
        maxWidth: 320,
        bgcolor: 'grey.50',
        p: 2,
        height: 'fit-content',
        maxHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={600}>
          {column.title}
        </Typography>
        <Badge badgeContent={columnCards.length} color="primary" />
      </Box>

      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 100,
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 3 },
        }}
      >
        <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
          {columnCards.map((card) => (
            <KanbanCard key={card.id} card={card} columnId={column.id} />
          ))}
        </SortableContext>
        
        {columnCards.length === 0 && (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              color: 'text.secondary',
              border: '2px dashed',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">Drop cards here</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
