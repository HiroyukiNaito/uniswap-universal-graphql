const APP_SECRET = process.env.APP_SECRET.trim();

const authenticateUser = (request) => {

  const header = request.headers.get('authorization');
 
  if(!APP_SECRET){throw new Error('No APP_SECRET defined!')};
  // No APP_SECRET defined
  if(APP_SECRET.length===0){throw new Error('No APP_SECRET defined!')};
  // No auth header
  if(header === null){throw new Error('No Authorization Header!')};
  const token = header.split(' ')[1];
  if(token.length===0){throw new Error('No token defined!')};
  // Wrong token
  if(token !== APP_SECRET){throw new Error(`Authorization Error!: ${token}`)};

  return "Authentication success"
}
module.exports = authenticateUser