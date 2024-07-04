import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/food-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-2">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName)
                    .map((filteredItems) => {
                      return (
                        <div
                          key={filteredItems._id}
                          className="col-12 col-md-6 col-lg-3 col-sm-3"
                        >
                          <Card
                            itemName={filteredItems.name}
                            options={filteredItems.options[0]}
                            imgSrc={filteredItems.img}
                            description={filteredItems.description}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""''</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
