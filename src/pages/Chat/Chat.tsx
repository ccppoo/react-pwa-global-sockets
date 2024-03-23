import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox, FlexBox } from '@/components/styled';

import { Image } from './styled';
import { useSubsciber } from '@/socket/subscriber';
import { usePublisher } from '@/socket/publisher';
import { Typography, Box, Button } from '@mui/material';

function Chat() {
  const DEV_backend = 'wss://localhost:8443';

  const { latestMessage: pongMsg111, all } = useSubsciber({
    url: `${DEV_backend}/dev/111`,
    topic: 'pong',
  });

  const { latestMessage: pongMsg555 } = useSubsciber({
    url: `${DEV_backend}/dev/555`,
    topic: 'pong',
  });

  const { publish } = usePublisher({ url: `${DEV_backend}/echo`, topic: 'echo' });
  const { latestMessage } = useSubsciber({ url: `${DEV_backend}/echo`, topic: 'echo' });

  return (
    <>
      <Meta title="Welcome" />
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
            <Typography>Echo Button</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox>
              <Button
                variant="outlined"
                onClick={() => {
                  const _time = new Date().toLocaleTimeString();
                  publish({
                    message: _time,
                  });
                  console.log(`보낸거 : ${_time}`);
                }}
              >
                Click To Send Ping
              </Button>
            </FlexBox>
            <FlexBox>
              <Typography>
                {latestMessage ? `최근에 보낸 : ${latestMessage.message}` : ''}
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Chat;
