/*export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}*/
import Product from '../../models/Product'
import User from '../../models/User'
import data from '../../utils/data'
import db from '../../utils/db'

//비동기, 수행 작업이 없을 때 다른 적업을 할 수 있도록
const handler = async (req, res) => {
  await db.connect()
  await User.deleteMany() //유저 등록할 때 공간 비우기
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({
    message: 'seeded successfully... 초기사용자가 성곡적으로 등록되었습니다',
  })
}

export default handler
