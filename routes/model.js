// Base Models
/**
 * @typedef Product
 * @property {integer} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {[integer]} availableSizes
 * @property {[string]} imagesUrl
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
 * @typedef User
 * @property {integer} id
 * @property {string} name
 * @property {string} email
 */

// Request Models

/**
 * @typedef SignupRequest
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} password.required
 */

/**
 * @typedef SigninRequest
 * @property {string} name.required
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
 * @property {[integer]} availableSizes
 * @property {[string]} imagesUrl
 */

// Response Models

/**
 * @typedef AuthResponse
 * @property {string} token
 * @property {User.model} user
 */

/**
 * @typedef Error
 * @property {string} message
 */
