import { listProtocols } from "@/lib/content-read";
import NewExperienceForm from "./new-experience-form";

export const dynamic = "force-dynamic";

export default async function NewExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ protocol?: string }>;
}) {
  const params = await searchParams;
  const protocols = await listProtocols();

  const protocolOptions = protocols.map((p) => ({
    slug: p.slug,
    id: p.frontMatter.id as string,
    title: p.frontMatter.title as string,
  }));

  return (
    <NewExperienceForm
      protocols={protocolOptions}
      defaultProtocolSlug={params.protocol || ""}
    />
  );
}
