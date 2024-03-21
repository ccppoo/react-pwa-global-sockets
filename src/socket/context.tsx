import React, { ReactNode, createContext, useEffect } from 'react';

import useWebSocket from 'react-use-websocket';

import useGlobalQueue from './globalQueue';
import { WebSocketMessageReceiver } from './receiver';
import { useGlobalWebSocketState } from './globalQueue';
import { WebSocketMessageSender } from './sender';
import type { UseFullSocketConfig } from './types';

export const StreamSocketContext = createContext<string>('');

export const UseFullWebSocketProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: UseFullSocketConfig;
}) => {
  const { url, onOpen, messageSenders, messageReceivers } = config;

  const { lastestGQM, _globalQueue, system } = useGlobalQueue({
    WebSocket_URL: url,
    topicEnqueueMax: config.topicEnqueueMax || 30,
  });
  const { setWebSocketState } = useGlobalWebSocketState({ WebSocket_URL: url });

  const { readyState, sendJsonMessage } = useWebSocket(url, {
    onOpen: onOpen,
    onMessage: (event: MessageEvent<any>) => {
      WebSocketMessageReceiver(messageReceivers)(event);
      const { data: RawSocketStringData } = event;
      const _msg = JSON.parse(RawSocketStringData);
      system.enqueueReceivedMsg(_msg);
    },
  });

  const webSocketMessageSender = WebSocketMessageSender(sendJsonMessage, messageSenders);

  useEffect(() => {
    if (_globalQueue.length < 1) return;
    const qMSG = system.consume.pop();
    if (qMSG) webSocketMessageSender(qMSG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastestGQM, _globalQueue.length]);

  useEffect(() => {
    setWebSocketState(readyState);
  }, [readyState, setWebSocketState]);

  return <StreamSocketContext.Provider value="">{children}</StreamSocketContext.Provider>;
};
