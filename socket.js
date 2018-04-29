import io from 'socket.io-client';
import store, { addResponse, getLiveQuestion } from './store';

const socket = io("exp://localhost:19002");

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-liveResponse', liveResponse => {
    store.dispatch(addResponse(liveResponse));
  });

  socket.on('new-liveQuestion', liveQuestion => {
    store.dispatch(getLiveQuestion(liveQuestion));
  });

});

export default socket;
