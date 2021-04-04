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
  const folderRef = db.collection("user").doc(uid);
  const folders = await folderRef.get();
  return folders.data().folder;
};

export const wordSet: { [key: string]: { [key: string]: string } } = {};

export const setWord = async (uid, folder) => {
  for (let key in wordSet) {
    delete wordSet[key];
  }
  const wordRef = db.collection("user").doc(uid).collection(folder);
  const wordData = await wordRef.get();
  wordData.forEach((doc) => {
    wordSet[doc.id] = doc.data();
  });
  console.log(wordSet);
};
