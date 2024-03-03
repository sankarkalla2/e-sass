"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface UploadImageProps {
  value: string[] | [];
  onChange: (url: string) => void;
}
export const UploadImage = ({ value, onChange }: UploadImageProps) => {
  const [imgUrl, setImgUrl] = useState<string[] | []>([]);
  const [editing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (value.length >= 1) setImgUrl(value);
    console.log(imgUrl.length);
  }, [value]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Image</h3>
        <Button
          className=""
          size="sm"
          variant="outline"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {editing ? "cancel" : "Edit"}
        </Button>
      </div>
      {imgUrl && imgUrl.length >= 1 && !editing && (
        <div className="relative aspect-video">
          <Image
            src={imgUrl[0]}
            alt="img"
            fill
            className="object-cover rounded-lg bg-muted-foreground border-dotted border-2 border-red-400"
          />
        </div>
      )}
      {imgUrl.length >= 1 && editing && (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImgUrl(res.map((img) => img.url));
            toast.success("img uploaded successfully");
            onChange(res[0].url);
            setIsEditing(false);
          }}
          onUploadError={(error: Error) => {
            toast.error("Error occured while uploading image");
            console.log(error);
          }}
        />
      )}
      {imgUrl.length === 0 && (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
            setImgUrl(res.map((img) => img.url));
            toast.success("img uploaded successfully");
            onChange(res[res.length - 1].url);
          }}
          onUploadError={(error: Error) => {
            toast.error("Error occured while uploading image");
          }}
        />
      )}
    </div>
  );
};
