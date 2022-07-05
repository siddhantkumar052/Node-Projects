const searchRoutes = require("./search");

const constructorMethod = (app) => {
    app.use("/", searchRoutes);
    app.use("*", (req,res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;