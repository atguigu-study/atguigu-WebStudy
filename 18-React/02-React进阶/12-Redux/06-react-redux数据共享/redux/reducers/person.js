import { ADD_PERSON } from '../constant'

const initState = []
export default function personReducer(preState = initState, action) {

  const { type, data } = action

  switch (type) {
    case ADD_PERSON:
      return [data, ...preState] // 没有对preState进行push或unshift操作，因为redux默认若返回值和之前状态一致，则不更新页面
    default:
      return preState
  }
}
