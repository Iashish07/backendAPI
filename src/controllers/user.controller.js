import {User} from '../models/user.model.js';
const registerUser = async (req, res) => {
  // Registration 
  const {username, password} = req.body;
  const existingUser = await User.findOne({username});
  if(existingUser) return res.status(400).send('Username already exists');
  const user = new User({username, password});
  await user.save();
  res.send('User registered successfully');
};


const loginUser = async (req, res) => {

  // Login 
  try{ const {username, password}= req.body;
  const user = await User.findOne({username});
  if(!user) return res.status(400).send('invalid username or password');
  const isMatch = await user.comparePassword(password);
  if(!isMatch) return res.status(400).send('invalid username or password');
  const token = user.generateToken();
  res.json({token});}
  
  catch(err){
    res.status(500).send('Server error');
  }

};
export { registerUser, loginUser };

