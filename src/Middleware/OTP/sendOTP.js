const { ApiError } = require("../../../errorHandler");

module.exports = {
  async sendOTP(number, otp) {
    const axios = require("axios");

    const options = {
      method: "POST",
      url: "https://api.msg91.com/api/v5/flow/",
      headers: {
        authkey: "372078AVkzLEKti61I61e7c540F1",
        // authkey: "372078AVkzLEKti61I61e7c540P1", // rignt API key
        "content-type": "application/JSON",
        Cookie: "PHPSESSID=p6sigj223tdkhtfnq7l41tplh3",
      },
      data: {
        flow_id: "61e80b152189eb79e85bb0f2",
        sender: "BGGIES",
        mobiles: "91" + number,
        var: otp,
      },
    };
    console.log(number, otp);
    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.log(error.message, "Middleware/OTP/sendOTP");
    }
  },
};
