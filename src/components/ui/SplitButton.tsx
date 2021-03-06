import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useRef,useState } from 'react';

/**
 * SplitButtonの選択肢
 */
export type Option = {
  /** 選択肢を一意に特定する値 */
  key: string;
  /** 選択肢のラベル */
  text: string;
  /** 選択肢が無効かどうか */
  disabled?: boolean;
};

type Props = ButtonGroupProps & {
  options: Option[];
  /** 予め選択されている選択肢のkey */
  defaultSelected?: string;
  /** 選択肢が変更された際に呼ばれる */
  onChangeKey?: (key: string) => void;
};

const SplitButton: React.FC<Props> = ({
  options,
  variant = 'contained',
  onChangeKey = () => {},
  defaultSelected = options[0].key,
  ...buttonGroupProps
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedKey, setSelectedKey] = useState(defaultSelected);

  const selectedOption = options.find((option) => option.key === selectedKey);

  const handleMenuItemClick = (key: string) => {
    setSelectedKey(key);
    onChangeKey(key);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <ButtonGroup
        variant={variant}
        {...buttonGroupProps}
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={() => onChangeKey(selectedOption?.key ?? '')}>
          {selectedOption?.text}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option) => (
                    <MenuItem
                      key={option.key}
                      selected={option.key === selectedKey}
                      disabled={option.disabled}
                      onClick={() => handleMenuItemClick(option.key)}
                    >
                      {option.text}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SplitButton;
