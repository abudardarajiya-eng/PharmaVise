import { useDropzone } from "react-dropzone";

export default function FileUpload({ setFile }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/vcf": [".vcf"] },
    maxSize: 5 * 1024 * 1024,
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    }
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-400 p-8 text-center rounded-lg cursor-pointer hover:bg-blue-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag & drop VCF file here, or click to select (Max 5MB)
      </p>
    </div>
  );
}