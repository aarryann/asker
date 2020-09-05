// components/Layout.tsx

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="main-panel">
        <div className="content-wrapper d-flex align-items-center auth px-0">{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
