import multer from 'multer';
import { extname, resolve } from 'path';

// Retorna um valor aleatorio entre 10K e 20K
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Filtra o recebimento de arquivos que são apenas PNG ou JPG
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return callback(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }

    return callback(null, true);
  },
  storage: multer.diskStorage({
    // Indica o caminho que a fota será salva no sistema
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    // A foto terá o nome da data atual em milisegundos underscore, um número
    // aleatorio entre 10K e 20 K e a extensão do arquivo original
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
