const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hubo un error al crear el usuario",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no existen",
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no existen",
      });
    }
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hubo un error al logearse",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    token,
    uid,
    name
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
