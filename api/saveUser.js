import { getAccessToken } from "./_googleToken.js";

export async function saveUser(user) {
  const token = await getAccessToken();

  const url = https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${user.telegramId};

  const body = {
    fields: {
      telegramId: { stringValue: String(user.telegramId) },
      firstName: { stringValue: user.firstName || "" },
      lastName: { stringValue: user.lastName || "" },
      username: { stringValue: user.username || "" },
      photo: { stringValue: user.photo || "" },
      provider: { stringValue: "telegram" },
      lastLogin: { timestampValue: new Date().toISOString() }
    }
  };

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Authorization": Bearer ${token},
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
    }
