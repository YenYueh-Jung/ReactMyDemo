'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton, Box, Tabs, Tab, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0); // 當前選中的 Tab
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 控制 Menu 的位置
  const open = Boolean(anchorEl); // Menu 是否打開

  // 定義導航選項
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'AddAPI', path: '/request' },
    { label: 'APIs', path: '/content' },
  ];

  // 在客戶端渲染時動態設置當前 Tab
  useEffect(() => {
    const pathname = window.location.pathname;
    const tabIndex = navItems.findIndex((item) => item.path === pathname);
    setCurrentTab(tabIndex === -1 ? 0 : tabIndex);
  }, []);

  // 處理 Tab 切換時的跳轉邏輯
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    router.push(navItems[newValue].path);
  };

  // 打開 Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 關閉 Menu 並跳轉
  const handleMenuClose = (path?: string) => {
    setAnchorEl(null);
    if (path) {
      router.push(path);
      const tabIndex = navItems.findIndex((item) => item.path === path);
      setCurrentTab(tabIndex === -1 ? 0 : tabIndex);
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'transparent', borderBottom: 'none', px: 3, py: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component="img"
          src="/Logo.png"
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        />

        {/* 大螢幕下的 Tabs */}
        <Tabs
          value={currentTab}
          onChange={handleChange}
          sx={{
            display: { xs: 'none', md: 'flex' }, // 小螢幕隱藏，大螢幕顯示
            '& .MuiTabs-indicator': {
              backgroundColor: '#243B65',
              height: '3px',
            },
          }}
        >
          {navItems.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              component={Link}
              href={item.path}
              sx={{
                color: 'black',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'none',
                mx: 1,
                '&:hover': {
                  color: '#243B65',
                },
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>

        {/* 小螢幕的選單按鈕 */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }} // 小螢幕顯示，大螢幕隱藏
          onClick={handleMenuOpen}
        >
          <MenuIcon sx={{ color: 'black' }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleMenuClose()}
          sx={{ mt: 1 }}
        >
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClose(item.path)}
              sx={{
                fontWeight: currentTab === index ? 'bold' : 'normal', 
                color: currentTab === index ? '#243B65' : 'black',
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
