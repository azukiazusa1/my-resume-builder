import { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import SplitButton, { Option } from '../ui/SplitButton';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import LinkButton from '@/components/ui/LinkButton';

/**
 * SplitButton の選択肢
 */
const options: Option[] = [
  {
    text: '履歴書を作成',
    key: 'resume',
  },
  {
    text: '職務経歴書を作成',
    key: 'career',
  },
];

/**
 * ユーザーメニューの一覧
 */
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'] as const;

export default function ButtonAppBar() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (key: string) => {
    router.push(`/resume/${key}/create`);
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Resume Builder
              </Typography>

              {isLoggedIn ? (
                <>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: { xs: 0, md: 2 } }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <LinkButton href="/login" variant="outlined" color="inherit" sx={{ mr: 2 }}>
                  Log in
                </LinkButton>
              )}
              <SplitButton
                options={options}
                onChangeKey={(key: string) => handleChange(key)}
                color="inherit"
                variant="outlined"
                sx={{ display: { xs: 'none', md: 'flex' } }}
              />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </header>
  );
}
