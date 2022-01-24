import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  datetime?: string;
};

const LastUpdated: React.VFC<Props> = ({ datetime }) => {
  const dayjsDate = datetime ? dayjs(datetime) : null;
  return (
    <Typography variant="body2">
      最終更新日：
      {dayjsDate && (
        <time dateTime={dayjsDate.format()}>{dayjsDate.format('YYYY年MM月DD日 HH:mm')}</time>
      )}
    </Typography>
  );
};

export default LastUpdated;
