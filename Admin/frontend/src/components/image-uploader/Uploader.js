import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import cloudinary from "cloudinary/lib/cloudinary";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

//internal import
import useAsync from "hooks/useAsync";
import SettingServices from "services/SettingServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

const Uploader = ({ setImageUrl, imageUrl, product, folder }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  // console.log("data", data);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: "image/*",
    multiple: product ? true : false,
    maxSize: 500000,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === "too-many-files"
                  ? notifyError(
                      `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
                    )
                  : notifyError(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ));
    }

    if (files) {
      files.forEach((file) => {
        if (
          product &&
          imageUrl?.length + files?.length >
            globalSetting?.number_of_image_per_product
        ) {
          return notifyError(
            `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
          );
        }

        setLoading(true);
        setError("Uploading....");

        if (product) {
          const result = imageUrl?.find(
            (img) => img === `${process.env.REACT_APP_CLOUDINARY_URL}`
          );

          if (result) return setLoading(false);
        }

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: process.env.REACT_APP_CLOUDINARY_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            notifySuccess("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              setImageUrl((imgUrl) => [...imgUrl, res.data.secure_url]);
            } else {
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("err", err);
            notifyError(err.Message);
            setLoading(false);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className="inline-flex border-2 border-gray-100 w-24 max-h-24"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = async (img) => {
    try {
      // const url = img.substring(img.length - 25);
      const url = img.split("/").pop().split(".")[0];
      const public_id = `${folder}/${url}`;

      const res = await cloudinary.v2.uploader.destroy(public_id);

      setLoading(false);
      notifyError(
        res.result === "ok" ? "Image delete successfully!" : res.result
      );
      if (product) {
        const result = imageUrl?.filter((i) => i !== img);
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.error("err", err);
      notifyError(err.Message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-green-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>

      <div className="text-green-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            {" "}
            <img
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;
