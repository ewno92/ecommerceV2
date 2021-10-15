import Toast from "../components/Toast";
import { isAuth } from "../utils/fetchData";
export default function Home() {
  const errMsg = "error";
  return (
    <div>
      hello
      <i className="bi bi-suit-club-fill"></i>
      <i className="fas fa-user"></i>
      <a>
        <i className="fas fa-user"></i>
      </a>
      hi
      <button onClick={isAuth}>bucc</button>
      {/* <Toast msg="hello" /> */}
      {/* <button onClick={console.log("hi", process.env.MONGO_URL)}>Auth</button> */}
    </div>
  );
}

export async function getServerSideProps() {
  console.log(process.env.JWT_SECRET);
  return {
    props: {
      hello: "world",
    },
  };
}
