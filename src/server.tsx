import { configDotenv } from "dotenv";
import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import h from "vhtml";
import { z } from "zod";
import { Document } from "./document";
import { Count, TodoApp, TodoForm, TodoItem } from "./views";

configDotenv();

const port = z.coerce.number().catch(1337).parse(process.env.PORT);
const baseUrl = process.env.BASE_URL || "http://localhost";

const app = express();

app.use(express.static(path.join(__dirname, "css")));
app.use(express.urlencoded({ extended: true }));

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const todos = new Map<string, Todo>(); // In-memory database

app.get("/", (req, res) => {
  res.send(
    <Document>
      <TodoApp todos={[...todos.values()]} count={todos.size} />
    </Document>,
  );
});

app.put("/api", (req, res) => {
  const todoInput = z.string().trim().nonempty().safeParse(req.body.todo);
  if (!todoInput.success) {
    res.send(<TodoForm error={todoInput.error.issues[0].message} />);
    return;
  }
  const id = uuidv4();
  const todo = {
    id,
    text: todoInput.data,
    completed: false,
  };
  todos.set(id, todo);
  res.send(
    <>
      <TodoItem todo={todo} />
      <TodoForm />
      <Count count={todos.size} />
    </>,
  );
});

app.patch("/api/:id", (req, res) => {
  console.log(req.body);
  const todoId = z.string().uuid().parse(req.params.id);
  let todo = todos.get(todoId);
  if (todo) {
    todo.completed = !todo.completed;
    res.send(<TodoItem todo={todo} />);
  } else {
    res.status(404).send();
  }
});

app.delete("/api/:id", (req, res) => {
  const todoId = z.string().uuid().parse(req.params.id);
  todos.delete(todoId);
  res.send(<Count count={todos.size} />);
});

app.listen(port, () => {
  console.log(`Enjoy vHTMX at ${baseUrl}:${port}`);
});
