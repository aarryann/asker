const SidebarLeft = () => {
  return (
    <>
      <nav className="sidebar sidebar-offcanvas ps" id="sidebar">
        <ul className="nav">
          <li className="nav-item {item['route'] === selected ? 'active' : ''}">
            <a className="nav-link" href="">
              <i className="mdi menu-icon" />
              <span className="menu-title"></span>
            </a>
          </li>
        </ul>
        <div className="ps__rail-x">
          <div className="ps__thumb-x" />
        </div>
        <div className="ps__rail-y">
          <div className="ps__thumb-y" />
        </div>
      </nav>
      <style jsx lang="scss">{`
        @import '../../style/global/index';
        .sidebar {
          width: 180px !important;
          padding: 0;
          border-right: 0;
          background: transparent;
          .nav {
            > .nav-item {
              padding: 4px 10px !important;
              &.active {
                .nav-link .menu-title,
                .nav-link .menu-icon {
                  color: $primary;
                }
              }
              &::before {
                left: 0px !important;
                border-top: 0;
              }
              .nav-link {
                .menu-title {
                  color: $on-background;
                  font-weight: 400;
                  font-size: 0.8125rem;
                  &:hover {
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
};

export default SidebarLeft;
