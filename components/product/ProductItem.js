import React from "react";

const ProductItem = (product) => {
  product = product.product;
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img src={product.images[0].url} className="card-img-top" alt="" />
      <div className="card-body">
        <h1>{product.title}</h1>
        <h3></h3>

        <p className="card-text">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductItem;
