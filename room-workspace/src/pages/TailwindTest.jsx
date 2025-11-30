import { useState, useRef, useEffect } from "react";
import { Box, Container, Paper, Typography, IconButton, Slider, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Pencil, Eraser, Trash2, Download, Palette } from "lucide-react";

export default function CanvasDrawingApp() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("pen");

  const colors = [
    "#000000", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500",
    "#800080", "#FFC0CB", "#A52A2A", "#808080"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Fill with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "eraser" ? "white" : color;
    ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', p: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Drawing Canvas
          </Typography>
          <Typography variant="body1" color="text.secondary">Create your masterpiece!</Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between">
              <ToggleButtonGroup value={tool} exclusive onChange={(e, val) => val && setTool(val)} size="small">
                <ToggleButton value="pen"><Pencil size={20} /></ToggleButton>
                <ToggleButton value="eraser"><Eraser size={20} /></ToggleButton>
              </ToggleButtonGroup>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 200 }}>
                <Typography variant="body2">Size:</Typography>
                <Slider value={brushSize} onChange={(e, val) => setBrushSize(val)} min={1} max={20} sx={{ flex: 1 }} />
                <Typography variant="body2" sx={{ minWidth: 30 }}>{brushSize}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <IconButton onClick={clearCanvas} color="error" sx={{ bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}>
                  <Trash2 size={20} />
                </IconButton>
                <IconButton onClick={downloadCanvas} color="success" sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' } }}>
                  <Download size={20} />
                </IconButton>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Palette size={20} />
              {colors.map((c) => (
                <Box
                  key={c}
                  onClick={() => setColor(c)}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: c,
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: color === c ? '3px solid' : 'none',
                    borderColor: 'primary.main',
                    transform: color === c ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                />
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: 40, height: 40, borderRadius: 4, cursor: 'pointer', border: '2px solid #ddd' }}
              />
            </Stack>

            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ width: '100%', height: '500px', cursor: 'crosshair', display: 'block' }}
              />
            </Paper>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}