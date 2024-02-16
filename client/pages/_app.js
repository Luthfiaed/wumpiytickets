import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
import Link from "next/link";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={label} className="nav-item">
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <div>
      <Header currentUser={currentUser} links={links} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const axios = buildClient(appContext.ctx);
  const { data } = await axios.get("/api/users/currentuser");

  /* execute the getInitialProps() function in each page manually (that's how it is LOL) 
    also centralize axios client builder and pass down data about current user
  */
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      axios,
      data.currentUser
    );
  }

  return { pageProps, currentUser: data.currentUser };
};

export default AppComponent;
