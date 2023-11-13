module.exports.isAuthenticated = function(req,res,next){
    if(req.user){
        next();
    } else{
    return res.redirect('http://localhost:5173')}
}

module.exports.handleBadRequests = function (err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
}