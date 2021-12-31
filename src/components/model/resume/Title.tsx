import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  title: string;
  onChange: (value: string) => void;
  sx?: SxProps;
};

const Title: React.VFC<Props> = ({ title, sx, onChange }) => {
  const [value, setValue] = useState(title);
  const [showInput, setShowInput] = useState(false);

  const handleEditClick = () => {
    setShowInput(true);
  };

  const handleSaveClick = () => {
    setShowInput(false);
    onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  };

  const handleChancelClick = () => {
    setShowInput(false);
    setValue(title);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {showInput ? (
        <>
          <TextField
            sx={{
              mr: 2,
              flexGrow: 1,
            }}
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="outlined" onClick={handleSaveClick} sx={{ mr: 2 }}>
            保存
          </Button>
          <Button onClick={handleChancelClick}>キャンセル</Button>
        </>
      ) : (
        <>
          <Typography variant="h4" component="h1" sx={{ mr: 2, flexGrow: 1 }}>
            {value}
          </Typography>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditClick}>
            編集
          </Button>
        </>
      )}
    </Box>
  );
};

export default Title;
