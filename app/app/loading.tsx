export default function LoadingWorkspace() {
  return (
    <main className="workspace-main" id="content" aria-busy="true" aria-label="Loading workspace">
      <div className="skeleton-line short" />
      <div className="skeleton-line title" />
      <div className="skeleton-grid"><i /><i /><i /></div>
    </main>
  );
}
