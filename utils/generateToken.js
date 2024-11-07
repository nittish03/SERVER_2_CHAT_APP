import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const generateTokenAndSetCookie = (userId,res) =>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIREIN
    });
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//MS
        httpOnly:true,// prevent css attacks cross-site scripting attacks
        sameSite:"strict",//crsf attacks cross-site req forgery attack

    })
};
export default generateTokenAndSetCookie;