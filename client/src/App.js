import React, { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import InputUrl from "./components/InputUrl";
import DisplayData from "./components/DisplayData";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const [url, setUrl] = useState('')

  const getUrl = (url) =>{
    setUrl(url)
  }
  return (
    <div className="row">
      <div className="col-sm-8 mx-auto">
       <Header />
        <div className="row">
          <div className="col-md-5">
            <FileUpload getUrl={getUrl}/>
          </div>
          <div className="col-md-2">
            <div className="line">
              <div className="vl"></div>
              <strong>OR</strong>
              <div className="vl"></div>
            </div>
          </div>
          <div className="col-md-5">
            <InputUrl getUrl={getUrl}/>
          </div>
        </div>
        <hr/>
      {url && <DisplayData url={url}/> }
      <Footer />
     </div>
    </div>
  );
}

export default App;
