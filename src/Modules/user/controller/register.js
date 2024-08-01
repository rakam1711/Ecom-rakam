
const register = async (req, res) => {
    try {
        const mustData = {
            fullName: req.body.fullName,
            number: req.body.number,
            email: req.body.email,
            gender: req.body.gender
        };
        for (let key in mustData) {
            if (mustData[key] == undefined || mustData[key] == "") {
                throw new Error(`Invalid feild ${key}`);
            }
        }

        const a = 0;

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message, location: "src/Modules/use/controller/register" })
    }
}

module.exports = register;