import React from 'react';
import { ConfigProvider, Spin } from 'antd';
import type { ThemeConfig } from 'antd';

const BookItemPlaceholder: React.FC = () => {
  const theme: ThemeConfig = {
    components: {
      Spin: {
        colorPrimary: '#8A0707',
        motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
        motionDurationSlow: '.1s',
      },
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="bookItemPlaceholder">
        <Spin
          size="large"
          style={{
            position: 'relative',
            marginTop: '0%',
            marginLeft: '10%',
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default BookItemPlaceholder;
