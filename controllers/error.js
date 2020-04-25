exports.pnf = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'PAGE NTF', path:'error' }); 
// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
};