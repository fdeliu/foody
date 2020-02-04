import React, { useState } from "react";
import axios from "axios";

import ProgressBar from "./ProgressBar";

const FileUpload = ({getUrl}) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChangeFile = e => {
    if(!e.target.files[0]){
      return;
    }
    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert("File is not an image! Please choose an image.");
      return;
    }
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if(file.length === 0){
       return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "your api endpoint here",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            setTimeout(() => {
              setUploadPercentage(0);
            }, 5000);
          }
        }
      );
      const { fileUrl } = res.data;
      getUrl(fileUrl)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem in server");
      } else {
        console.log(err.response);
      }
    }
  };

  return (
    <div>
      <h3 className="text-center mt-4">Upload Image</h3>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-2">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChangeFile}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <ProgressBar percentage={uploadPercentage} />
        <input
          type="submit"
          value="UPLOAD"
          className="mt-2 btn btn-success btn-block"
        />
      </form>
    </div>
  );
};

export default FileUpload;
