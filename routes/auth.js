/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la contraseña debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  crearUsuario
);

router.post("/",[
  check("email", "el email es obligatorio").isEmail(),
  check("password", "la contraseña debe ser de 6 caracteres").isLength({
    min: 6,
  }),
  validarCampos
], login);

router.get("/renew",validarJWT, renewToken);

module.exports = router;
