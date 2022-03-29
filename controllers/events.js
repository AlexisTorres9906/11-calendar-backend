const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos: eventos,
  });
};

const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarEvento = async(req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el evento",
      });
    }
    if(evento.user.toString() !==uid){
        return res.status(401).json({
            ok: false,
            msg: "No tiene permisos para actualizar este evento",
        });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {
      new: true,
    });
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarEvento = async(req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el evento",
      });
    }
    if(evento.user.toString() !==uid){
        return res.status(401).json({
            ok: false,
            msg: "No tiene permisos para borrar este evento",
        });
    }
    await Evento.findByIdAndRemove(eventoId);
    res.json({
      ok: true,
      msg: "Evento borrado",
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento,
};
