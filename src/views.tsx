import h from "vhtml";
import { Todo } from "./server";

export const TodoApp = (props: {
  todos: Todo[];
  count: number;
  currentFilter: TodoFilter;
}) => (
  <div class="mx-auto w-full max-w-xl px-5">
    <h1 class="select-none text-center font-mono text-7xl italic">
      todos
      <Count count={props.count} />
    </h1>
    <TodoForm />
    <TodoList todos={props.todos} />
    <TodoFilters currentFilter={props.currentFilter} />
    <a href="https://htmx.org">
      <img
        src="https://htmx.org/img/createdwith.jpeg"
        class="sticky bottom-0 my-5 border-2 border-black shadow-[4px_4px_0_0_black]"
      />
    </a>
  </div>
);

export const TodoForm = (props: { error?: string }) => (
  <form
    id="todo-form"
    hx-put="/api"
    hx-target="#todo-list"
    hx-swap="beforeend"
    hx-swap-oob="true"
  >
    <input
      type="text"
      name="todo"
      placeholder="What needs to be done?"
      autofocus
      class="w-full p-2 outline-none ring-1 ring-inset focus:shadow-[2px_2px_0_0_black] focus:ring-2"
    />
    {!!props.error && (
      <p class="mt-1 text-sm italic text-red-500">{props.error}</p>
    )}
  </form>
);

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <ul id="todo-list" class="my-5">
    {todos.map((todo) => (
      <TodoItem todo={todo} />
    ))}
  </ul>
);

export const TodoItem = ({ todo }: { todo: Todo }) => (
  <li
    hx-target="this"
    hx-swap="outerHTML"
    class="flex items-center gap-2 bg-emerald-200 p-2.5 shadow-[4px_4px_0_0_black] ring-1 ring-inset"
  >
    <input
      hx-patch={`/api/${todo.id}`}
      type="checkbox"
      checked={todo.completed}
      class="scale-150 accent-orange-600"
    />
    <span class={todo.completed ? "line-through" : undefined}>{todo.text}</span>
    <button hx-delete={`/api/${todo.id}`} hx-swap="delete" class="ml-auto">
      X
    </button>
  </li>
);

type TodoFilter = "all" | "active" | "completed";

export const TodoFilters = ({
  currentFilter,
}: {
  currentFilter: TodoFilter;
}) => (
  <div
    id="todo-filters"
    hx-target="#todo-list"
    hx-boost={true}
    hx-swap-oob="true"
    class="flex gap-px bg-black p-px shadow-[2px_2px_0_0_black]"
  >
    <NavLink href="/" active={currentFilter == "all"}>
      All
    </NavLink>
    <NavLink href="/active" active={currentFilter == "active"}>
      Active
    </NavLink>
    <NavLink href="/completed" active={currentFilter == "completed"}>
      Completed
    </NavLink>
  </div>
);

const NavLink = (props: {
  href: string;
  children: string;
  active?: boolean;
}) => (
  <a
    href={props.href}
    aria-selected={props.active}
    class="flex-1 bg-white text-center aria-selected:bg-purple-400"
  >
    {props.children}
  </a>
);

export const Count = ({ count }: { count: number }) => (
  <span
    id="todo-count"
    hx-swap-oob="true"
    class="absolute w-max rounded-xl bg-rose-300 px-1 align-top font-sans text-lg"
  >
    {count.toString()}
  </span>
);
