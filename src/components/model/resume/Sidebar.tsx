import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

type Props = {
  id: string;
  preview: boolean;
  onClickPreview: () => void;
};

const Sidebar: React.VFC<Props> = ({ id, preview, onClickPreview }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', lg: 'column' },
        '& > :not(style)': { m: 1 },
      }}
    >
      <Tooltip title="プレビュー" placement="right">
        <Fab onClick={() => onClickPreview()} color="secondary" data-testid="toggle-preview">
          {preview ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </Fab>
      </Tooltip>
      <Tooltip title="別タブで表示" placement="right">
        <Fab color="secondary" href="/resume/preview" rel="noopener noreferrer" target="_blank">
          <LaunchIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="ダウンロード" placement="right">
        <Fab color="secondary">
          <DownloadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="フィールドを追加" placement="right">
        <Fab color="secondary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;
