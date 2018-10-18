const base64url = require('base64-url')

// 1. base64url-encoding the header
const header = {
  alg: "HS256",
  typ: "JWT"
};

const encodedHeader = base64url.encode(JSON.stringify(header));
console.log("JWT header", encodedHeader);

// 2. encoding for payload
const payload = {
  sub: "1234567890",
  name: "John Doe",
  password: "mysSecretPassword",
  iat: 1516239022
};

const encodedPayload = base64url.encode(JSON.stringify(payload));
console.log("JWT payload", encodedPayload);

// 3. creating an encrypted signature using HMAC sha256 algorithm
const crypto = require("crypto");
const key = "some_secret";

const hash = crypto
  .createHmac("sha256", key)
  .update(`${encodedHeader}.${encodedPayload}`)
  .digest("base64");

console.log("JWT signature", hash);
console.log("")

// base64url-decoding the header
const decoded = JSON.parse(base64url.decode(encodedHeader));
console.log("Decoded header", decoded);

const decodedPayload = JSON.parse(base64url.decode(encodedPayload));
console.log("Decoded payload", decodedPayload);
