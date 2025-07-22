import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase/client";

// Create the context
const FirebaseContext = createContext();

// Custom hook to use the Firebase context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Listen for auth state changes
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  // Authentication functions
  const signup = async (email, password, userData = {}) => {
    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        createdAt: new Date(),
        ...userData,
      });

      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError("");
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError("");
      return await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError("");
      return await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Firestore functions
  const createDocument = async (collectionPath, data) => {
    try {
      return await addDoc(collection(db, collectionPath), {
        ...data,
        createdAt: new Date(),
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getDocument = async (collectionPath, docId) => {
    try {
      const docRef = doc(db, collectionPath, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getCollection = async (collectionPath, conditions = []) => {
    try {
      let q;

      if (conditions.length > 0) {
        const queryConstraints = conditions.map((condition) =>
          where(condition.field, condition.operator, condition.value)
        );
        q = query(collection(db, collectionPath), ...queryConstraints);
      } else {
        q = collection(db, collectionPath);
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateDocument = async (collectionPath, docId, data) => {
    try {
      const docRef = doc(db, collectionPath, docId);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDocument = async (collectionPath, docId) => {
    try {
      const docRef = doc(db, collectionPath, docId);
      return await deleteDoc(docRef);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword,
    createDocument,
    getDocument,
    getCollection,
    updateDocument,
    deleteDocument,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseContext;
