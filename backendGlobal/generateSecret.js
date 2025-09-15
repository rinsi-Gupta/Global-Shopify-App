const crypto = require('crypto');

// Generate a 32-byte (256-bit) random string and convert to hex
const secret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET:', secret);