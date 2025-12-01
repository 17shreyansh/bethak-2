import { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton, Button, TextField, Card, CardContent, Grid, Chip } from '@mui/material';
import { Timer, Clock, StickyNote, Bell, Play, Pause, RotateCcw, Plus } from 'lucide-react';

export default function MiniAppsPanel() {
  const [activeApp, setActiveApp] = useState('pomodoro');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Review pull requests', color: '#fef3c7' },
    { id: 2, text: 'Update documentation', color: '#dbeafe' },
  ]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        text: newNote,
        color: ['#fef3c7', '#dbeafe', '#fce7f3', '#d1fae5'][Math.floor(Math.random() * 4)],
      }]);
      setNewNote('');
    }
  };

  const apps = [
    { id: 'pomodoro', label: 'Pomodoro', icon: <Timer size={16} /> },
    { id: 'notes', label: 'Quick Notes', icon: <StickyNote size={16} /> },
    { id: 'reminders', label: 'Reminders', icon: <Bell size={16} /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* App Selector */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'grey.50',
        }}
      >
        {apps.map(app => (
          <Chip
            key={app.id}
            icon={app.icon}
            label={app.label}
            onClick={() => setActiveApp(app.id)}
            color={activeApp === app.id ? 'primary' : 'default'}
            sx={{
              fontWeight: activeApp === app.id ? 600 : 400,
            }}
          />
        ))}
      </Stack>

      {/* App Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {activeApp === 'pomodoro' && (
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '8px solid',
                borderColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.50',
              }}
            >
              <Typography variant="h2" fontWeight={700} color="primary.main">
                {formatTime(pomodoroTime)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <IconButton
                size="large"
                onClick={() => setIsRunning(!isRunning)}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </IconButton>
              <IconButton
                size="large"
                onClick={() => {
                  setPomodoroTime(25 * 60);
                  setIsRunning(false);
                }}
                sx={{
                  bgcolor: 'grey.200',
                  '&:hover': { bgcolor: 'grey.300' },
                }}
              >
                <RotateCcw size={24} />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Chip label="25 min" onClick={() => setPomodoroTime(25 * 60)} clickable />
              <Chip label="15 min" onClick={() => setPomodoroTime(15 * 60)} clickable />
              <Chip label="5 min" onClick={() => setPomodoroTime(5 * 60)} clickable />
            </Stack>
          </Stack>
        )}

        {activeApp === 'notes' && (
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add a quick note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <IconButton color="primary" onClick={handleAddNote}>
                <Plus size={20} />
              </IconButton>
            </Stack>

            <Grid container spacing={2}>
              {notes.map(note => (
                <Grid item xs={12} sm={6} key={note.id}>
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: note.color,
                      border: 1,
                      borderColor: 'divider',
                      minHeight: 100,
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2">{note.text}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {activeApp === 'reminders' && (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No reminders set
            </Typography>
            <Button variant="outlined" startIcon={<Plus size={16} />}>
              Add Reminder
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
