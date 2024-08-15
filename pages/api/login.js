// api/login.js
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export default function handler(req, res) {
  console.log('Login attempt received'); // Log the request

  if (req.method === 'POST') {
    const { username, password } = req.body;

    console.log(`Username: ${username}, Password: ${password}`); // Log username and password

    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

      res.setHeader('Set-Cookie', serialize('auth', token, {
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'strict',
        path: '/'
      }));
      

      console.log('Login successful, token set'); // Log successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid username or password'); // Log invalid login attempt
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
