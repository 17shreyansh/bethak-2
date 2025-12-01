import { create } from 'zustand';

export const useCanvasStore = create((set) => ({
  cards: {},

  initializeUserCard: (userId, userName) =>
    set((state) => {
      const existingCard = Object.values(state.cards).find(card => card.userId === userId);
      if (existingCard) return state;

      const cardId = `card-${userId}-${Date.now()}`;
      return {
        cards: {
          ...state.cards,
          [cardId]: {
            id: cardId,
            userId,
            userName,
            x: Math.random() * 300 + 50,
            y: Math.random() * 200 + 50,
            width: 400,
            height: 500,
            color: getRandomColor(),
            blocks: [],
          },
        },
      };
    }),

  updateCardPosition: (cardId, x, y) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], x, y },
      },
    })),

  updateCardSize: (cardId, width, height) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], width, height },
      },
    })),

  addBlock: (cardId, type) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          blocks: [
            ...state.cards[cardId].blocks,
            { id: Date.now(), type, content: getDefaultContent(type) },
          ],
        },
      },
    })),

  updateBlock: (cardId, blockId, content) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          blocks: state.cards[cardId].blocks.map(block =>
            block.id === blockId ? { ...block, content } : block
          ),
        },
      },
    })),

  deleteBlock: (cardId, blockId) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          blocks: state.cards[cardId].blocks.filter(block => block.id !== blockId),
        },
      },
    })),
}));

const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getDefaultContent(type) {
  switch (type) {
    case 'text': return 'Type something...';
    case 'heading': return 'Heading';
    case 'list': return ['Item 1', 'Item 2'];
    case 'checklist': return [{ text: 'Task 1', checked: false }];
    case 'image': return '';
    case 'link': return '';
    default: return '';
  }
}
