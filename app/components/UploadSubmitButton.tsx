"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

type UploadSubmitButtonProps = {
  idleLabel: string;
  pendingLabel?: string;
  className?: string;
  fileInputName?: string;
};

export default function UploadSubmitButton({
  idleLabel,
  pendingLabel = "Cargando...",
  className,
  fileInputName = "imagen",
}: UploadSubmitButtonProps) {
  const { pending } = useFormStatus();
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    if (!form) return;

    const fileInput = form.elements.namedItem(fileInputName) as HTMLInputElement | null;
    const hasFile = Boolean(fileInput?.files && fileInput.files.length > 0);
    setIsFileSelected(hasFile);
  };

  const label = pending
    ? isFileSelected
      ? pendingLabel
      : "Guardando..."
    : idleLabel;

  return (
    <button
      type="submit"
      aria-busy={pending}
      disabled={pending}
      onClick={handleClick}
      className={className}
    >
      {label}
    </button>
  );
}
