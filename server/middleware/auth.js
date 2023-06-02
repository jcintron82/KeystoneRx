module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      
      res.json({message:'AUTHENTICATED'});
      next();
    } else {
      console.log('Bad Auth')
      res.redirect('http://localhost:3000/register');
    }
  },
};
