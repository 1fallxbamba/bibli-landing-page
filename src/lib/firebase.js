import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Collection references
export const COLLECTIONS = {
  WAITLIST: 'waitlist',
  SURVEY: 'survey_responses',
  CREATORS: 'creators',
};

// Add email to waitlist
export async function addToWaitlist(email) {
  try {
    console.log('Adding to waitlist:', email);
    console.log('Firebase config:', {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
    });
    
    const docRef = await addDoc(collection(db, COLLECTIONS.WAITLIST), {
      email,
      createdAt: serverTimestamp(),
      source: 'landing_page',
    });
    console.log('Successfully added with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return { success: false, error: error.message };
  }
}

// Add survey response
export async function addSurveyResponse(response) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.SURVEY), {
      ...response,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding survey response:', error);
    return { success: false, error: error.message };
  }
}

// Add creator signup
export async function addCreatorSignup(email) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.CREATORS), {
      email,
      createdAt: serverTimestamp(),
      status: 'pending',
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding creator signup:', error);
    return { success: false, error: error.message };
  }
}

