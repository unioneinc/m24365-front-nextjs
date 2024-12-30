// UserTable.js
import React from 'react'
import PropTypes from 'prop-types'
import useTable from './useTable'
import Switch from '@mui/material/Switch'
// import './UserTable.css' // Hover 효과 스타일을 포함한 CSS 파일

/**
 * UserTable 컴포넌트
 * @param {Array<string>} columns - 테이블 헤더로 사용할 열 이름 배열
 * @param {Array<Object>} tableData - 테이블에 표시할 데이터 배열
 * @param {Function} onRowClick - 행 클릭 시 호출할 이벤트 핸들러
 * @param {Object} renderers - 특정 열에 대한 커스텀 렌더러 객체
 * @returns {JSX.Element} 렌더링된 테이블
 */
function UserTable({ columns, tableData, onRowClick, renderers }) {
  const { renderTableHeader, renderTableRows } = useTable({
    columns,
    data: tableData,
    onRowClick,
    renderers
  })

  return (
    <table className="user-table">
      {renderTableHeader()}
      {renderTableRows()}
    </table>
  )
}

UserTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
  renderers: PropTypes.object
}

export default UserTable
