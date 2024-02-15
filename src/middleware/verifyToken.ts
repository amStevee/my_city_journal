import { Request, Response } from 'express';
interface CustomRequest extends Request {
  token?: string;
}


const secretKey = 'your_secret_key'; // This should be stored securely, preferably in an environment variable

// Middleware to verify JWT
export function verifyToken(req: CustomRequest, res: Response, next: () => void) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split the header at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

