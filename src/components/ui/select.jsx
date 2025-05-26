export function Select({ children, className = '', ...props }) {
  return (
    <select
      className={`w-full px-3 py-2 border rounded outline-none focus:ring focus:border-blue-400 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
