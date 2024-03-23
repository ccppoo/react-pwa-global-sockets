import React, { useEffect } from 'react';

import { UseFullSocketAtom as ufsAtom, usePublisherQueue } from './globalQueue';
import { useRecoilState, selectorFamily, useRecoilValue } from 'recoil';

export const usePublisher = ({ url, topic }: { url: string; topic: string }) => {
  const { system } = usePublisherQueue({ WebSocket_URL: url });

  function publishMessage(obj: any) {
    system.enqueueMsg({ topic: topic, ...obj });
  }

  return {
    publish: publishMessage,
  };
};
