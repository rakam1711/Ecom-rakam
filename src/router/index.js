const express = require("express");
const unspecifiedRoutesHandler = require("./unspecifiedRoute");
const { finalErrorHandler } = require("../../errorHandler/index.js");
const userRoute = require("./userRouter.js");
const vendorRoute = require("./vendorRoute.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const limitter1 = require("../../apiRateLimitter/limitter1.js");
const limitter2 = require("../../apiRateLimitter/limmiter2.js");
const adminroutes = require("./adminRouter.js");
const productRouter = require("./adminRouter.js");

const serviceRoute = require("./serviceRoute.js");

const appRoutes = (app) => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/api/ping", limitter1, (_, res) =>
    res.status(200).json({
      status: true,
      message: `${process.env.PROJECT} Ping Successfully.`,
      timestamp: new Date(),
    })
  );
  app.use("/public", express.static("public"));

  app.use("/admin", limitter1, adminroutes);
  app.use("/user", limitter1, userRoute);
  app.use("/vendor", limitter1, vendorRoute);
  app.use("/services", limitter1, serviceRoute);
  app.use("/api", limitter2, productRouter)

  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;
