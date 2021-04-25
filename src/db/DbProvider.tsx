import { db } from "src/utils/firebase";
import firebase from "firebase/app";

export const registWord = async (uid, folder, english, japanese) => {
  const wordRef = db
    .collection("user")
    .doc(uid)
    .collection(folder)
    .doc(english);
  try {
    await wordRef.set({
      japanese: japanese,
      isFlag: false,
    });
  } catch (err) {
    alert(err.message);
  }
};

export const registFolder = async (uid, folder) => {
  const folderIdxRef = db.collection("user").doc(uid);
  try {
    if ((await folderIdxRef.get()).exists) {
      await folderIdxRef.update({
        folder: firebase.firestore.FieldValue.arrayUnion(folder),
      });
    } else {
      folderIdxRef.set({
        folder: [folder],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

export const deleteFolder = async (uid, folder) => {
  const folderIdxRef = db.collection("user").doc(uid);
  const folderRef = db.collection("user").doc(uid).collection(folder);
  const words = await folderRef.get();
  words.forEach((doc) => {
    folderRef.doc(doc.id).delete();
  });
  try {
    folderIdxRef.update({
      folder: firebase.firestore.FieldValue.arrayRemove(folder),
    });
  } catch (err) {
    alert(err.message);
  }
};

export const deleteWord = async (uid, folder, english) => {
  const wordRef = db
    .collection("user")
    .doc(uid)
    .collection(folder)
    .doc(english);
  try {
    wordRef.delete();
  } catch (err) {
    alert(err.message);
  }
};

export const getList = async (uid) => {
  const folderIdxRef = db.collection("user").doc(uid);
  const folders = await folderIdxRef.get();
  return folders.data().folder;
};

export const setWord = async (uid, folder) => {
  const wordSet: {
    [key: string]: { [key: string]: string | boolean };
  } = {};
  const folderRef = db.collection("user").doc(uid).collection(folder);
  const words = await folderRef.get();
  words.forEach((doc) => {
    wordSet[doc.id] = doc.data();
  });
  return wordSet;
};

export const setFlag = async (uid, folder, english, isFlag) => {
  const wordRef = db
    .collection("user")
    .doc(uid)
    .collection(folder)
    .doc(english);
  try {
    await wordRef.update({
      isFlag: isFlag,
    });
  } catch (err) {
    alert(err.message);
  }
};
