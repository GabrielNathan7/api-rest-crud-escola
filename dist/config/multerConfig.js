"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// Retorna um valor aleatorio entre 10K e 20K
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  // Filtra o recebimento de arquivos que são apenas PNG ou JPG
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return callback(new _multer2.default.MulterError('Arquivo precisa ser PNG ou JPG'));
    }

    return callback(null, true);
  },
  storage: _multer2.default.diskStorage({
    // Indica o caminho que a fota será salva no sistema
    destination: (req, file, callback) => {
      callback(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    // A foto terá o nome da data atual em milisegundos underscore, um número
    // aleatorio entre 10K e 20 K e a extensão do arquivo original
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
