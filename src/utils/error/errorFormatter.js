const errorFormatter = (error, statusCode = 400) => {
  const err = new Error();
  if (typeof error === 'string') {
    err.message = { statusCode, ...error };
  } else {
    err.message = { statusCode, ...error };
  }

  return err;
};

export default errorFormatter;
