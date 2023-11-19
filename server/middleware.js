module.exports.isAuthenticated = function(req,res,next){
    if(req.user){
        next();
    } else{
    return res.status(401).redirect('http://localhost:3000')}
}

module.exports.handleBadRequests = function (err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
}