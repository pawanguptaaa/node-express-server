module.exports =async function isAuthenticated(req,res,next){
    //bearer <toekn</toekn>
    const token=false;
        if(token){
            return res.send("failed")
        }
        else{
             console.log("hello");
            next();
        }
}