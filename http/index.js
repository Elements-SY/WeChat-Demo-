import { huaWeiOcr, request } from './request'
import { ocr_api, api } from './common'

// 身份证识别
export function ocrIDCard (pramas) {
  return huaWeiOcr(ocr_api.id_card, pramas, 'POST')
}

// 驾驶证识别
export function ocrDriverCard (pramas) {
  return huaWeiOcr(ocr_api.driver_license, pramas, 'POST')
}

// 行驶证识别
export function ocrVehicleCard (pramas) {
  return huaWeiOcr(ocr_api.vehicle_license, pramas, 'POST')
}

// 主题首页
export function topics (pramas) {
  return request(api.topics, pramas, 'GET')
}
