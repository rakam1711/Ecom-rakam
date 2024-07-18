const verifyotp = async (doc) => {
    try {
        const number = doc.number;
        const otp = Number(doc.otp);
        const time = new Date(Date.now()).getTime();
        const user = await otpSchema.findOne({ mobile_number: number });
        if (!user) {
            return new Error("Please register with this number first");
        }
        if (user.wrong_attempt >= 3) {
            return new Error(
                "you have exceed the limit of wrong attemt please resend OTP"
            );
        }
        if (user.expire_time < time) {
            return new Error("OTP time expired");
        }
        let code = process.env.STATICCODE;
        if (user.otp !== otp && code != otp) {
            const num = user.wrong_attempt + 1;
            const x = await otpSchema.findOneAndUpdate(
                { mobile_number: number },
                { wrong_attempt: num },
                { new: true }
            );
            return new Error(`Wrong OTP, attempt failed ${x.wrong_attempt}`);
        }
        if (user.otp === otp || (code == otp && user.is_active === true)) {
            await otpSchema.findOneAndUpdate(
                { mobile_number: number },
                { $set: { is_active: false } },
                { new: true }
            );

            if (doc.type && doc.type === 'login') {
                const codeRef = referralCode.alphaNumeric("uppercase", 2, 2);
                const sex = {};
                sex.mobile_number = doc.number;
                sex.refCode = codeRef;
                const boobs = new userSchema(sex);
                const newUser = await boobs.save();
                token = jwt.sign({ user_id: newUser._id, role: newUser.role }, JWTSECRET);
                return { token, newUser };
            } //dear new Developer, Main ashleel to nhi hu magar client ne majboor kiya hai....

            const newUser = await userSchema.findOne({ mobile_number: number });
            if (!newUser) {
                return "null";
            }
            token = jwt.sign(
                { user_id: newUser._id, role: newUser.role },
                JWTSECRET
            );
            console.log(token, "<<<<<<<<<<<<<<<<<<Token>>>>>>>>>>>>>>>>>>>>>>");
            return { token, newUser };
        } else {
            return new Error("OTP has been used");
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = verifyotp