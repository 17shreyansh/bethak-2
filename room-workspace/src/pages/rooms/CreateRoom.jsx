import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button, Stack, Stepper, Step, StepLabel, Paper, Radio, RadioGroup, FormControlLabel, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Check } from 'lucide-react';
import { useRoomsStore } from '../../store/useRoomsStore';

export default function CreateRoom() {
  const navigate = useNavigate();
  const { addRoom } = useRoomsStore();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Design',
    visibility: 'public',
    tags: [],
    icon: '🚀',
  });

  const categories = ['Design', 'Startup', 'Content', 'Software', 'Study'];
  const icons = ['🚀', '💡', '🎨', '📱', '💻', '📊', '🎯', '⚡'];
  const tagOptions = ['React', 'Design', 'UI/UX', 'Python', 'Marketing', 'Writing', 'ML', 'Figma'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now(),
      ...formData,
      members: 1,
      active: true,
    };
    addRoom(newRoom);
    navigate(`/workspace/${newRoom.id}`);
  };

  const steps = ['Basic Info', 'Category & Tags', 'Settings'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>Create New Room</Typography>
          <Typography variant="body1" color="text.secondary">Set up your collaborative workspace</Typography>
        </Box>

        <Stepper activeStep={step} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <Stack spacing={4}>
                <TextField
                  label="Room Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Awesome Project"
                  required
                  fullWidth
                />

                <Box>
                  <Typography variant="body2" fontWeight={500} gutterBottom>Room Icon</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {icons.map((icon) => (
                      <Button
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        variant={formData.icon === icon ? 'contained' : 'outlined'}
                        sx={{ minWidth: 48, height: 48, fontSize: '1.5rem' }}
                      >
                        {icon}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            )}

            {step === 1 && (
              <Stack spacing={4}>
                <Box>
                  <Typography variant="body2" fontWeight={500} gutterBottom>Category</Typography>
                  <Grid container spacing={2}>
                    {categories.map((cat) => (
                      <Grid item xs={6} sm={4} key={cat}>
                        <Button
                          fullWidth
                          variant={formData.category === cat ? 'contained' : 'outlined'}
                          onClick={() => setFormData({ ...formData, category: cat })}
                        >
                          {cat}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={500} gutterBottom>Skills/Tags</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {tagOptions.map((tag) => (
                      <Button
                        key={tag}
                        size="small"
                        variant={formData.tags.includes(tag) ? 'contained' : 'outlined'}
                        onClick={() => {
                          const tags = formData.tags.includes(tag)
                            ? formData.tags.filter((t) => t !== tag)
                            : [...formData.tags, tag];
                          setFormData({ ...formData, tags });
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            )}

            {step === 2 && (
              <Box>
                <Typography variant="body2" fontWeight={500} gutterBottom>Visibility</Typography>
                <RadioGroup
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                >
                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight={500}>Public</Typography>
                          <Typography variant="body2" color="text.secondary">Anyone can discover and join</Typography>
                        </Box>
                      }
                    />
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight={500}>Private</Typography>
                          <Typography variant="body2" color="text.secondary">Invite-only access</Typography>
                        </Box>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </Box>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Button
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
              >
                Back
              </Button>

              {step < 2 ? (
                <Button
                  variant="contained"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                >
                  Create Room
                </Button>
              )}
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
