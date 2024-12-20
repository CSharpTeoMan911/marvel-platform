import { httpsCallable } from 'firebase/functions';

import {
  setError,
  setStreaming,
  setTyping,
} from '@/libs/redux/slices/chatSlice';
import { functions } from '@/libs/redux/store';
import axios from "axios"
import functions_urls from '@/libs/constants/google_functions_url_selector';
import { config } from 'dotenv';
import { auth } from '../../firebase/firebaseSetup';

/**
 * Creates a chat session.
 *
 * @param {Object} payload - The payload for creating the chat session.
 * @param {function} dispatch - The dispatch function for managing state.
 * @return {Object} - An object containing a status and data containing the session.
 */
const createChatSession = async (payload, dispatch) => {
  try {
    const response = await axios.get(functions_urls().createChatSession, {
      params: payload
    });

    console.log(response);
    return response.data;
  } catch (err) {
    dispatch(setError('Error! Couldn\u0027t send message'));
    dispatch(setStreaming(false));
    dispatch(setTyping(false));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    throw new Error('Error could not send message');
  }
};

export default createChatSession;
