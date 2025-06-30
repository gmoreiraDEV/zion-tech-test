"use client";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/data-access-layer/upload.dal";
import { createClient } from "@/lib/supabase/client";
import { getUserProfile } from "@/data-access-layer/users.dal";
import Image from "next/image";
import { UploadIcon } from "./upload-icon";
const supabase = createClient();

export function UploadArea({
  onUploadComplete,
}: {
  onUploadComplete: (setter: (prev: string[]) => string[]) => void;
}) {
  const [isOver, setIsOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsOver(false);
      setIsUploading(true);

      const files = Array.from(e.dataTransfer.files);
      if (!files.length) return;

      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewFiles((prev) => [...prev, ...previews]);

      const dataUserId = await getUserProfile();

      try {
        const urls = await Promise.all(
          files.map((file) => uploadFile(file, dataUserId.id))
        );
        onUploadComplete((prev) => [...prev, ...urls]);
      } catch (err) {
        console.error("Erro ao fazer upload:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadComplete]
  );

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollX = container.clientWidth * index;
    container.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  return (
    <div className="flex items-center justify-start w-full gap-4">
      {previewFiles && previewFiles.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <div
            ref={containerRef}
            className="mt-4 max-w-[257px] h-[145px] overflow-x-auto whitespace-nowrap rounded-xl border border-white/20 p-1 flex gap-2 scroll-smooth"
          >
            {previewFiles.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`preview-${i}`}
                width={257}
                height={145}
                className="h-full rounded-xl object-cover aspect-video flex-shrink-0"
              />
            ))}
          </div>

          {previewFiles.length > 1 && (
            <div className="flex justify-center items-center gap-1 mt-2">
              {previewFiles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i === activeIndex ? "bg-brand-primary" : "bg-brand-gray/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div
        onDragEnter={() => setIsOver(true)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={handleDrop}
        className={cn(
          "w-[148.5px] h-[144px] border border-dashed rounded-3xl flex items-center justify-center text-brand-text/20 text-center",
          isOver ? "border-brand-primary" : "border-brand-gray/20"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadIcon />
          {isUploading
            ? "Enviando arquivos..."
            : isOver
            ? "Solte aqui!"
            : "Arraste arquivos para enviar"}
        </div>
      </div>
    </div>
  );
}
