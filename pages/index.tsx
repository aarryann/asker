// pages/index.tsx
import Link from 'next/link';

const Index = () => {
  return (
    <>
      Welcome to WHATABYTE!
      <Link href="/login">
        <a>Home</a>
      </Link>
    </>
  );
};

export default Index;
