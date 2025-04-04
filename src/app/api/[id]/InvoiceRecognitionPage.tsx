'use client';
import { useState } from 'react';
import { APIs } from '@/types';
import { createWorker } from 'tesseract.js'; 
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface InvoiceRecognitionPageProps {
  api: APIs;
}

export default function InvoiceRecognitionPage({ api }: InvoiceRecognitionPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 處理圖片上傳
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; 
      console.log('檔案大小:', selectedFile.size, 'bytes'); 
      if (selectedFile.size > maxSize) {
        alert('檔案過大，請上傳小於 5MB 的圖片');
      } else {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
        setTextContent('');
      }
    }
  };

  // 辨識圖片文字
  const recognizeInvoice = async () => {
    if (!file) return;
    setIsLoading(true);

    const worker = await createWorker('eng+chi_tra');

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('辨識超時')), 90000) // 90秒超時
      );
      const recognitionPromise = worker.recognize(file);
      const result = await Promise.race([recognitionPromise, timeoutPromise]);

      const text = result.data.text;
      setTextContent(text.trim() || '無可辨識內容');
    } catch (error) {
      console.error('辨識錯誤:', error);
      if (error instanceof Error && error.message === '辨識超時') {
        setTextContent('辨識超時，請稍後重試');
      } else {
        setTextContent('辨識失敗，請檢查圖片是否清晰或重試');
      }
    } finally {
      await worker.terminate();
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', bgcolor: '#e0e0e0' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#424242', fontWeight: 'bold' }}>
        {api.name}
      </Typography>
      <Paper elevation={3} sx={{ padding: '2rem', bgcolor: '#f5f5f5', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ bgcolor: '#616161', '&:hover': { bgcolor: '#424242' }, color: 'white' }}
            >
              上傳圖片
              <input
                type="file"
                hidden
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {preview && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: '24px' 
            }}>
              <Box sx={{ flex: { md: 1 }, width: '100%' }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: '8px' }}>
                  <CardMedia
                    component="img"
                    image={preview}
                    alt="Uploaded"
                    sx={{ height: 200, objectFit: 'contain' }}
                  />
                  <CardContent>
                    {isLoading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={recognizeInvoice}
                        disabled={!file}
                        fullWidth
                        sx={{ bgcolor: '#616161', '&:hover': { bgcolor: '#424242' }, color: 'white' }}
                      >
                        開始辨識
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: { md: 1 }, width: '100%' }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: '8px', p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#424242' }}>文字內容</Typography>
                  <TextField
                    label="辨識結果"
                    value={textContent}
                    multiline
                    rows={6}
                    fullWidth
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#e0e0e0' }}
                  />
                </Card>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
