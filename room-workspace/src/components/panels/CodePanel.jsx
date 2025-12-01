import { useState } from 'react';
import { Box, Typography, Stack, IconButton, Select, MenuItem, Chip, Button } from '@mui/material';
import { Play, Copy, Download, Sparkles, Terminal } from 'lucide-react';

const CODE_TEMPLATES = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
  typescript: `// TypeScript Example
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
};

export default function CodePanel() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);
  const [output, setOutput] = useState('');

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(CODE_TEMPLATES[lang]);
    setOutput('');
  };

  const handleRun = () => {
    setOutput('Running code...\n55\nExecution completed in 0.23s');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'grey.900' }}>
      {/* Toolbar */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 1.5,
          borderBottom: 1,
          borderColor: 'grey.800',
          bgcolor: 'grey.900',
        }}
      >
        <Select
          value={language}
          onChange={handleLanguageChange}
          size="small"
          sx={{
            minWidth: 140,
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.700' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.600' },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
        </Select>

        <Chip
          icon={<Sparkles size={14} />}
          label="AI Assist"
          size="small"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          clickable
        />

        <Box sx={{ flex: 1 }} />

        <Button
          variant="contained"
          size="small"
          startIcon={<Play size={16} />}
          onClick={handleRun}
          sx={{
            bgcolor: 'success.main',
            '&:hover': { bgcolor: 'success.dark' },
          }}
        >
          Run
        </Button>

        <IconButton size="small" onClick={handleCopy} sx={{ color: 'grey.400' }}>
          <Copy size={16} />
        </IconButton>
      </Stack>

      {/* Code Editor */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Box
          component="textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'transparent',
            color: 'grey.100',
            border: 'none',
            outline: 'none',
            fontFamily: "'Fira Code', 'Consolas', monospace",
            fontSize: '0.875rem',
            lineHeight: 1.6,
            resize: 'none',
            p: 2,
            '&::selection': {
              bgcolor: 'primary.dark',
            },
          }}
        />
      </Box>

      {/* Output Console */}
      {output && (
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'grey.800',
            bgcolor: 'grey.950',
            p: 2,
            maxHeight: '30%',
            overflow: 'auto',
          }}
        >
          <Stack spacing={1} sx={{ mb: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Terminal size={14} color="#10b981" />
              <Typography variant="caption" sx={{ color: 'success.light', fontWeight: 600 }}>
                Output
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Fira Code', 'Consolas', monospace",
              color: 'grey.300',
              whiteSpace: 'pre-wrap',
            }}
          >
            {output}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
