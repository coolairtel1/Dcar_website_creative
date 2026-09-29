// Re-mounts on every navigation: Forge-style page fade-in.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
