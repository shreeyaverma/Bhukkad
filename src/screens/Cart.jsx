import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The cart is empty</div>
      </div>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/order-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope=" row"> {index + 1}</th>
                <td style={{ color: "white" }}>{food.name}</td>
                <td style={{ color: "white" }}>{food.qty}</td>
                <td style={{ color: "white" }}>{food.size}</td>
                <td style={{ color: "white" }}>{food.price}</td>
                <td style={{ color: "white" }}>
                  <button
                    type="button"
                    className="btn p-0"
                    class="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch({ type: " REMOVE", index: index });
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2"> Total Price : {totalPrice} </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            Check out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
