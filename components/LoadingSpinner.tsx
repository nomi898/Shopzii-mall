export default function LoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
      style={{
        width: size,
        height: size,
      }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
