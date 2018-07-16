const btoa = require("btoa");
const atob = require("atob");

/* === base 64 encoding === */
// 1. base64-encoding the header
const header = {
  alg: "HS256",
  typ: "JWT"
};

const encodedHeader = btoa(JSON.stringify(header));
// console.log(encodedHeader);

// base64-decoding the header
const decoded = JSON.parse(atob(encodedHeader));
// console.log(decoded);

// 2. repeat for payload
const payload = {
  sub: "1234567890",
  name: "John Doe",
  password: "mysSecretPassword",
  iat: 1516239022
};

const encodedPayload = btoa(JSON.stringify(payload));
// console.log(encodedPayload);

const decodedPayload = JSON.parse(atob(encodedPayload));
// console.log(decodedPayload);

/* === encryption === */
// 3. creating an encrypted signature using sha256 algorithm
const crypto = require("crypto");
const key = "some_secret";

const hash = crypto
  .createHmac("sha256", key)
  .update(`${encodedHeader}.${encodedPayload}`)
  .digest("base64");
console.log(hash);
