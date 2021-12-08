// import { isAuth } from "../utils/fetchData";
import { getData } from "../utils/fetchData";
import { useState, useEffect } from "react";
import Head from "next/head";
import ProductItem from "../components/product/ProductItem";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Home(props) {
  const [products, setProducts] = useState(props.products);

  // console.log(products);
  // console.log(props.result);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className="home_page mb-5">
      <Head>
        <title>Home Page</title>
      </Head>

      <div className="products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <div data-aos="fade-up" key={product._id}>
              <ProductItem
                // key={product._id}
                product={product}
                // handleCheck={handleCheck}
              />
            </div>
          ))
        )}
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
