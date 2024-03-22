import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FullSizeCenteredFlexBox, FlexBox } from '@/components/styled';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)({
  fontSize: 25,
});

const samples = [
  {
    name: '온도/습도 날씨 앱 샘플',
    memo: '스마트폰 날씨 앱, 30초마다 갱신',
  },
  {
    name: '채팅앱',
    memo: '참여하는 인원, 주고 받는 채팅 반복',
  },
  {
    name: '주식',
    memo: '나스닥 차트, 주가 차트, 하락/상승 많은 종목 알림',
  },
  {
    name: '벤치마크',
    memo: '1초에 100~1000개, 등 벤치마킹 툴',
  },
  {
    name: '테스트',
    memo: '개발용 /test',
  },
];

function Home() {
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ flexWrap: 1 }}>
        <Grid container spacing={2}>
          {samples.map((item, idx) => (
            <Grid xs={4} key={`sample-${idx}`} sx={{}}>
              <FlexBox
                sx={{
                  height: 200,
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingX: 3,
                }}
                component={Paper}
              >
                <FlexBox sx={{ justifyContent: 'flex-start' }}>
                  <Typography>샘플 {idx + 1}</Typography>
                </FlexBox>
                <Title>{item.name}</Title>
                <Typography>{item.memo}</Typography>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default Home;
