import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  src: string;
  open: boolean;
  onClose: () => void;
  title?: string;
};

const VideoModal = ({ src, open, onClose, title }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Video"}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
          type="button"
        >
          <X className="h-6 w-6" />
        </button>

        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="max-h-[85vh] w-full rounded-lg bg-black"
        />
      </div>
    </div>
  );
};

export default VideoModal;
