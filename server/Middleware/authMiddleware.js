import jwt from 'jsonwebtoken'

const protect =async (req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.status(401).json({message:"unAuthorized"})
    }
    try {
        const decode=jwt.verify(token, process.env.JWt_SECRET);
        req.userId=decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}

export default protect;