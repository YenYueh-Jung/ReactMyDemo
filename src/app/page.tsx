'use client';
import Image from "next/image";
import * as React from 'react';
//import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

const Box = dynamic(() => import('@mui/material/Box'), { 
  ssr: false 
});

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5' }}>
      {/* 首頁內容 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)', 
          px: { xs: 2, md: 5 },
          py: 5,
        }}
      >
        {/* 左邊產品圖片 */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: { xs: 4, md: 0 },
          }}
        >
          <Image
            src="/Home1.jpg" 
            alt="Product Image"
            width={500}
            height={500}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* 右邊標題與副標題 */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            pl: { md: 5 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 1.2,
            }}
          >
            Begin <br /> Anywhere
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              fontSize: '1.2rem',
              color: '#666',
              fontWeight: '300',
            }}
          >
            透過討論，找出最佳解決方案
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
