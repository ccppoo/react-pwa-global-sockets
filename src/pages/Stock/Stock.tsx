import { Box, Typography } from '@mui/material';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { useSubscriber } from '@/socket/subscriber';

import { Image } from './styled';

function Stock() {
  const DEV_backend = 'wss://localhost:8443/dev';

  // const { latestMessage: pongMsg111, all } = useSubscriber({
  //   url: `${DEV_backend}/111`,
  //   topic: 'pong',
  // });

  // const { latestMessage: pongMsg555 } = useSubscriber({ url: `${DEV_backend}/555`, topic: 'pong' });

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>
          <FlexBox>
            <Typography>id : 111</Typography>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Stock;
