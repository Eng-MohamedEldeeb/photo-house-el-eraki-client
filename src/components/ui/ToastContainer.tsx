import type { ToastType } from "../../hooks/useToast";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const colors: Record<ToastType, string> = {
  success: "bg-green/10 border-green/40 text-green",
  error: "bg-red/10   border-red/40   text-red",
  info: "bg-yellow-400/10  border-yellow-400/40  text-yellow-400",
};

export default function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2
      pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded border font-ui text-sm
            backdrop-blur animate-fade-in max-w-xs ${colors[t.type]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
