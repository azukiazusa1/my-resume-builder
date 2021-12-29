import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SplitButton, { Option } from '../ui/SplitButton';
import LinkButton from '@/components/ui/LinkButton';
import UserAvatar from '@/components/model/user/UserAvatar';

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

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

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
                <Link href="/">
                  <a style={{ color: 'inherit', textDecoration: 'none' }}>My Resume Builder</a>
                </Link>
              </Typography>

              {!!user ? (
                <UserAvatar
                  username={user.name ?? ''}
                  image={user.image ?? ''}
                  sx={{ p: 0, mr: { xs: 0, md: 2 } }}
                />
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
};

export default Header;
