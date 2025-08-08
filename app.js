const express = require('express');
const app = express();
const PORT = 3000;
const path=require("path");
const multer = require('multer');
const fs=require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


let filename;
let rout;
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
 res.render("upload");
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  rout=req.body.rout;
  console.log(rout);
  filename="gc_"+req.file.originalname;
  console.log(filename);
  const filePath = path.join(uploadDir,filename);
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      return res.status(500).send('Error saving file.');
    }
  res.redirect(`/gc`);

  if(rout){
  app.post(`/${rout}`,(req,res)=>{
  let data=req.body;
  console.log(data);
  res.render("viewdata",{data});
  });
  }
 });
});


app.get("/gc",(req,res)=>{
res.sendFile(path.join(__dirname, 'uploads', filename));
})



app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
