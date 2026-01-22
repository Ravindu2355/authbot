import crypto from "crypto";

export async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const claimSet = {
    iss: process.env.FIREBASE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encode = obj =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const jwt = ${encode(header)}.${encode(claimSet)};

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(jwt);

  const signature = sign
    .sign(process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"))
    .toString("base64url");

  const assertion = ${jwt}.${signature};

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const data = await res.json();
  return data.access_token;
    }
