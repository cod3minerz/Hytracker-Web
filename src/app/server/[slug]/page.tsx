import { notFound, redirect } from "next/navigation";
import { getServerBySlug, getServerById, getSimilarServers } from "@/app/data/servers";
import { ServerPageClient } from "./ServerPageClient";

export default async function ServerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let server = getServerBySlug(slug);
  if (!server) {
    server = getServerById(slug);
    if (server) redirect(`/server/${server.slug}`);
    notFound();
  }
  const similar = getSimilarServers(server);
  return <ServerPageClient server={server} similarServers={similar} />;
}
