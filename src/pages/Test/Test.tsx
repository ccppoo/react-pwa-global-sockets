import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox, FlexBox } from '@/components/styled';

import { Image } from './styled';
import { useSubsciber } from '@/socket/subscriber';
import { Typography, Box } from '@mui/material';

function Test() {
  const DEV_backend = 'wss://localhost:8443/dev';

  const { latestMessage: pongMsg111, all } = useSubsciber({
    url: `${DEV_backend}/111`,
    topic: 'pong',
  });

  const { latestMessage: pongMsg555 } = useSubsciber({ url: `${DEV_backend}/555`, topic: 'pong' });

  return (
    <>
      <Meta title="Test" />
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>
          <FlexBox>
            <Typography>id : 111</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>recentMessage pong : {JSON.stringify(pongMsg111?.message)}</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {all.map((msg) => {
              return <Typography key={msg.GQM_ID}>message : {msg?.message}</Typography>;
            })}
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>
          <FlexBox>
            <Typography>id : 555</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>recentMessage pong : {JSON.stringify(pongMsg555?.message)}</Typography>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Test;
