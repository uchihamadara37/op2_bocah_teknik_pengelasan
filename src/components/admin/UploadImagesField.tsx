'use client';

interface UploadImagesFieldProps {
  onChange: (files: File[]) => void;
}

export default function UploadImagesField({ onChange }: UploadImagesFieldProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Upload Images</p>
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          onChange(files);
        }}
      />
    </div>
  );
}
