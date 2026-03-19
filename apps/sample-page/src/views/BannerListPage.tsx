import { useState } from 'react';
import { DateRangePicker, Pagination, SearchItem, BaseButton } from '@starbanking/design-system';
import styles from '../App.module.css';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeAlpine, ColDef } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs: ColDef[] = [
    { headerName: '번호', valueGetter: 'node.rowIndex + 1',  maxWidth: 80 },
  { field: 'eventname', headerName: '이벤트 명', flex:1},
  { field: 'type', headerName: '이벤트 유형', maxWidth: 200 },
  { field: 'target', headerName: '이벤트 대상', flex:1 },
  { field: 'period', headerName: '이벤트 기간', flex:1 },
  { field: 'announcementDate', headerName: '당첨자 발표일', flex:1},
  { field: 'published', headerName: '게시 여부', maxWidth: 100},
  
];
const rowData = [
  { eventname: '룰렛 참여 이벤트', type: '룰렛', target: '전체회원', period: '2026-01-30 ~2026-12-30', announcementDate: '2027-01-01', published: 'Y' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '룰렛 참여 이벤트', type: '룰렛', target: '전체회원', period: '2026-01-30 ~2026-12-30', announcementDate: '2027-01-01', published: 'Y' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
  { eventname: '일반 참여 이벤트', type: '일반', target: '일반회원', period: '2026-01-30 ~2026-05-30', announcementDate: '2026-05-02', published: 'N' },
];
export function BannerListPage() {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
    console.log('날짜 변경:', { startDate, endDate });
  };

  const handleDateChangeSingle = (date: Date | null) => {
    console.log('날짜 변경:', date);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNo: number, eventFlag: boolean) => {
    setCurrentPage(pageNo);
    console.log('페이지 변경:', pageNo, eventFlag);
  }
  const serarchData = [
   { value: 'roulette', label: '룰렛' }, { value: 'normal', label: '일반' }
  ];
  const [searchValue, setSearchValue] = useState('normal');
  const handleSearchChange = (value: string) => {
   
    setSearchValue(value);
    console.log('검색어:', value);
  };
  const btnEvent = (value: string) => {
    console.log('버튼클릭:', value);
  }
    return (
        
        <div className={styles.page}>
          
            <div className={styles.sendWrapper}>
                <div className="ui-data-filter">
                    
                    <div className={'form-item'}>
                      <DateRangePicker label="기간검색" onDateChange={handleDateChange} />
                      <SearchItem label="이벤트 명" type='input' changeValue={handleSearchChange} value={searchValue}/>
                      <SearchItem label="이벤트 유형" type='select' selectData={serarchData} changeValue={handleSearchChange} value={searchValue} />
                      
                      
                    </div>
                    <div className={'form-item'}>
                      <SearchItem label="이벤트 타입" type='radio' selectData={serarchData} changeValue={handleSearchChange} value={searchValue} />
                      <SearchItem label="이벤트 유형" type='checkbox' selectData={serarchData} changeValue={handleSearchChange} value={searchValue} />
                      
                    </div>
                    <div className={'btn-filter-set'}>
                      <BaseButton label="조회" type='icon' iconClass='ico-search' changeValue={btnEvent} />
                      <BaseButton label="조회" offscreen={true} type='icon' iconClass='ico-reload' iconSize='sg' changeValue={btnEvent} />
                      <BaseButton label="상세검색 열기" />
                      
                    </div>
                </div>
                <div style={{  width: '100%' }} className={"tbl-wrap"} >
                    <AgGridReact rowData={rowData} columnDefs={colDefs} theme={themeAlpine} domLayout="autoHeight" />
                </div>
                <div>
                  <Pagination itemCount={100} cntPerPage={10} currentPage={currentPage} onChangedPage={handlePageChange} />
                </div>
            </div>
        </div>
    )
}