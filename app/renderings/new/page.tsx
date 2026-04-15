import { listInterpretations } from "@/lib/queries/interpretations";
import NewRenderingForm from "./new-rendering-form";

export const dynamic = "force-dynamic";

export default async function NewRenderingPage() {
  const interpretations = await listInterpretations();

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Submit a rendering</h1>
        <p className="page-desc">
          A rendering is a visual, spatial, or sensory representation derived from
          experiential data. Submit a link to an external work, or describe an
          in-progress piece.
        </p>
      </div>
      <NewRenderingForm interpretations={interpretations} />
    </main>
  );
}
