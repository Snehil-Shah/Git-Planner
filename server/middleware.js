module.exports.isAuthenticated = function(req,res,next){
    if(req.user){
        next();
    } else{
    return res.status(401).redirect(process.env.CLIENT_URL)}
}

module.exports.handleBadRequests = function (err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
}

module.exports.exceptionHandler = function(f){
    return function(req,res,next){
        Promise.resolve(f(req,res,next)).catch(next);
    }
}