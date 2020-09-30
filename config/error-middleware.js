
exports.catchErrors = (action) => (req, res, next) => {
  const log = {};


  return action(req, res).catch(next);
};

exports.devErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const error = {
    error: true,
    msg: err.sqlMessage || err.message,
    code: err.code,
    message: err.sqlMessage || err.message,
  };


  return res.status(status).json({ status, ...error });
};

exports.throwError = (status, message) => {
  const error = { error: true, status, message };
  throw error;
};

exports.throwSuccess = (status, message) => {
  const error = { status, message };
  throw error;
};
