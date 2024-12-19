import { createUserWithEmailAndPassword } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { sendVerification } from './manageUser';

import { AUTH_ERROR_MESSAGES } from '@/libs/constants/auth';

import { auth, functions } from '@/libs/redux/store';
import axios from "axios"

const signUp = async (email, password, fullName) => {
  try {
    const r = await axios.get("http://127.0.0.1:5001/marvel-platform-c3a0b/us-central1/functions");
    console.log(r);
    // const createUser = httpsCallable(functions, 'signUpUser');

    // const response = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );

    // await createUser({ email, fullName, uid: response.user.uid });
    // await sendVerification(response.user);

    return response.user;
  } catch (error) {
    throw new Error(AUTH_ERROR_MESSAGES[error?.code]);
  }
};

export { signUp };
