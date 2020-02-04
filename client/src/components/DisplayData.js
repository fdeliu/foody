import React, { useState, useEffect } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "your clarifai api key here"
});

const DisplayData = ({ url }) => {
  const [data, setData] = useState([]);
    let table_index=1;
    useEffect(() => {
    app.models.predict(Clarifai.FOOD_MODEL, url)
    .then(
        response => {
            const { concepts } = response.outputs[0].data
            setData(concepts);
        },
        err => {
            if(err){
            alert("Something went wrong. Please check the URL.")
            setData([])
            }
        }
        );
    },[url]);

  return (
    <div className="row my-4">
      <div className="col-md-6">
        <img
          src={url}
          alt="uploaded-food"
          className="img-fluid"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      <div className="col-md-6">
        <table className="table text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Predicted</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id}>
                <th>{table_index++}</th>
                <td>{t.name}</td>
                <td>{Math.floor(t.value * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DisplayData;

