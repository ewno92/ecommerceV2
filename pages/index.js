// import { isAuth } from "../utils/fetchData";
import { getData } from "../utils/fetchData";
import { useState } from "react";
import Head from "next/head";
import ProductItem from "../components/product/ProductItem";

export default function Home(props) {
  const [products, setProducts] = useState(props.products);

  // console.log(products);
  // console.log(props.result);

  return (
    <div className="container">
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-wrap">
            {products.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getData("product");
  // server side rendering
  // console.log(res);
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
