import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";

export const mainContext = React.createContext();

const INIT_STATE = {
  user: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "GET_TODOS":
      return { ...state, todos: action.payload };
    case "GET_ONE_TODO":
      return { ...state, oneTodo: action.payload };
      deafault: return { ...state };
  }
};
const MainContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

  const provider = new GoogleAuthProvider();
  const authUser = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const setUser = () => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "SET_USER",
        payload: user,
      });
    });
  };

  const logOut = () => {
    try {
      signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  const addTodo = async (todo) => {
    try {
      await addDoc(collection(firestore, "todos"), {
        todo,
        userId: state.user.uid,
      });
      getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const getTodos = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const todosRef = collection(firestore, "todos");
          const q = query(todosRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const todos = [];
          querySnapshot.forEach((item) => {
            // console.log(item);
            todos.push({ ...item.data(), dicId: item.id });
          });
          todos.sort((a, b) => {
            return a.todo.id - b.todo.id;
          });
          dispatch({
            type: "GET_TODOS",
            payload: todos,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const deleteTask = async (docId) => {
    await deleteDoc(doc(firestore, "todos", docId));
    getTodos();
  };

  const getOneTodo = async (docId) => {
    const ref = doc(firestore, "todos", docId);
    const docData = await getDoc(ref);
    let data = docData.data();
    dispatch({
      type: "GET_ONE_TODO",
      payload: data,
    });
  };

  const saveEditedTodo = async (editedTodo, docId) => {
    const ref = doc(firestore, "todos", docId);
    await updateDoc(ref, editedTodo);
    getTodos();
  };

  return (
    <mainContextProvider
      value={{
        user: state.user,
        totdos: state.todos,
        oneTodo: state.oneTodo,
        authUser,
        setUser,
        logOut,
        addTodo,
        getTodos,
        deleteTask,
        getOneTodo,
        saveEditedTodo,
      }}
    >
      {children}
    </mainContextProvider>
  );
};

export default MainContextProvider;
