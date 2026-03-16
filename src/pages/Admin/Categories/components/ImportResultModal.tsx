import Button from "../../../../components/ui/Button";
import type { ImportResultDto } from "../../../../types/product.types";

// ── Import result modal ───────────────────────────────────────────────────────
export default function ImportResultModal({
  result,
  onClose,
}: {
  result: ImportResultDto;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-dark2 border border-dark3 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="font-display text-xl text-ivory mb-4">Import Result</h2>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {(
            [
              {
                label: "Inserted",
                value: result.inserted,
                color: "text-green",
              },
              { label: "Updated", value: result.updated, color: "text-gold" },
              { label: "Skipped", value: result.skipped, color: "text-red" },
            ] as const
          ).map(({ label, value, color }) => (
            <div key={label} className="bg-dark3 rounded p-3 text-center">
              <p className={`font-ui font-bold text-2xl ${color}`}>{value}</p>
              <p className="font-ui text-text3 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
        {result.errors.length > 0 && (
          <div className="mb-4">
            <p className="font-ui text-xs text-red mb-2">
              Errors ({result.errors.length}):
            </p>
            <div className="bg-dark max-h-32 overflow-y-auto rounded border border-dark3 p-2 space-y-1">
              {result.errors.map((e, i) => (
                <p key={i} className="font-ui text-xs text-text3">
                  <span className="text-red">Row {e.row}:</span> {e.message}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
