// Importamos la conexion a la base de datos
import { connection } from "../connection/connection.js";

// Muestra todos los datos que se encuentren
export const getTasks = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM task");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong on get all task",
    });
  }
};

// Solo muestra un dato dependiendo de id o nombre que le indiquen

export const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM task WHERE idTask = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong on get only task",
    });
  }
};

export const createTask = async (req, res) => {
  const { nameTask, descriptionTask } = req.body;

  try {
    const [rows] = await connection.query(
      "INSERT INTO task (nameTask, descriptionTask) VALUES (?, ?)",
      [nameTask, descriptionTask]
    );
    res.send({
      id: rows.insertId,
      nameTask,
      descriptionTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong on create a new task",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "DELETE FROM task WHERE idTask = ? ",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Task not fund to delete",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong on delete the task",
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { nameTask, descriptionTask, isDone } = req.body;

  try {
    const [result] = await connection.query(
      "UPDATE task set nameTask = IFNULL(?, nameTask), descriptionTask = IFNULL(?, descriptionTask), isDone = IFNULL(?, isDone) WHERE idTask = ?",
      [nameTask, descriptionTask, isDone, id] 
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not fund to update",
      });
    }

    const [rows] = await connection.query("SELECT * FROM task WHERE idTask = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong on update the task",
    });
  }
};
