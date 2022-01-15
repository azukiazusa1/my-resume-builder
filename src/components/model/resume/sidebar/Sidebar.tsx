import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import AddFieldDialog from '@/components/model/resume/field/AddFieldDialog';
import DownloadButton from '@/components/model/resume/sidebar/DownloadButton';
import OpenPreviewButton from '@/components/model/resume/sidebar/OpenPreviewButton';

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
      <OpenPreviewButton id={id} />
      <DownloadButton id={id} />
      <AddFieldDialog id={id}>
        <Tooltip title="フィールドを追加" placement="right">
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </AddFieldDialog>
    </Box>
  );
};

export default Sidebar;
