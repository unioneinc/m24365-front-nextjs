// utils/MountWrapper.js
export class MountWrapper {
  constructor(mountedRef) {
    this.mountedRef = mountedRef
  }

  // 비동기 작업을 위하 method
  async execute(callback) {
    try {
      const result = await callback()
      if (this.mountedRef.current) {
        return result
      }
    } catch (error) {
      if (this.mountedRef.current) {
        console.error('Error in mounted execution:', error)
        throw error
      }
    }
  }

  // 동기 작업을 위한 메서드
  sync(callback) {
    if (this.mountedRef.current) {
      return callback()
    }
  }

  // 상태 업데이트를 위한 메서드
  setState(setState, newState) {
    if (this.mountedRef.current) {
      setState(newState)
    }
  }

  // 로깅을 위한 메서드
  // 아래 부분은 ts에서만 data? 사용가능
  // log(message, data?) {
  //     if (this.mountedRef.current) {
  //     console.log(message, data);
  //     }
  // }
  log(message, data = null) {
    if (this.mountedRef.current) {
      data ? console.log(message, data) : console.log(message)
    }
  }

  // 조건부 실행을 위한 메서드
  conditionalExecute(condition, callback) {
    if (this.mountedRef.current && condition) {
      return callback()
    }
  }
}

// 예시 컴포넌트

export const AssetComponent = () => {
  const mount = useMountWrapper()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  // 1. API 호출 시 사용
  useEffect(() => {
    const fetchData = async () => {
      await mount.execute(async () => {
        const response = await axios.get('/api/data')
        setData(response.data)
      })
    }

    fetchData()
  }, [])

  // 2. 상태 업데이트 시 사용
  const handleDataUpdate = () => {
    mount.setState(setLoading, true)
    // ... 작업 수행
    mount.setState(setLoading, false)
  }

  // 3. 로깅 시 사용
  useEffect(() => {
    mount.log('Component mounted', { data })
  }, [data])

  // 4. 조건부 실행 시 사용
  const handleClick = () => {
    mount.conditionalExecute(data !== null, () => {
      processData(data)
    })
  }

  // 5. 여러 작업 조합 시 사용
  const handleComplexOperation = async () => {
    // 동기 작업
    mount.sync(() => {
      console.log('Starting operation')
    })

    // 비동기 작업
    await mount.execute(async () => {
      const result = await fetchSomeData()
      return result
    })

    // 조건부 실행
    mount.conditionalExecute(someCondition, () => {
      // 추가 작업
    })
  }

  // 6. 에러 처리와 함께 사용
  const handleErrorCase = async () => {
    try {
      await mount.execute(async () => {
        throw new Error('Test error')
      })
    } catch (error) {
      mount.sync(() => {
        console.error('Error caught:', error)
      })
    }
  }

  // 7. 초기화 로직에서 사용
  useEffect(() => {
    const initialize = async () => {
      mount.sync(() => {
        // 초기 설정
        setLoading(true)
      })

      await mount.execute(async () => {
        // 비동기 초기화
        const config = await fetchConfig()
        return config
      })

      mount.setState(setLoading, false)
    }

    initialize()
  }, [])

  return <div>Asset Component</div>
}
