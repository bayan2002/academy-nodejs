
const logout = async (req, res) => {
  res.clearCookie('token');
  return { status: 200, msg: 'Logged Out' };
};

module.exports = logout