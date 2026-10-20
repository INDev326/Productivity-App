import { createFileRoute } from "@tanstack/react-router";
import { FolioApp } from "@/components/folio/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FolioApp />;
}
