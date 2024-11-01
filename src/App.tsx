import { useEffect, useState } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { database } from './firebase'

type DataType = {
  autoMode: boolean
  lightState: boolean
  fanState: boolean
  humidity: number
  temperature: number
  lightLevel: number
}

function App() {
  const [data, setData] = useState<DataType | null>(null)

  useEffect(() => {
    ;(async () => {
      const dbRef = ref(database)
      onValue(dbRef, (snapshot) => {
        setData(snapshot.val())
      })
    })()
  }, [])

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, mode: 'auto' | 'light' | 'fan') => {
    const { checked } = e.target
    switch (mode) {
      case 'auto':
        setData((prev) => (prev ? { ...prev, autoMode: checked } : null))
        set(ref(database), {
          ...data,
          autoMode: checked,
        })
        break
      case 'light':
        setData((prev) => (prev ? { ...prev, lightState: checked } : null))
        set(ref(database), {
          ...data,
          lightState: checked,
        })
        break
      case 'fan':
        setData((prev) => (prev ? { ...prev, fanState: checked } : null))
        set(ref(database), {
          ...data,
          fanState: checked,
        })
        break
      default:
        break
    }
  }

  // if data is null, show a loading spinner
  if (!data)
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute' />
      </div>
    )

  return (
    <div>
      <div className='bg-blue-500 p-4 relative'>
        <div className='flex flex-wrap justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            <img src='logo-hvktmm.png' alt='avatar' className='rounded-full w-40 h-40' />
            <div className='flex flex-col items-center'>
              <h1 className='text-2xl font-semibold uppercase text-white'>Học viện kĩ thuật mật mã</h1>
              <h2 className='text-xl font-semibold uppercase text-white'>Khoa Điện tử - Viễn thông</h2>
            </div>
          </div>
          <div>
            <h1 className='text-4xl font-semibold text-yellow-400 uppercase text-center' >Đồ án tốt nghiệp</h1>
            <h2 className='text-2xl font-semibold text-white my-4 text-center' style={{ fontFamily: 'Arial, sans-serif' }}>Đề tài: Nghiên cứu xây dựng mô hình nhà thông minh ứng dụng công nghệ IoT</h2>
            <h2 className='text-2xl font-bold text-white my-4 text-center'>GVHD: TS. Nguyễn Thế Truyện</h2>
          </div>
        </div>
        <div>
          <p className='text-xl font-medium text-white text-left'>Họ và tên: Trần Thị Loan </p>
          <p className='text-xl font-medium text-white text-left'>MSV: DT040231 </p>
        </div>
      </div>
      <div className='p-4 flex gap-4 flex-wrap items-center justify-center'>
        <div className='w-80 bg-white shadow-xl rounded-2xl p-8'>
          <h1 className='text-2xl font-semibold text-center text-orange-600'>Bảng điều khiển</h1>
          <div className='flex flex-col gap-6 mt-8'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                onChange={(e) => handleToggle(e, 'auto')}
                checked={data?.autoMode}
                className='sr-only peer'
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-xl font-medium'>Chế độ tự động</span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                onChange={(e) => handleToggle(e, 'light')}
                checked={data?.lightState}
                disabled={data?.autoMode}
                className='sr-only peer'
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-xl font-medium'>Đèn</span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                onChange={(e) => handleToggle(e, 'fan')}
                checked={data?.fanState}
                disabled={data?.autoMode}
                className='sr-only peer'
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-xl font-medium'>Quạt</span>
            </label>
          </div>
        </div>
        <div className='w-80 bg-white shadow-xl rounded-2xl p-8'>
          <h1 className='text-2xl font-semibold text-center text-orange-600'>Thông số</h1>
          <div className='flex flex-col gap-6 mt-8'>
            <p className='text-xl font-medium'>Nhiệt độ: {data?.temperature}°C</p>
            <p className='text-xl font-medium'>Độ ẩm: {data?.humidity}%</p>
            <p className='text-xl font-medium'>Ánh sáng: {data?.lightLevel == 0 ? 'Sáng' : 'Tối'} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
