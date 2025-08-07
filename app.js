const express = require('express');
const cors = require('cors');
const app = express();
const cookie = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));
app.use(cookie());
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { userSignup } = require('./src/controllers/userController/userController');
const userRoutes = require('./src/routes/userRouter');
const cloudinary = require('./src/config/cloudinary/cloudinary');
const ImageUpload = require('./src/middlewares/ImageUploader');
const CategoryRouter = require('./src/routes/categoryRoute');
const adminRouter = require('./src/routes/adminRoute');
const ProductsRouter = require('./src/routes/productsRoute');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/upload'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// app.post('/upload-excel', upload.single('file'), (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

//     fs.unlinkSync(req.file.path); // delete uploaded file after read

//     const headers = Object.keys(data[0]);
//     const creditCardEnd = headers.findIndex(h => h.toLowerCase().includes('total credit'));
//     const personalLoanEnd = headers.findIndex(h => h.toLowerCase().includes('total personal'));

//     const creditCardKeys = headers.slice(1, creditCardEnd); // exclude name
//     const personalLoanKeys = headers.slice(creditCardEnd + 1, personalLoanEnd);
//     const settlementKeys = headers.slice(personalLoanEnd + 1);

//     const structured = data.map(row => {
//       const creditCards = {};
//       creditCardKeys.forEach(key => creditCards[key] = row[key]);

//       const personalLoans = {};
//       personalLoanKeys.forEach(key => personalLoans[key] = row[key]);

//       const settlements = {};
//       settlementKeys.forEach(key => settlements[key] = row[key]);

//       return {
//         Person: row[headers[0]], // e.g., name
//         CreditCard: creditCards,
//         PersonalLoan: personalLoans,
//         AdvanceAndSettlement: settlements
//       };
//     });

//     res.status(200).json({ success: true, data: structured });

//   } catch (error) {
//     console.error("Error parsing Excel:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

const baseURL ='/api/v1/';
app.use(`${baseURL}user`,userRoutes);
app.use(`${baseURL}admin`,adminRouter);
app.use(`${baseURL}category`,CategoryRouter);
app.use(`${baseURL}product`,ProductsRouter);
module.exports = app;