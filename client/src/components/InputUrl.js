import React, { useState } from "react";

const InputUrl = ({getUrl}) => {
    const [fileUrl, setFileUrl] = useState('')

    const onSubmit = e => {
        e.preventDefault();
        if(fileUrl.length === 0){
          return;
        }
        getUrl(fileUrl);
        setFileUrl('');
    }

  return (
    <div>
      <h3 className="text-center mt-4">Input Url</h3>
      <form onSubmit={onSubmit}> 
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <strong>URL</strong>
            </div>
          </div>
          <input
            type="url"
            className="form-control"
            id="url"
            placeholder="Enter url here..."
            value={fileUrl}
            onChange={(e)=>setFileUrl(e.target.value)}
          />
        </div>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped"
            role="progressbar"
          ></div>
        </div>
        <input
          type="submit"
          value="SEND"
          className="mt-2 btn btn-success btn-block"
        />
      </form>
    </div>
  );
};

export default InputUrl;
