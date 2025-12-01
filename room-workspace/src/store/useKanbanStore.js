import { create } from 'zustand';

export const useKanbanStore = create((set) => ({
  columns: {
    'todo': { id: 'todo', title: 'To Do', cardIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', cardIds: [] },
    'review': { id: 'review', title: 'Review', cardIds: [] },
    'done': { id: 'done', title: 'Done', cardIds: [] },
  },
  cards: {},
  columnOrder: ['todo', 'in-progress', 'review', 'done'],

  initializeUserCard: (userId, userName) =>
    set((state) => {
      const existingCard = Object.values(state.cards).find(card => card.userId === userId);
      if (existingCard) return state;

      const cardId = `card-${userId}-${Date.now()}`;
      const newCard = {
        id: cardId,
        userId,
        userName,
        title: `${userName}'s Tasks`,
        description: '',
        tasks: [],
        color: getRandomColor(),
      };

      return {
        cards: { ...state.cards, [cardId]: newCard },
        columns: {
          ...state.columns,
          'todo': {
            ...state.columns['todo'],
            cardIds: [...state.columns['todo'].cardIds, cardId],
          },
        },
      };
    }),

  moveCard: (cardId, sourceColumnId, destColumnId, destIndex) =>
    set((state) => {
      const sourceColumn = state.columns[sourceColumnId];
      const destColumn = state.columns[destColumnId];
      
      const newSourceCardIds = sourceColumn.cardIds.filter(id => id !== cardId);
      const newDestCardIds = sourceColumnId === destColumnId 
        ? newSourceCardIds 
        : [...destColumn.cardIds];
      
      newDestCardIds.splice(destIndex, 0, cardId);

      return {
        columns: {
          ...state.columns,
          [sourceColumnId]: { ...sourceColumn, cardIds: newSourceCardIds },
          [destColumnId]: { ...destColumn, cardIds: newDestCardIds },
        },
      };
    }),

  updateCard: (cardId, updates) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], ...updates },
      },
    })),

  addTask: (cardId, task) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          tasks: [...state.cards[cardId].tasks, { id: Date.now(), text: task, completed: false }],
        },
      },
    })),

  toggleTask: (cardId, taskId) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          tasks: state.cards[cardId].tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        },
      },
    })),

  deleteTask: (cardId, taskId) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          tasks: state.cards[cardId].tasks.filter(task => task.id !== taskId),
        },
      },
    })),
}));

const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
