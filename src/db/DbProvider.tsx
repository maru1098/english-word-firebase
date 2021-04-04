import { db } from "src/utils/firebase";
import firebase from "firebase/app";

export const registWord = async (uid, folder, english, japanese) => {
  const folderRef = db.collection("user").doc(uid);
  try {
    await folderRef.collection(folder).doc(english).set({
      japanese: japanese,
      isFlag: false,
    });
    if ((await folderRef.get()).exists) {
      await folderRef.update({
        folder: firebase.firestore.FieldValue.arrayUnion(folder),
      });
    } else {
      folderRef.set({
        folder: [folder],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

export const getList = async (uid) => {
  const userRef = db.collection("user").doc(uid);
  const folders = await userRef.get();
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
      flag: isFlag,
    });
  } catch (err) {
    alert(err.message);
  }
};
