const array = [];

const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");//// this is from install jsonwebtoken
const secret_key = "mukesh";
// const bcrypt = require("bcrypt");


const register = (req,res) => {
    const data = req.body;
    const detail = array.find(item => item.email === data.email);

    if(detail) {
        return res.send({message: "User Already Registered"});
    }

    const saltround = bcrypt.genSaltSync(10);
    // console.log(saltround);

    const hashpass = bcrypt.hashSync(data.password, saltround);
    // console.log(hashpass);

    const tempobj = {
        email: data.email,
        password: hashpass
    }

    array.push(tempobj);
    // res.send(hashpass);

    array.push(data);
    const token = jwt.sign({useremail: data.email}, secret_key,{expiresIn: "1 d"});
    console.log(token);

    res.send({ message: 'Your Email Is Registered Successfully......', token: token });
}

const login = (req, res) => {
    const logindata = req.body;
  
    const user = array.find(item => item.email === logindata.email);
  
    if (user) {

      const validate = bcrypt.compareSync(logindata.password,user.password); /// it will give you the boolean value

      if(validate){
          const token = jwt.sign({useremail: logindata.email}, secret_key,{expiresIn:"1 d"})/// for genrating jwt token
          console.log(token);
          return res.send({ message: "user logged-in successfully"})
      }else{
          return res.send({ message: "User is not correct. Please enter the correct details"})
      }
  
    } else {
      console.log('Email is not found. Please enter a valid email.');
      res.send({ message: 'Login failed. Email not found.' });
    }
  };
  
  module.exports = { register, login };

//////////////////////////// first try ////////////////////////

// const array = [];
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const seceret_key = "mukesh"; // Typo: Corrected "seceret_key" to "secret_key"

// const register = (req, res) => {
//     const data = req.body;
//     const detail = array.find(item => item.email === data.email);

//     if (detail) {
//         return res.send({ message: "User Already Registered" });
//     }

//     const saltround = bcrypt.genSaltSync(10);
//     // console.log(saltround);

//     const hashpass = bcrypt.hashSync(data.password, saltround);
//     // console.log(hashpass);

//     const tempobj = {
//         email: data.email,
//         password: hashpass
//     }

//     array.push(tempobj);
//     const token = jwt.sign({ useremail: data.email }, seceret_key, { expiresIn: "1d" });
//     console.log(token);

//     res.send({ message: 'Registration successful', token: token });
// }

// const login = (req, res) => {
//     const logindata = req.body;

//     const user = array.find(item => item.email === logindata.email);

//     if (user) {
//         const validate = bcrypt.compareSync(logindata.password, user.password);

//         if (validate) {
//             const token = jwt.sign({ useremail: logindata.email }, seceret_key, { expiresIn: "1d" });
//             console.log(token);
//             return res.send("User logged in successfully");
//         } else {
//             return res.send("User is not correct. Please enter the correct details");
//         }
//     } else {
//         console.log('Email is not found. Please enter a valid email.');
//         res.send({ message: 'Login failed. Email not found.' });
//     }
// };

// module.exports = { register, login };

