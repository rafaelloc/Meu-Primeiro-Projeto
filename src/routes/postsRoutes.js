import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
  // Cria uma instância do middleware Multer
  const upload = multer({ dest: "./uploads" , storage });

const routes = (app) => {
    app.use(express.json());
    // Rota para buscar todos os posts
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts);
    // Rota para criar um post (get)
    app.post("/posts", postarNovoPost)
    // Rota para enviar um post (post)
    app.post("/upload", upload.single("imagem"), uploadImagem)
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;