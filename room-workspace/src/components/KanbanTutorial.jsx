import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Box, Stepper, Step, StepLabel } from '@mui/material';
import { GripVertical, Edit2, Plus, CheckSquare } from 'lucide-react';
import { useState } from 'react';

export default function KanbanTutorial({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Your Personal Card',
      icon: <Edit2 size={32} />,
      description: 'Each member gets their own card. Only you can edit your card, but everyone can see it.',
    },
    {
      title: 'Drag & Drop',
      icon: <GripVertical size={32} />,
      description: 'Drag your card between columns to update your status: To Do → In Progress → Review → Done',
    },
    {
      title: 'Add Tasks',
      icon: <Plus size={32} />,
      description: 'Break down your work into smaller tasks. Click the + button to add tasks to your card.',
    },
    {
      title: 'Track Progress',
      icon: <CheckSquare size={32} />,
      description: 'Check off tasks as you complete them. Your progress is visible to the whole team!',
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight={700}>
          Welcome to Kanban Board! 🎉
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <Stack spacing={3} alignItems="center" sx={{ py: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {steps[activeStep].icon}
          </Box>
          
          <Typography variant="h6" fontWeight={600} textAlign="center">
            {steps[activeStep].title}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {steps[activeStep].description}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Skip</Button>
        <Box sx={{ flex: 1 }} />
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
