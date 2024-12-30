import { useCallback } from 'react'

/**
 * useTable 훅
 * @param {Array<string>} columns - 테이블 헤더로 사용할 열 이름 배열
 * @param {Array<Object>} data - 테이블에 표시할 데이터 배열
 * @param {Function} onRowClick - 행 클릭 시 호출할 이벤트 핸들러
 * @param {Object} renderers - 특정 열에 대한 커스텀 렌더러 객체
 * @returns {Object} 테이블 렌더링 함수들
 */
function useTable({ columns, data, onRowClick, renderers = {} }) {
  /**
   * 테이블 헤더 렌더링 함수
   * @returns {JSX.Element} 테이블 헤더 JSX
   */
  const renderTableHeader = useCallback(() => {
    return (
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
    )
  }, [columns])

  /**
   * 테이블 행 렌더링 함수
   * @returns {JSX.Element} 테이블 본문 JSX
   */
  const renderTableRows = useCallback(() => {
    return (
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)} className="table-row">
            {columns.map((col, colIndex) => {
              if (renderers[col]) {
                return <td key={colIndex}>{renderers[col](row[col], row)}</td>
              }
              return <td key={colIndex}>{row[col]}</td>
            })}
          </tr>
        ))}
      </tbody>
    )
  }, [columns, data, onRowClick, renderers])

  return {
    renderTableHeader,
    renderTableRows
  }
}

export default useTable
