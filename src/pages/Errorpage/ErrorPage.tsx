import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const ErrorPage: FC = () => {
  const error: any = useRouteError();
  console.error(error);
  return (
    <div>
      <Header />
      <div className="main-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/">Home</Link>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
