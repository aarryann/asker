// components/Layout.tsx
import NavSearch from './NavSearch';

const ProtectedNav = () => {
  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center">
          <a className="navbar-brand brand-logo" href="index.html">
            <img src="/img/logo.png" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src="/img/logo.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-header-link d-flex align-items-center">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu" />
          </button>
        </div>
        <div className="navbar-search-cat d-flex">
          <select>
            <option>Website</option>
          </select>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="search">
                    <i className="mdi mdi-magnify" />
                  </span>
                </div>
                <NavSearch placeholder="Search in {selected}..." />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                id="messageDropdown"
                data-toggle="dropdown"
              >
                <i className="mdi mdi-email-outline mx-0" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-primary">
                      <i className="mdi mdi-account-outline mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">David Grey</h6>
                    <p className="font-weight-light small-text text-muted mb-0">The meeting is cancelled</p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-primary">
                      <i className="mdi mdi-account-outline mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">Tim Cook</h6>
                    <p className="font-weight-light small-text text-muted mb-0">New product launch</p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-primary">
                      <i className="mdi mdi-account-outline mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">Johnson</h6>
                    <p className="font-weight-light small-text text-muted mb-0">Upcoming board meeting</p>
                  </div>
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
                id="notificationDropdown"
                data-toggle="dropdown"
              >
                <i className="mdi mdi-bell-outline mx-0" />
                <span className="count" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-information mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">Just now</p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="mdi mdi-settings mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Settings</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">Private message</p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="mdi mdi-account-box mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">New user registration</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">2 days ago</p>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link count-indicator" data-toggle="dropdown" id="profileDropdown">
                <i className="mdi mdi-account-circle mx-0" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a className="dropdown-item">
                  <i className="mdi mdi-settings" />
                  Settings
                </a>
                <a className="dropdown-item">
                  <i className="mdi mdi-settings" />
                  Personalize
                </a>
                <a className="dropdown-item">
                  <i className="mdi mdi-logout" />
                  <a href="/logout">Logout</a>
                </a>
              </div>
            </li>
            <li className="nav-item nav-settings d-none d-lg-flex">
              <a className="nav-link">
                <i className="mdi mdi-dots-horizontal" />
              </a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
      <style jsx lang="scss">{`
        .navbar {
          border-bottom: 1px solid #eaeaea;
          .navbar-brand-wrapper {
            width: 180px;
            height: 56px;
            background: #f7f9fa;
            border-right: 1px solid #eaeaea;
          }
          .navbar-menu-wrapper {
            height: 56px;
            width: calc(100% - 360px);
            padding-left: 0;
            box-shadow: none;
            .navbar-nav .nav-item.nav-search {
              margin-left: 0;
              .input-group {
                padding-left: 5px;
                border: 0;
                background: transparent;
              }
            }
          }
          .navbar-header-link {
            padding: 6px;
            border-right: 1px solid #eaeaea;
            background: #f7f9fa;
            cursor: pointer;
            width: 60px;
            height: 56px;
            &:hover {
              background: #ffffff;
            }
          }
          .navbar-search-cat {
            width: 120px;
            border-right: 1px solid #eaeaea;
            text-align: right;
            height: 56px;
            background: #f7f9fa;
            select {
              margin-left: auto;
              margin-right: 1px;
              background: transparent;
              border: none;
              text-align-last: right;
              color: #6a6c6f;
              font-size: 0.8125rem;
              color: #6a6c6f;
              text-transform: uppercase;
              font-weight: 700;
              font-size: 0.8125rem;
              width: 100%;
              option {
                direction: rtl;
                text-transform: capitalize;
              }
            }
          }
        }
      `}</style>
    </>
  );
};

export default ProtectedNav;
