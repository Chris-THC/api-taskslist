import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes.js";

// leer variables de entorno
import { PORT } from "./config/config.js";

const app = express();

//TODO: ==> (Enable All CORS Requests)

app.use(cors());

// ? Esto hace que los datos se conviertan en json para que el backend lo pueda interpretar
app.use(express.json());

app.use("/tasks", taskRoutes);

// Por si el usuario ingresa una ruta y esta no se encuentra
app.use((req, res, next) => {
  res.status(404).json({
    message: "Data not fund",
  });
});

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
