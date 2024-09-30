import dotenv from 'dotenv';

dotenv.config();
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token && token === process.env.AUTH_TOKEN) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default authenticate;