import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createBoardForNewUser = functions.auth.user().onCreate((req) => {
  const uid = req.uid;
  admin.firestore().collection("boards").doc(uid).create({
    "todo": [],
    "inProgress": [],
    "done": [],
  });
});
