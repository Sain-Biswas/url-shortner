import { Spinner } from "~/shadcn/ui/spinner";

export default function LoadingComponent() {
  return (
    <main className="grid min-h-screen place-content-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <p>Loading</p>
      </div>
    </main>
  );
}
