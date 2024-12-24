import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

// Thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'userData/fetch',
  async ({ firestore, id }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      console.log(auth);
      const userQuery = query(
        collection(firestore, 'users')
      );

      const userDocSnapshot = await getDocs(userQuery);

      if (userDocSnapshot.empty) return null;

      const user = userDocSnapshot.docs[0].data();
      user.id = auth?.data?.uid;
      user.email = auth?.data?.email;

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Thunk for submitting onboarding data
export const updateUserData = createAsyncThunk(
  'onboarding/submitOnboardingData',
  async ({ firestore, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth?.data?.uid;
      const userEmail = auth?.data?.email;

      if (!userId) {
        throw new Error('User ID is undefined');
      }

      if (!data || typeof data !== 'object') {
        throw new Error('Data is undefined or not an object');
      }

      data.email = userEmail;
      data.id =userId;

      const userDocRef = doc(firestore, 'users', userId);

      await setDoc(userDocRef, data, { merge: true });

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error in updateUserData', error);
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserData;
