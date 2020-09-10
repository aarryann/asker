import Ac from '../controls/ac';
import sortData from '../../data/dogs.js';

const NavSearch = ({ placeholder }: { placeholder: string }) => {
  return (
    <>
      <Ac id="navsearch" listSort={sortData} placeholder={placeholder} />
      <style jsx>{`
        @import './style/global/index';
        :global(#navsearch-tag-list) {
          border: 0;
        }
      `}</style>
    </>
  );
};

export default NavSearch;
