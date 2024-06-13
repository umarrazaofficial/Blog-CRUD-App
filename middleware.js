module.exports = reqFilter = (req, res, next) => {
    if (!req.query.age) {
        res.send("Please Provide age in the url");
    } else if (req.query.age < 18) {
        res.send("You must be at least 18 years old to access this website");
    } else {
        next();
    }
};
