import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox, FlexBox } from '@/components/styled';

import { Image } from './styled';
import { useSubsciber } from '@/socket/subscriber';
import { Typography, Box } from '@mui/material';

function Stock() {
  const DEV_backend = 'wss://localhost:8443/dev';

  // const { latestMessage: pongMsg111, all } = useSubsciber({
  //   url: `${DEV_backend}/111`,
  //   topic: 'pong',
  // });

  // const { latestMessage: pongMsg555 } = useSubsciber({ url: `${DEV_backend}/555`, topic: 'pong' });

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
