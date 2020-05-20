const Boom = require("@hapi/boom");

module.exports = {
  memoryLeakError: (err) => {
    console.error(release_name);

    // app_config.get_release_name().then((release_name) => {
    //   console.error(release_name, err);
    // });
  },
  unCaughtException: (err) => {
    console.error(err);
  },
  badRequest: (...args) => {
    let req = null;
    let err = args[0];
    if (args[1]) {
      req = args[0];
      err = args[1];
    }

    if (!req) {
      console.log({
        type: "error",
        error_type: "badRequest",
        error: JSON.stringify(err),
      });
    } else {
      let access_by = {};
      if (req.user) access_by["user"] = { id: req.user.id, type: 1 };
      if (req.rider) access_by["rider"] = { id: req.rider.id, type: 2 };
      let start = parseInt(req["x-request-start"]);
      let end = new Date().getTime();
      req["x-execution-time"] = end - start;

      console.log({
        type: "error",
        error_type: "badRequest",
        execution_time: `${req["x-execution-time"]}`,
        access_by: access_by,
        path: req.path,
        headers: req.headers,
        method: req.method,
        payload: req.payload,
        query: req.query,
        error: JSON.stringify(err),
      });
    }

    console.error("API_ERROR", err);
    const error = Boom.badRequest(err);
    error.reformat();
    error.output.payload.success = false;

    throw error;
  },
  serverError: (...args) => {
    let err = args[0];
    if (args[1]) {
      req = args[0];
      err = args[1];
    }

    if (process.env.LOCAL_DEV != "true") {
      if (!req) {
        console.log({
          type: "error",
          error_type: "serverError",
          error: JSON.stringify(err),
        });
      } else {
        let access_by = {};
        if (req.user) access_by["user"] = { id: req.user.id, type: 1 };
        if (req.rider) access_by["rider"] = { id: req.rider.id, type: 2 };
        let start = parseInt(req["x-request-start"]);
        let end = new Date().getTime();
        req["x-execution-time"] = end - start;

        console.log({
          type: "error",
          error_type: "serverError",
          execution_time: `${req["x-execution-time"]}`,
          access_by: access_by,
          path: req.path,
          headers: req.headers,
          method: req.method,
          payload: req.payload,
          query: req.query,
          error: JSON.stringify(err),
        });
      }
    } else {
      console.error(args);
    }

    console.error("API_SERVER_ERROR", err);
    const error = Boom.serverUnavailable(err);
    error.reformat();
    error.output.payload.success = false;
    throw error;
  },
  log_MessageSendingError: (err, ...args) => {
    Sentry.configureScope((scope) => {
      if (args.length > 0) scope.setExtra("arguments", args.join(", "));

      scope.setTag("ERROR_TYPE", "SMS_SENDING_ERROR");
      Sentry.captureException(err);
    });
  },
  messageSendingError: (err) => {
    const error = Boom.badRequest(err);
    error.reformat();
    error.output.payload.success = false;
    throw error;
  },
  dbTransactionError: (err) => {
    const error = Boom.serverUnavailable(err);
    error.reformat();
    error.output.payload.success = false;
    throw error;
  },
  sqlQueryError: (err) => {
    console.log(err);
  },
  notificationError: (...args) => {
    let err = args[0];
    console.log(err);
  },
  databaseConnectionError: (...args) => {
    let err = args[0];
    console.log(err);
  },
  /**
   * @param: (err, user_id, USER_TYPE, extra)
   */
  pushError: (...args) => {
    let err = args[0];
    console.log(err);
  },
};
