import NewFrameworkForm from "./new-framework-form";

export default function NewFrameworkPage() {
  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>New framework</h1>
        <p className="page-desc">
          Design a set of structured fields for capturing experience reports. Frameworks shape
          what can be captured and compared across reports.
        </p>
      </div>
      <NewFrameworkForm />
    </main>
  );
}
