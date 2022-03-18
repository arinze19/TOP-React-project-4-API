// Base Models
/**
 * @typedef Product
 * @property {integer} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {Array.<integer>} availableSizes
 * @property {Array.<Image>} image
 * @property {Array.<Comment>} comment
 */

/**
 * @typedef Comment
 * @property {integer} id
 * @property {User.model} User
 * @property {string} remark
 * @property {string} comment
 * @property {number} star
 * @property {string} date
 */

/**
 * @typedef Image 
 * @property {string} type 
 * @property {string} url
 */

/**
 * @typedef User
 * @property {integer} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} isEmailVerified
 */

/**
 * @typedef Booking 
 * @property {integer} id 
 * @property {string} pin
 * @property {number} count 
 * @property {string} status
 */

// Request Models

/**
 * @typedef SignUpRequest
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} password.required
 */

/**
 * @typedef SignInRequest
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef PostCommentRequest
 * @property {string} remark
 * @property {string} comment
 * @property {number} star
 */

/**
 * @typedef PostProductRequest 
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {Array.<integer>} availableSizes
 * @property {Array.<Image>} images
 */

/**
 * @typedef ForgotEmailRequest 
 * @property {string} email
 */

// Response Models

/**
 * @typedef AuthResponse
 * @property {string} token
 * @property {User.model} user
 */

/**
 * @typedef VerificationResponse 
 * @property {string} message
 */

/**
 * @typedef Error
 * @property {string} message
 */

/**
 * @typedef BookingResponse 
 * @property {Booking.model} booking
 */
