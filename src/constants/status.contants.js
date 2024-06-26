const successHandler = {
    login: "Login Successful",
    signUp: "Signup successful!",
    found: "Data retrieved Successfully!",
    update: "Data Updated Successfully!",
    restore: "Data Restored Successfully!",
    remove: "Data Removed Successfully!",
    saved: "Data Saved Successfully!",
    created: "Data Created Successfully!",
    delete: "Data Deleted Successfully!",
    accessToken: "access token created successfully",
  };
  
  const errorHandler = {
    pleaseContactAdmin : `Please Contact Admin`,
    login : "Failed to Login",
    invalidToken: "Invalid Token",
    missing: "Missing required parameters!",
    userNotFound: "User not found",
    phoneNotFound: "Phone number not registered",
    themeNotFound: "Theme not found",
    alreadyExist: "User already exists",
    emailAlreadyExist: "Email Already Exists",
    dataAlreadyExists : "Data Already Exists",
    password: "Password can't be empty",
    incorrectPassword : `Password you have entered is incorrect`,
    incorrectUsername : `Username you have entered is incorrect`,
    incorrectEmail : `Email you have entered is incorrect`,
    email : "Email can't be empty",
    samePassword: "New password cannot be same as old password",
    somethingWentWrong: "Something went wrong",
    dataNotFound: "Data not found!",
    idNotFound: "Id not found!",
    flagExists: "Data is already deleted!",
    notUpdate: "Data is deleted you can not update now!",
    errorCreatedDestination: "Error while create destination!",
    errorUpdateDestination: "Error while update destination",
    errorDeleteDestination: "Error while delete destination",
    errorGetDestination: "Error while get destination",
    tokenExpired: "Token Expired",
    idNotExist: `Id does not exist.`,
    errorUpload: "Error while uploading",
    errorRefreshToken: "Error while handle refresh token",
    errorUnauthorizedToken: "Unauthorized token, please login again",
    oldPassword: "Old password does not match",
    invalidPhone: "Phone is invalid",
    enterPhone: "Please enter your phone number",
    enterPassword: "Please enter your new password",
    enterPhonePassword: "Phone Number must be needed",
    invalidData: "Invalid Data",
  };
  
  module.exports = { successHandler, errorHandler };
  