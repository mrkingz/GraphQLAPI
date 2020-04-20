const errorFormatter = (error, statusCode = 400) => {
  const err = new Error()
  err.message = { statusCode, error }
  return err
}

export default errorFormatter
