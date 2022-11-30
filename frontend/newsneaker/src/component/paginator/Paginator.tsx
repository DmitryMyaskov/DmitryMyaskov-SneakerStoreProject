import React from 'react';
import './paginate.scss';

type PaginateProps={
  allPage: number;
  paginate: (event:number)=>void;
  currentPage: number;
}

export const Paginator:React.FC<PaginateProps> = ({ allPage, paginate,currentPage}) => {
  const pageNumbers:number[] = [];

  for (let i = 1; i <= allPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id='react-paginate'>
     <nav>
       <ul className='paginatio'>
         {pageNumbers.map(number => (
           <li key={number} className='page-ite'>
             <button onClick={() => paginate(number)} style={number===currentPage+1?{background: "#e0e0e0", color : "#031a2a"} : {}} className='page-lin'>
               {number}
             </button>
           </li>
         ))}
       </ul>
     </nav>
    </div>
  );
};
export default Paginator;