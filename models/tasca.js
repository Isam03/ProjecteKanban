const { json } = require("express");
const mongoose = require("mongoose");

const TascaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    titulo_corto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: String,
        required: true
    },
    fecha_finalizacion: {
        type: String,
        required: true
    },
    responsable: {
        type: Array
    }

});

const Tasca = mongoose.model("tasques", TascaSchema);

module.exports = Tasca;
