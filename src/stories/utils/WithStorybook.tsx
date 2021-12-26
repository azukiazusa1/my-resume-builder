/* eslint-disable react/display-name */
import { useState } from 'react';

const WithStorybook = (Component: any) => {
  return (args: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);

    return (
      <>
        <Component
          {...args}
          onChange={(params: any) => {
            args.onChange(params);
            setValue(params);
          }}
          value={value}
        />
        <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
      </>
    );
  };
};

export default WithStorybook;
