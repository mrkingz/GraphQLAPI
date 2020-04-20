import errorFormatter from '../error/errorFormatter'

const validator = (model, fields) => {
  const fieldNames = []

  // Iterate the fields and add each field and the corresponding value to the model instance
  Object.entries(fields).forEach(entry => {
    fieldNames.push(entry[0])
    model[entry[0]] = entry[1]
  })

  const error = model.validateSync()
  if (error) {
    const { errors } = error
    const err = {}

    fieldNames.forEach(fieldName => {
      if (errors[fieldName] && errors[fieldName].path) {
        err[fieldName] = errors[fieldName].message
      }
    })

    throw errorFormatter(err)
  }

  return model
}

export default validator
