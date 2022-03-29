const jwt = require("jsonwebtoken");

const generarJWT = (uid,name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        //expires in 30 minutes
        expiresIn: "30m",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
