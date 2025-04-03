'use client';
import { useState } from 'react';
import { APIs } from '@/types';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

interface ExchangeRatePageProps {
  api: APIs;
}

export default function ExchangeRatePage({ api }: ExchangeRatePageProps) {
  const [formData, setFormData] = useState({
    fromAmount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    toAmount: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${formData.fromCurrency}&to=${formData.toCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[formData.toCurrency];
      const convertedAmount = (Number(formData.fromAmount) * rate).toFixed(2);
      setFormData((prev) => ({ ...prev, toAmount: convertedAmount }));
    } catch (error) {
      console.error('匯率獲取失敗:', error);
      setFormData((prev) => ({ ...prev, toAmount: '錯誤' }));
    }
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        bgcolor: '#e0e0e0', 
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: '#424242', fontWeight: 'bold' }}
      >
        {api.name}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          bgcolor: '#f5f5f5', 
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="起始金額"
              name="fromAmount"
              value={formData.fromAmount}
              onChange={handleInputChange}
              type="number"
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="起始貨幣"
              name="fromCurrency"
              value={formData.fromCurrency}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="目標貨幣"
              name="toCurrency"
              value={formData.toCurrency}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="目標金額"
              name="toAmount"
              value={formData.toAmount}
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: '#e0e0e0' }} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleConvert}
              fullWidth
              sx={{
                mt: 2,
                bgcolor: '#616161', 
                color: 'white',
                '&:hover': { bgcolor: '#424242' },
              }}
            >
              轉換匯率
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}