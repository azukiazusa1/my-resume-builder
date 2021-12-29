import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';

/**
 * ユーザーメニューの一覧
 */
const userMenuItems = [
  {
    text: 'ダッシュボード',
    path: '/dashboard',
  },
] as const;

type Props = {
  username?: string;
  image?: string;
  sx?: SxProps;
};

const UserAvatar: React.FC<Props> = ({ username, image, sx }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={sx}>
        <Avatar alt={username} src={image} data-testid="user-avatar" />
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
        {userMenuItems.map(({ text, path }) => (
          <MenuItem key={path}>
            <Typography textAlign="center">
              <Link href={path}>
                <a style={{ color: 'inherit', textDecoration: 'none' }}>{text}</a>
              </Link>
            </Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">ログアウト</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
