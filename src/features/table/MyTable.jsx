'use client'

import React from 'react'
import styles from './table.module.scss'

export const MyTable = ({ columns, data, onRowClick, selectedRow, className = '', height }) => {
  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      {columns.map((column) => (
        <div
          key={`header-${column.id}`}
          className={`${styles.headCell} ${styles[column.id]}`}
          style={{
            width: column.width,
            textAlign: column.align || 'left'
          }}
        >
          {column.label}
        </div>
      ))}
    </div>
  )

  const renderTableRow = (row) => (
    <div
      key={JSON.stringify(row)}
      className={`${styles.row} ${selectedRow === row ? styles.selected : ''}`}
      onClick={() => onRowClick?.(row)}
    >
      {columns.map((column) => (
        <div
          key={`cell-${column.id}`}
          className={`${styles.cell} ${styles[column.id]}`}
          style={{
            width: column.width,
            textAlign: column.align || 'left'
          }}
        >
          {row[column.id]?.toString() || ''}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`${styles.table} ${className}`} style={{ height }}>
      {renderTableHeader()}
      <div className={styles.tableBody}>{data.map((row) => renderTableRow(row))}</div>
    </div>
  )
}
