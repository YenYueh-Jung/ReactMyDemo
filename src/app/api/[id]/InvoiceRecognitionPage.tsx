'use client';
import { useState } from 'react';
import { APIs } from '@/types';
import { createWorker, RecognizeResult } from 'tesseract.js'; 
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

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  amount: string;
  taxId: string;
}

export default function InvoiceRecognitionPage({ api }: InvoiceRecognitionPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    date: '',
    amount: '',
    taxId: '',
  });
  const [textContent, setTextContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvoice, setIsInvoice] = useState<boolean | null>(null);

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
        setInvoiceData({ invoiceNumber: '', date: '', amount: '', taxId: '' });
        setTextContent('');
        setIsInvoice(null);
      }
    }
  };

  // 辨識發票
  const recognizeInvoice = async () => {
    if (!file) return;
    setIsLoading(true);

    const worker = await createWorker('eng+chi_tra');

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('辨識超時')), 30000)
      );
      const recognitionPromise = worker.recognize(file);
      //const result = await Promise.race<RecognizeResult>([recognitionPromise, timeoutPromise as any]);
      
      
    const result = await Promise.race<RecognizeResult>([recognitionPromise, timeoutPromise]);


      const text = result.data.text;

      const invoiceNumberMatch = text.match(/[A-Z]{2}-\d{8}/);
      const dateMatch = text.match(/\d{4}[/-]\d{2}[/-]\d{2}|\d{2}\/\d{2}\/\d{2}/);
      const amountMatch = text.match(/(?:總計|金額)[:：]?\s*(\d{1,3}(?:,\d{3})*|\d+)/);
      const taxIdMatch = text.match(/(?:統編|統一編號)[:：]?\s*(\d{8})/);

      if (invoiceNumberMatch || taxIdMatch) {
        setIsInvoice(true);
        setInvoiceData({
          invoiceNumber: invoiceNumberMatch ? invoiceNumberMatch[0] : '未找到',
          date: dateMatch ? dateMatch[0] : '未找到',
          amount: amountMatch ? amountMatch[1] : '未找到',
          taxId: taxIdMatch ? taxIdMatch[1] : '未找到',
        });
      } else {
        setIsInvoice(false);
        setTextContent(text.trim() || '無可辨識內容');
      }
    } catch (error) {
      console.error('辨識錯誤:', error);
      setIsInvoice(false);
      setTextContent('辨識失敗，請檢查圖片是否清晰或重試');
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
                {isInvoice === true && (
                  <Card sx={{ bgcolor: '#fff', borderRadius: '8px', p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#424242' }}>發票資訊</Typography>
                    <TextField
                      label="發票號碼"
                      value={invoiceData.invoiceNumber}
                      fullWidth
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      sx={{ mb: 2, bgcolor: '#e0e0e0' }}
                    />
                    <TextField
                      label="日期"
                      value={invoiceData.date}
                      fullWidth
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      sx={{ mb: 2, bgcolor: '#e0e0e0' }}
                    />
                    <TextField
                      label="金額"
                      value={invoiceData.amount}
                      fullWidth
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      sx={{ mb: 2, bgcolor: '#e0e0e0' }}
                    />
                    <TextField
                      label="統編"
                      value={invoiceData.taxId}
                      fullWidth
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      sx={{ bgcolor: '#e0e0e0' }}
                    />
                  </Card>
                )}
                {isInvoice === false && (
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
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
