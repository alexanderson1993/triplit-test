import type { Entity } from "@triplit/client";
import { triplit } from "~/triplit/client";
import type { schema } from "~/triplit/schema";

type Todo = Entity<typeof schema, "todos">;

export default function Todo({ todo }: { todo: Todo }) {
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          triplit.update("todos", todo.id, async (entity) => {
            entity.completed = !todo.completed;
          })
        }
      />
      {todo.text}
      <button
        type="button"
        className="x-button"
        onClick={() => {
          triplit.delete("todos", todo.id);
        }}
      >
        ❌
      </button>
    </div>
  );
}
