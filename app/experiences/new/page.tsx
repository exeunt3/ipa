import { listProtocols } from "@/lib/content-read";
import NewExperienceForm from "./new-experience-form";

export default async function NewExperiencePage({
searchParams,
}: {
searchParams: { protocol?: string };
}) {
const protocols = await listProtocols();

const protocolOptions = protocols.map((p) => ({
slug: p.slug,
id: p.frontMatter.id,
title: p.frontMatter.title,
}));

return (
<NewExperienceForm
protocols={protocolOptions}
defaultProtocolSlug={searchParams.protocol || ""}
/>
);
}