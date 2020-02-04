const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// ! Creating a new model object for the user - a blueprint for user in my database 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// ! In the model lifecycle, the password key is deleted whenever the data is transformed to json 
userSchema
  .set('toJSON', {
    transform(doc, json) {
      delete json.password
      return json
    }
  })

// ! Giving the Schema the 'validate password' function which compares object password to the password passed as an arguement
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

// ! Gives the model object a virtual key, and then sets the value
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordValidation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// ! PRE HOOK - before validtion, if the document has been modified the password does not match the confirmation, invalidate the process
userSchema
  .pre('validate', function passwordMatchCheck(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('password Confirmation', 'Does not match')
    }
    next()
  })

// ! Before the object gets to the save part of it's lifecycle, hash the password
userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)