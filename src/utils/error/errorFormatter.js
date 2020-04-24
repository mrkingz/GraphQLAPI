const errorFormatter = (error, statusCode = 400) => {
  const err = new Error()
  // noinspection JSValidateTypes
  err.message = { statusCode, error }
  return err
}

export default errorFormatter
