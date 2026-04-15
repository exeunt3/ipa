import { listReports } from "@/lib/queries/reports";
import NewInterpretationForm from "./new-interpretation-form";

export const dynamic = "force-dynamic";

export default async function NewInterpretationPage() {
  const reports = await listReports({ limit: 200 });

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>New interpretation</h1>
        <p className="page-desc">
          Select reports and describe the pattern, structure, or mapping you see.
          Interpretations are forkable, non-authoritative, and coexist with competing views.
        </p>
      </div>
      <NewInterpretationForm reports={reports} />
    </main>
  );
}
