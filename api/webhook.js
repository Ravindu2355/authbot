import { saveUser } from "./saveUser.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const msg = req.body.message;
  if (!msg) return res.status(200).end();

  const user = msg.from;
  const chatId = msg.chat.id;

  await saveUser({
    telegramId: chatId,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    photo: https://t.me/i/userpic/320/${chatId}.jpg
  });

  const loginUrl = https://${req.headers.host}/login.html?id=${chatId};

  await fetch(https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: ✅ Login successful\n\n${loginUrl}
    })
  });

  res.json({ ok: true });
    }
