
import '../../legacy/admin.css';
export interface PaginationProps {
  itemCount?: number;
  cntPerPage?: number;
  currentPage?: number;
  onChangedPage?: (pageNo: number, eventFlag: boolean) => void;

}



export const Pagination = ({itemCount=0, cntPerPage=0, currentPage=0, onChangedPage }: PaginationProps) => {
    // 전체 페이지 수 계산
    const pageCount = parseInt('' + (itemCount - 1) / cntPerPage) + 1;
    const getCounterView = (): number[] => {
        let first = 1;
        let last = currentPage;
        let gap = 0;
        const viewCounter: number[] = [];
        
        // console.log('page cal > ', pageCount, currentPage);
        
        if (pageCount < 11) {
            first = 1;
            last = pageCount;
        } else {
            gap = (currentPage < 5) ? 5 - currentPage :
                (currentPage + 5 > pageCount) ? currentPage + 5 - pageCount : 0;
            first = (currentPage < 5) ? 1 : currentPage - 4 - gap;
            last = (currentPage + 5 > pageCount) ? pageCount : currentPage + 5 + gap;
        }
        
        // console.log(first, last);
        
        for (let i = first; i <= last; i++) {
            viewCounter.push(i);
        }
        
        return viewCounter;
    };
    const pageNumbers = getCounterView();
    const handleChangedPage = (pageNo: number, eventFlag: boolean) => {
        if (pageNo <= 0) return;
        if (pageNo > pageCount) return;
        if (eventFlag) {
            onChangedPage?.(pageNo, eventFlag);
        }
    };
   
  return (
     <ul className="pagination">
            <li className="page-item first"><button type="button" className="page-link" onClick={() => handleChangedPage(1, true)}><span className="offscreen">맨처음</span></button></li>
            <li className="page-item prev"><button type="button" className="page-link" onClick={() => handleChangedPage(currentPage - 1, true)}><span className="offscreen">이전</span></button></li>
            
            {pageNumbers.map((pageNum) => (
                <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                    <button type="button" className="page-link" onClick={() => handleChangedPage(pageNum, true)}>{pageNum}</button>
                </li>
            ))}
            
            <li className="page-item next"><button type="button" className="page-link" onClick={() => handleChangedPage(currentPage + 1, true)}><span className="offscreen">다음</span></button></li>
            <li className="page-item last"><button type="button" className="page-link" onClick={() => handleChangedPage(pageCount, true)}><span className="offscreen">맨끝</span></button></li>
        </ul>
  );
};


Pagination.displayName = 'Pagination';
