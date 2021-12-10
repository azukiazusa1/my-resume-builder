import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

type Props = ButtonGroupProps & {
  options: { key: string; text: string; disabled?: boolean }[];
  defaultSelected?: string;
  onChange?: (key: string) => void;
};

const SplitButton: React.FC<Props> = ({
  options,
  variant = "contained",
  onChange = () => {},
  defaultSelected = options[0].key,
  ...buttonGroupProps
}) => {
  if (options.length === 0) {
    return null;
  }

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedKey, setSelectedKey] = useState(defaultSelected);

  const selectedOption = options.find((option) => option.key === selectedKey);

  const handleMenuItemClick = (key: string) => {
    setSelectedKey(key);
    onChange(key);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
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
        <Button onClick={() => onChange(selectedOption?.key ?? "")}>
          {selectedOption?.text}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
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
