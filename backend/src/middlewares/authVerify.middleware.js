import jwt from "jsonwebtoken"

export const authVerify = (req, res, next) => {
  try {
    let token;

    if(req.headers.authorization?.startsWith("Bearer ")){
      token = req.headers.authorization.split(" ")[1]
    }

    if(!token && req.cookies?.token){
      token = req.cookies.token
    }


    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if(decoded && !decoded._id){
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

