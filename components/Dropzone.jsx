import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ButtonSecondary from "./ButtonSecondary";
import Image from "next/image";

import noImage from "@/assets/no-image.svg";

export default function Dropzone({
  handleImage,
  children = <>Upload e-KTP</>,
}) {
  const [image, setImage] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    handleImage(acceptedFiles[0]);
    setImage(
      acceptedFiles.map((upFile) =>
        Object.assign(upFile, { preview: URL.createObjectURL(upFile) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    // noClick: true,
    onDrop,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex flex-col gap-4 justify-center items-center w-[433px]">
        <div className="flex flex-col gap-4 w-full h-[220px] justify-center items-center bg-[rgba(141,189,255,0.24)] border border-dashed border-secondary rounded-xl overflow-hidden">
          {image.length === 0 ? (
            <>
              <Image
                src={noImage}
                width={56.22}
                height={55.11}
                alt="no-image"
              />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Ketuk untuk menambahkan gambar</p>
              )}
            </>
          ) : (
            <>
              {image.map((upFile, i) => (
                <Image
                  src={upFile.preview}
                  width={433}
                  height={220}
                  alt="preview"
                  onLoad={() => {
                    URL.revokeObjectURL(upFile.preview);
                  }}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
        <ButtonSecondary type="button" className="max-w-max">
          {children}
        </ButtonSecondary>
      </div>
    </div>
  );
}
