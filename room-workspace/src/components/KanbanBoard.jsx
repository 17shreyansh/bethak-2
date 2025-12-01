import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { useKanbanStore } from '../store/useKanbanStore';
import { useAuthStore } from '../store/useAuthStore';

export default function KanbanBoard() {
  const { columns, columnOrder, cards, moveCard, initializeUserCard } = useKanbanStore();
  const { user } = useAuthStore();
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (user) {
      initializeUserCard(user.id, user.name);
    }
  }, [user, initializeUserCard]);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveCard(cards[active.id]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveCard(null);
      return;
    }

    const activeCard = cards[active.id];
    if (!activeCard || activeCard.userId !== user?.id) {
      setActiveCard(null);
      return;
    }

    const activeColumnId = Object.keys(columns).find(colId =>
      columns[colId].cardIds.includes(active.id)
    );

    let overColumnId = over.id;
    if (cards[over.id]) {
      overColumnId = Object.keys(columns).find(colId =>
        columns[colId].cardIds.includes(over.id)
      );
    }

    if (!activeColumnId || !overColumnId) {
      setActiveCard(null);
      return;
    }

    const overColumn = columns[overColumnId];
    const overIndex = overColumn.cardIds.indexOf(over.id);
    const newIndex = overIndex >= 0 ? overIndex : overColumn.cardIds.length;

    moveCard(active.id, activeColumnId, overColumnId, newIndex);
    setActiveCard(null);
  };

  const handleDragCancel = () => {
    setActiveCard(null);
  };

  if (!columns || !columnOrder) {
    return <Box sx={{ p: 3 }}>Loading Kanban board...</Box>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Box
        sx={{
          p: 3,
          overflowX: 'auto',
          height: '100%',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 4 },
        }}
      >
        <Stack direction="row" spacing={3} sx={{ minWidth: 'fit-content' }}>
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            if (!column) return null;
            return <KanbanColumn key={columnId} column={column} />;
          })}
        </Stack>
      </Box>

      <DragOverlay>
        {activeCard ? (
          <Box sx={{ transform: 'rotate(5deg)', cursor: 'grabbing' }}>
            <KanbanCard card={activeCard} columnId="" />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
