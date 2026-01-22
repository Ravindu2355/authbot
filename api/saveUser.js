import { db } from "./_firebase.js";

export async function saveUser(user) {
  const {
    telegramId,
    firstName,
    lastName,
    username,
    photo,
    userAgent
  } = user;

  await db.collection("users").doc(String(telegramId)).set({
    telegramId,
    firstName,
    lastName,
    username,
    photo,
    userAgent,
    provider: "telegram",
    lastLogin: new Date()
  }, { merge: true });

  return true;
}
