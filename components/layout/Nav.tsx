// components/Layout.tsx
const Nav = () => {
  return (
    <>
      <div className="horizontal-menu">
        <nav className="navbar top-navbar col-lg-12 col-12 p-0">
          <div className="container">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="/">
                <img src="/img/logo.png" alt="logo" />
              </a>
              <a className="navbar-brand brand-logo-mini" href="/">
                <img src="/img/logo.png" alt="logo" />
              </a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <h2 className="sitename mr-auto">Electronic Data Capture</h2>
              <form className="form-inline mt-2 mt-md-0">
                <input
                  name="username"
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="email"
                  aria-label="email"
                />
                <input
                  name="password"
                  className="form-control mr-sm-2"
                  type="password"
                  placeholder="password"
                  aria-label="password"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Sign in
                </button>
                <button
                  className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                  type="submit"
                  data-toggle="horizontal-menu-toggle"
                >
                  <span className="mdi mdi-menu" />
                </button>
              </form>
            </div>
          </div>
        </nav>
        <nav className="bottom-navbar">
          <div className="container d-flex flex-column flex-md-row align-items-center pt-2 pb-2">
            <nav className="my-2 my-md-0 mr-md-3 ml-auto">
              <a href="#features" className="p-2 text-dark">
                Features
              </a>
              <a href="#enterprise" className="p-2 text-dark">
                Enterprise
              </a>
              <a href="#support" className="p-2 text-dark">
                Support
              </a>
              <a href="#pricing" className="p-2 text-dark">
                Pricing
              </a>
            </nav>
            <a href="/register" className="btn btn-outline-primary">
              Sign up
            </a>
          </div>
        </nav>
      </div>
      <style jsx lang="scss">{`
        h2 {
          &.sitename {
            font-weight: 700;
            padding-top: 10px;
            margin-left: 15px;
            color: #7571f9;
            font-variant: all-small-caps;
          }
        }
      `}</style>
    </>
  );
};

export default Nav;
