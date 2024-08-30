import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  type ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
} from "@remix-run/react";
import type {
  ClientQuery,
  ClientQueryBuilder,
  CollectionNameFromModels,
} from "@triplit/client";
import { useQuery } from "@triplit/react";
import Todo from "~/components/todo";
import { type Models, triplit } from "~/triplit/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const query = triplit.query("todos").order("created_at", "DESC");

export async function loader({ context }: LoaderFunctionArgs) {
  const results = await context.db.fetch({
    collectionName: "todos",
    order: [["created_at", "DESC"]],
  });

  return {
    results,
  };
}

export async function clientAction({ request }: ClientLoaderFunctionArgs) {
  const form = await request.formData();
  const text = form.get("text");
  if (typeof text !== "string" || !text)
    return new Response("Bad Request", { status: 400 });

  await triplit.insert("todos", { text });

  return null;
}

function useSyncedData<
  CN extends CollectionNameFromModels<Models>,
  Q extends ClientQuery<Models, CN>
>(query: ClientQueryBuilder<Models, CN, Q>) {
  const loaderResults = useLoaderData<typeof loader>().results;
  const { results, error } = useQuery(triplit, query);

  console.log(loaderResults, results);
  return { results: results || loaderResults, error };
}

export default function Index() {
  const { results: todos } = useSyncedData(query);

  return (
    <>
      <Form method="POST">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
          name="text"
        />
        <button className="btn" type="submit">
          Add Todo
        </button>
      </Form>
      {todos && (
        <div>
          {Array.from(todos)
            .sort(([, todo1], [, todo2]) =>
              todo1.created_at > todo2.created_at ? -1 : 1
            )
            .map(([id, todo]) => (
              <Todo key={id} todo={todo} />
            ))}
        </div>
      )}
    </>
  );
}
