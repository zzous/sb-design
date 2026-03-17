import { useState } from 'react';
import { Button, Card, Typography, Input, Icon } from '@starbanking/design-system';
import styles from '../App.module.css';

export function ListPage() {
    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <Typography variant="h3">목록 페이지</Typography>
            </header>
            <div className={styles.sendWrapper}>
                <Card variant="raised" size="lg" style={{ maxWidth: 520 }}>
                    <Typography variant="body1">목록 페이지입니다.</Typography>
                </Card>
            </div>
        </div>
    )
}