import Button from "./Button";
interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  title: string;
  message: string;
}
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
  title,
  message,
}: Props) {
  if (!open) return null;
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="bg-dark2 border border-dark3 rounded p-6
        w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg text-ivory mb-2">{title}</h3>
        <p className="font-ui text-text2 text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
