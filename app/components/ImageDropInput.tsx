"use client";

import { useRef, useState } from "react";

export default function ImageDropInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? "Ningún archivo seleccionado");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file || !inputRef.current) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputRef.current.files = dataTransfer.files;
    setFileName(file.name);
  };

  return (
    <div className="grid gap-1">
      <label htmlFor="imagen" className="text-sm text-slate-300">
        Imagen del proyecto
      </label>
      <input
        ref={inputRef}
        id="imagen"
        name="imagen"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <div
        onClick={handleSelect}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={`rounded border border-dashed p-4 text-sm cursor-pointer transition-colors ${
          dragActive
            ? "border-blue-400 bg-slate-700 text-blue-200"
            : "border-slate-600 bg-slate-700 text-slate-300 hover:border-blue-500"
        }`}
      >
        Arrastra una imagen aquí o haz clic para seleccionarla
      </div>
      <p className="text-xs text-slate-400">{fileName}</p>
    </div>
  );
}
