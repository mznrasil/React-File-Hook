import React, { useEffect, useRef, useState } from "react";

export const useFile = (mimetype?: string) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const handleFileRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    if (handleFileRef.current) {
      handleFileRef.current.click();
    }
  };

  const handleClearFile = () => {
    if (handleFileRef.current) {
      handleFileRef.current.value = "";
      setFileName("");
      setFileSize(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFileSize(e.target.files[0].size);
    }
  };

  const onDownload = async (
    file: ArrayBuffer | Blob | string,
    isBase64?: boolean
  ) => {
    if (!file) return;

    const blob = new Blob([file], {
      type: isBase64 ? "text/plain" : mimetype ? mimetype : "",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setFileUrl(fileUrl);
  }, [file]);

  return {
    file,
    fileUrl,
    fileName,
    fileSize,
    handleFileRef,
    handleChooseFile,
    handleClearFile,
    handleFileChange,
    onDownload,
    setFile,
  };
};
