import { useRef, useState, useEffect } from 'react';
import { Box, Stack, IconButton, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material';
import { Pencil, Square, Circle, Type, Eraser, Trash2, Download, Undo, Redo } from 'lucide-react';

export default function WhiteboardPanel() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#6366f1');
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : 3;
    ctx.lineCap = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyStep - 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryStep(historyStep - 1);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyStep + 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryStep(historyStep + 1);
    }
  };

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#0f172a'];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'white',
        }}
      >
        <ToggleButtonGroup
          value={tool}
          exclusive
          onChange={(e, val) => val && setTool(val)}
          size="small"
        >
          <ToggleButton value="pencil"><Pencil size={16} /></ToggleButton>
          <ToggleButton value="eraser"><Eraser size={16} /></ToggleButton>
        </ToggleButtonGroup>

        <Stack direction="row" spacing={0.5}>
          {colors.map(c => (
            <Box
              key={c}
              onClick={() => setColor(c)}
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: c,
                cursor: 'pointer',
                border: color === c ? '3px solid' : '2px solid',
                borderColor: color === c ? 'grey.800' : 'grey.300',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={undo} disabled={historyStep <= 0}>
            <Undo size={16} />
          </IconButton>
          <IconButton size="small" onClick={redo} disabled={historyStep >= history.length - 1}>
            <Redo size={16} />
          </IconButton>
          <IconButton size="small" onClick={clearCanvas}>
            <Trash2 size={16} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            cursor: tool === 'eraser' ? 'crosshair' : 'crosshair',
            backgroundColor: 'white',
          }}
        />
      </Box>
    </Box>
  );
}
