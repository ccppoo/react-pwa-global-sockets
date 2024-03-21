import React, { ReactNode, createContext, useEffect } from 'react';

import useGlobalQueue from './globalQueue';

export const usePublisher = ({ url, topic }: { url: string; topic: string }) => {
  const { system } = useGlobalQueue({ WebSocket_URL: url });

  function sendMessage(obj: any) {
    system.enqueueMsg({ topic: topic, ...obj });
  }

  return {
    send: sendMessage,
  };
};
