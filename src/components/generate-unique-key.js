function generateRandomKey() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 16;
  let randomKey = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }
  return randomKey;
}

function getCurrentTimestamp() {
  return Date.now().toString(16);
}

export function generateUniqueKey() {
  const randomKey = generateRandomKey();
  const timestamp = getCurrentTimestamp();
  return randomKey + timestamp;
}
