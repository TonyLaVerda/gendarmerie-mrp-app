export function Card({ children, ...props }) {
  return <div className="rounded-xl border shadow p-4 bg-white" {...props}>{children}</div>;
}

export function CardContent({ children, ...props }) {
  return <div className="mt-2 text-sm text-gray-700" {...props}>{children}</div>;
}
