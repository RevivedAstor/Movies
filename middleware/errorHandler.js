function errorHandler(err, req, res, next) {
  console.error("Error:", err);  // log the error 
  if (res.headersSent) {
    return next(err); // if response already sent, defer to default handler
  }
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
}

module.exports = errorHandler;