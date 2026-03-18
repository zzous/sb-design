import { useState } from 'react';
import { DateRangePicker } from '@starbanking/design-system';
import styles from '../App.module.css';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeAlpine } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs = [
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

    return (
        
        <div className={styles.page}>
            <div className={styles.sendWrapper}>
                <div className="ui-data-filter">
                <DateRangePicker label="기간검색" onDateChange={handleDateChange} />
                </div>
                <div style={{ height: 400, width: '100%' }} className={"tbl-wrap"}>
                    <AgGridReact rowData={rowData} columnDefs={colDefs} theme={themeAlpine} domLayout="autoHeight" />
                </div>
            </div>
        </div>
    )
}