import { saveUser } from "./saveUser.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const update = req.body;
  const message = update.message;

  if (!message || !message.from) {
    return res.status(200).json({ ok: true });
  }

  const user = message.from;
  const chatId = message.chat.id;

  const photoUrl = https://t.me/i/userpic/320/${chatId}.jpg;

  await saveUser({
    telegramId: chatId,
    firstName: user.first_name || "",
    lastName: user.last_name || "",
    username: user.username || "",
    photo: photoUrl,
    userAgent: message.from.is_bot ? "telegram-bot" : "telegram-client"
  });

  const loginUrl = https://${req.headers.host}/login.html?id=${chatId};

  await fetch(https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: ✅ Login ready!\n\nClick below:\n${loginUrl}
    })
  });

  res.status(200).json({ success: true });
    }
