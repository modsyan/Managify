/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

const API_URL = "https://httpbin.org/post";
const API_METHOD = "POST";
const STATUS_IDLE = 0;
const STATUS_UPLOADING = 1;

export const AddAttachment: React.FC = () => {
  const [files, setFiles] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS_IDLE);

  const uploadFiles = (data: any) => {
    setStatus(STATUS_UPLOADING);

    fetch(API_URL, {
      method: API_METHOD,
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
      .finally(() => setStatus(STATUS_IDLE));
  };

  function packFiles(files: any[]) {
    const data = new FormData();

    [...files].forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    return data;
  }

  const handleUploadClick = () => {
    if (files.length) {
      const data = packFiles(files);
      uploadFiles(data);
    }
  };

  const renderFileList = () => (
    <ol>
      {[...files].map((f, i) => (
        <li key={i}>
          {f.name} - {f.type}
        </li>
      ))}
    </ol>
  );

  const renderButtonStatus = () =>
    status === STATUS_IDLE ? (
      "Send to server"
    ) : (
      <img src="./load.svg" alt="loading" />
    );

  return (
    <div>
      <label htmlFor="file">Upload files</label>
      <input
        type="file"
        multiple
        id="file"
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      {renderFileList()}
      <button
        onClick={handleUploadClick}
        disabled={status === STATUS_UPLOADING}
      >
        {renderButtonStatus()}
      </button>
    </div>
  );
};
