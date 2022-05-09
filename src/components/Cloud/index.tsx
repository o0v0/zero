import React, { useState, useEffect } from 'react'
import { Thunder, Rain, Snow, Sun, Sunshine, Windy } from '@components/Icons'
import { queryCloud } from '@utils/service'

type CloudProps = {}

const renderCloudIcon = (code: string): React.ReactElement => {
  const codeVal = ~~code
  if (codeVal <= 3) {
    // 晴
    return <Sunshine />
  } else if (codeVal <= 9) {
    // 多云
    return <Sun />
  } else if (codeVal <= 12) {
    // 阵雨
    return <Thunder />
  } else if (codeVal <= 20) {
    // 大雨
    return <Rain />
  } else if (codeVal <= 25) {
    // 雪
    return <Snow />
  } else {
    // 大风
    return <Windy />
  }
}

const Cloud: React.FC<CloudProps> = () => {
  const [weather, setWeather] = useState('晴')
  const [temperature, setTemperature] = useState('26')
  const [code, setCode] = useState('0')

  useEffect(() => {
    queryCloud().then((data) => {
      const cloud = data.now
      setWeather(cloud.text)
      setTemperature(cloud.temperature)
      setCode(cloud.code)
    })
  }, [])

  return (
    <div className="fixed top-3 right-2 flex items-center z-10">
      {renderCloudIcon(code)}
      <div className="flex flex-col justify-center px-1.5 transform">
        <span className="text-base leading-4">{temperature}℃</span>
        <span className="text-xs">{weather}</span>
      </div>
    </div>
  )
}

export default Cloud
