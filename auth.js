const APP_SECRET = process.env.APP_SECRET.trim();
const authenticateUser = (request) => {
  const header = request.headers.get("authorization");
  const token = header.split(" ")[1];

  if (!APP_SECRET) {
    throw new Error("No APP_SECRET Defined!");
  }
  // No APP_SECRET defined
  if (APP_SECRET.length === 0) {
    throw new Error("No APP_SECRET Defined!");
  }
  // No auth header
  if (header === null) {
    throw new Error("No Authorization Header!");
  }

  if (token.length <= 11) {
    throw new Error("Token Length Shorter Than 12");
  }
  // Wrong token
  if (token !== APP_SECRET) {
    throw new Error(`Authorization Error!: ${token}`);
  }

  if (token === APP_SECRET && token.length >= 12 && APP_SECRET.length >= 12) {
    return "Authentication success";
  }
  throw new Error("All unmatch authorization error!");
};
module.exports = authenticateUser;
