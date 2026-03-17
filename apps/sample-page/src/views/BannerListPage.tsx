import { useState } from 'react';
import { Button, Card, Typography, Input, Icon } from '@starbanking/design-system';
import styles from '../App.module.css';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeAlpine } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs = [
  { field: 'name', headerName: '이름' },
  { field: 'age', headerName: '나이' },
];

const rowData = [
  { name: '홍길동', age: 30 },
  { name: '김철수', age: 25 },
];
export function BannerListPage() {
    return (
        <div className={styles.page}>
            <div className={styles.sendWrapper}>
                <div style={{ height: 400, width: '100%' }} className={"tbl-wrap"}>
                    <AgGridReact rowData={rowData} columnDefs={colDefs} theme={themeAlpine} domLayout="autoHeight" />
                </div>
            </div>
        </div>
    )
}