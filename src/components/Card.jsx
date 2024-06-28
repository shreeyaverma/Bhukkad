import React from "react";

export default function Card() {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_1280,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg"
          className="card-img-top"
          alt="..."
          style={{ height: "200px", width: "285px" }}
        />
        <div className="card-body">
          <h5 className="card-title">Food Name</h5>
          <p className="card-text">This is food description</p>
          <div className="container">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
            <div className="d-inline fs-5 h-100">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
