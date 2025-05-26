import { useState } from 'react';

export function Dialog({ children }) {
  return children;
}

export function DialogTrigger({ asChild, children }) {
  return children;
}

export function DialogContent({ children }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        {children}
        <div className="text-right mt-4">
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-blue-600 hover:underline"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
