// components/Layout.tsx
import Nav from './Nav';
import ProtectedNav from './ProtectedNav';
import { gql, useQuery } from '@apollo/client';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;
  const { data } = useQuery(IS_LOGGED_IN);
  const IsLoggedIn = () => (data.isLoggedIn ? <ProtectedNav /> : <Nav />);
  // const [session, loading] = useSession();

  // if (loading) return <div>....loading</div>;

  // const NavComponent = session ? Nav : Nav;
  return (
    <>
      <IsLoggedIn />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">{children}</div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2021
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
      <style jsx>{`
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
