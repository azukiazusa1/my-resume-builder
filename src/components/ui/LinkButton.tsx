import React from 'react';
import Link from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';

type Props = ButtonProps<React.ElementType> & {
  href: string;
};

/**
 * MUI の Button を Next.js の Link に変換する
 */
const LinkButton: React.FC<Props> = ({ href, children, ...buttonProps }) => {
  return (
    <Link href={href} passHref>
      <Button {...buttonProps} component="a">
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
