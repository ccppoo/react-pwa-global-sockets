import { RecoilValueReadOnly,  atomFamily, useRecoilState, RecoilState } from 'recoil';

import type { GlobalQueueMessage, GlobalQueueMessages } from './types';

import {ReadyState} from 'react-use-websocket';

type URL = string;
type URL_TOPIC = string;

// const globalQueueBySocketURL = atomFamily<GlobalQueueMessages, URL>({
const WSSenderQueueBySocketURL = atomFamily<GlobalQueueMessages, URL>({
  key: 'ws-sender-queue-by-url',
  default: [],
});

export type TopicMessageReceived = Record<string, GlobalQueueMessages>

export const WSReceiverQueueBySocketURL = atomFamily<TopicMessageReceived, URL_TOPIC>({
  key: 'ws-receiver-queue-by-url',
  default: {},
});


const globalSocketStateByURL = atomFamily<ReadyState, URL>({
  key: 'global-socket-state-by-url',
  default: ReadyState.UNINSTANTIATED,
});

// 1. 메세지 보낼거, 관리하는 atom 사용하기
const globalQueueSubscriber : (WebSocket_URL: string) =>RecoilState<GlobalQueueMessages> = (WebSocket_URL: string) =>
  WSSenderQueueBySocketURL(WebSocket_URL)


export function subscribeGlobalQueue(topic: string): RecoilValueReadOnly<GlobalQueueMessages> {
  return globalQueueSubscriber(topic);
}
  
function _generateQueueMsgID(): string {
  return new Date().getTime().toString();
}

export default function useGlobalQueue({WebSocket_URL, topicEnqueueMax } : {WebSocket_URL : string, topicEnqueueMax : number}) {

  // WS 보내는거 대기하는 큐
  const [_globalQueue, _setGlobalQueue] = useRecoilState(WSSenderQueueBySocketURL(WebSocket_URL));

  function enqueueMsgToSend<T>(globalQueueMSG: GlobalQueueMessage & T) {
    const NEW_GQM_ID = _generateQueueMsgID();
    _setGlobalQueue(
      (globalQueueMSGs): GlobalQueueMessages => [
        ...globalQueueMSGs,
        {
          ...globalQueueMSG,
          GQM_ID: NEW_GQM_ID,
        },
      ],
    );
    return
  }

  function clearSenderQueue() {
    _setGlobalQueue([]);
  }

  function _pop(): GlobalQueueMessage | undefined {
    const queueMsg = _globalQueue[0];
    _setGlobalQueue((globalQueueMSGs): GlobalQueueMessages => globalQueueMSGs.slice(1));
    return queueMsg;
  }

  function _pop_topic(topic: string): GlobalQueueMessage | undefined {
    const filterd_gqMsgs = _globalQueue.filter((gqMsg) => gqMsg.topic == topic);
    const qMSG = filterd_gqMsgs.length > 0 ? filterd_gqMsgs[0] : undefined;
    if (qMSG) {
      _setGlobalQueue(
        (globalQueueMSGs): GlobalQueueMessages =>
          globalQueueMSGs.filter((gqMsg) => gqMsg.GQM_ID != qMSG.GQM_ID).slice(1),
      );
    }
    return qMSG;
  }

  
  function popToSend(topic?: string): GlobalQueueMessage | undefined {
    if (_globalQueue.length > 0) {
      if (topic) return _pop_topic(topic);
      if (!topic) return _pop();
    }
    return undefined;
  }

  // ============= WS 받은거 관리하는 부분 =============
  const [_receiverQueue, _setReceiverQueue] =  useRecoilState(WSReceiverQueueBySocketURL(WebSocket_URL));

  // WS 메세지 보낼거 enqueue 하기
  function enqueueReceivedMsg(globalQueueMSG: GlobalQueueMessage ) {
    // console.log(`msg : ${JSON.stringify(globalQueueMSG)}`)
    const {topic : _topic } = globalQueueMSG
    const NEW_GQM_ID = _generateQueueMsgID();
    
    _setReceiverQueue(
      (_receiverQueue: TopicMessageReceived) => {
        let newQueue
        if(_receiverQueue[_topic]){
          const _queue = [..._receiverQueue[_topic]]
          if(_queue.length >= topicEnqueueMax) {_queue.shift()}
          newQueue = [..._queue].concat({
            ...globalQueueMSG,
            GQM_ID: NEW_GQM_ID,
          })
        }
        else{
          newQueue = [
            {
              ...globalQueueMSG,
              GQM_ID: NEW_GQM_ID,
            }
          ]
        }
        // console.log(`newQueue : ${JSON.stringify(newQueue)}`)
          return {
            ..._receiverQueue,
            [_topic] : newQueue
          }
      }
    );
    return
  }

  return {
    // globalQueueRef: _globalQueueRef,
    _globalQueue: _globalQueue,
    lastestGQM: _globalQueue.length > 0 ? _globalQueue[0] : undefined,
    system: {
      enqueueMsg : enqueueMsgToSend,
      clearQueue : clearSenderQueue,
      consume: {
        pop : popToSend,
      },
      enqueueReceivedMsg
    },
    subscribe : {
      toTopic : (topic : string) => _receiverQueue[topic],
    }, 
    chatActions: {},
  };
}

export function useGlobalWebSocketState({WebSocket_URL} : {WebSocket_URL : string}) {
  const [_globalWebSocketState, _setGlobalWebSocketState] = useRecoilState(globalSocketStateByURL(WebSocket_URL));

  return {
    setWebSocketState : (readyState : ReadyState)=>_setGlobalWebSocketState(readyState),
    socketState : _globalWebSocketState,
  }
}
