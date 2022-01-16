import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { fieldValueSelectors } from '@/store/filedValueState';

const { useFieldValueItem } = fieldValueSelectors;

import { FieldProps } from './Form';

const ItemList: React.FC<{ value: string[]; onClick: (index: number) => void }> = ({
  value,
  onClick,
}) => {
  const handleClick = (index: number) => {
    onClick(index);
  };
  return (
    <List>
      {value.map((item, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleClick(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          }
        >
          <ListItemIcon>
            <CircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

const ListField: React.FC<FieldProps<string[]>> = ({ label, templateId, fieldId, onChange }) => {
  const value = useFieldValueItem<string[]>(templateId, fieldId) ?? [];
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onChange([...value, inputValue]);
    setInputValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      handleSubmit();
    }
  };

  const handleDeleteClick = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', px: 2, py: 2 }}>
      <Typography variant="h5" component="label">
        {label}
      </Typography>
      <ItemList value={value} onClick={handleDeleteClick} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="追加したい項目を入力..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          inputProps={{ 'data-testid': 'input' }}
        />
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          disabled={!inputValue.trim()}
          onClick={handleSubmit}
        >
          追加
        </Button>
      </Box>
    </Box>
  );
};

export default ListField;
