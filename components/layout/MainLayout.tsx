// components/Layout.tsx

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">{children}</div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2018
                <a href="https://www.llcaccelor.com/" target="_blank" className="text-muted">
                  Urbanui
                </a>
                . All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Hand-crafted &amp; made with
                <i className="mdi mdi-heart-outline text-primary" />
              </span>
            </div>
          </footer>
        </div>
      </div>
      <style jsx lang="scss">{`
        @import './style/global/index';
        .content-wrapper {
          background-color: $background;
        }
        @media (min-width: 992px) {
          .main-panel {
            margin-left: 180px !important;
            width: calc(100% - 180px);
            min-height: calc(100vh - 56px);
          }
        }
        .page-body-wrapper {
          padding-top: 56px;
        }
      `}</style>
    </>
  );
};

export default MainLayout;
