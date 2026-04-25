import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { match } from 'assert';

// buat folder 'uploads' otomatis jika belum ada
const uploadDirectory = 'uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// konfigurasi tempat penyimpanan dan penamaan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // simplan di folder /uploads
  },
  filename: function (req, file, cb) {
    // format nama file timestamp_namaAsli (agar tidak ada nama duplikat)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// inisialisasi multer
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // batasan file maksimal 5MB
});
