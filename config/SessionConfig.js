const secret = process.env.SESSION_SECRET || 'default-secret-key';

module.exports = {
    sessionSecret: secret
  };