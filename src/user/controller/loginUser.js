const { ApiError } = require("../../errorHandler/index.js");
const getOTP = require("../../moddleware/OTP/otp.js")
const loginUser = async (req, res) => {
    try {
        const body = {
            number: req.body.number,
        };
        body.otp = await getOTP();
        body.time = new Date(Date.now() + 60000 * 5).getTime();
        const user = await otpSchema.findOne({ mobile_number: number });
        if (!user) {
          let newUser = new otpSchema({
            mobile_number: number,
            otp: otp,
            expire_time: time,
          });
          const abc = await newUser.save();
        } else {
          await otpSchema.findOneAndUpdate(
            { _id: user._id, mobile_number: number },
            {
              $set: {
                otp: otp,
                expire_time: time,
                wrong_attempt: 0,
                is_active: true,
              },
            },
            { new: true }
          );
        }
        const data = await OTP.sendOTP(number, otp);

    } catch (err) {
        return new ApiError(err.message, 400, "Login Controller")
    }
}
module.exports = loginUser