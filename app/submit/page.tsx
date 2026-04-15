import { Suspense } from "react";
import { listGenres } from "@/lib/queries/genres";
import { listFrameworks } from "@/lib/queries/frameworks";
import SubmitForm from "./submit-form";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const [genres, frameworks] = await Promise.all([listGenres(), listFrameworks()]);

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Submit a report</h1>
        <p className="page-desc">
          Contribute a first-person account to the museum. Reports are the raw layer:
          immutable once submitted, available to interpreters and renderers. A useful report
          traces something: what you were attempting, what resisted, and what changed.
        </p>
      </div>
      <Suspense>
        <SubmitForm genres={genres} frameworks={frameworks} />
      </Suspense>
    </main>
  );
}
