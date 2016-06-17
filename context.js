"use strict";
const Sura = require('./models/Sura');
const Ayah = require('./models/Ayah');
const Language = require('./models/Language');

const context = {
    Sura,
    Ayah,
    Language
};

module.exports = context;