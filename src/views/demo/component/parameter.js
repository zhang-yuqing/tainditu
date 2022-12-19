export function parameter(){
  let arr = {
    riverOption:[
      {value: '寿昌江',label: '寿昌江'},
      {value: '乌龙溪',label: '乌龙溪'},
      {value: '劳村溪',label: '劳村溪'},  
    ],
    seasonData:[
      {value:"第一季度",label:"第一季度"},
      {value:"第二季度",label:"第二季度"},
      {value:"第三季度",label:"第三季度"},
      {value:"第四季度",label:"第四季度"},
    ],
  }
  return arr;
}



/**
 * 防抖
 * @param {function} callback
 * @param {number} delay
 * @param {boolean} immediate
 * @returns {function}
 */
 function debounce(callback, delay = 500, immediate = true) {
  let timer = null

  return (...args) => {
    timer && clearTimeout(timer)

    if (immediate) {
      !timer && callback.apply(this, args)

      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        callback.apply(this, args)
        timer = null
      }, delay)
    }
  }
}


/**
 * 数字保留x位小数点
 * num 数字
 * decimal 保留几位 默认2位
 * myToFixed(1.005, 2) => 1.01
 */
 function description(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')

  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }

  return parseFloat(num).toFixed(decimal)
}

/**
 * 过滤对象值为 null
 * obj过滤的对象
 */
function filterObj(obj) {
  Object.keys(obj).forEach(item => {
    const key = obj[item]

    if (key === '' || key === null) {
      delete obj[item]
    }
  })

  return obj
}

/**
 *
 * @param {array} arr1
 * @param {array} arr2
 * @param {string} type
 * @returns
 */
function filterTwoObj(arr1, arr2, type) {
  let arr3 = arr1.filter(v => {
    return arr2.every(e => e[type] !== v[type])
  })

  return arr3
}

// 去重
function deWeight(arr) {
  //reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
  var obj = {}
  let arr1

  arr1 = arr.reduce(function (item, next) {
    obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
    return item
  }, [])

  return arr1
}

/**
 * 节流
 * @param {function} callback
 * @param {number} delay
 * @returns {function}
 */
function throttle(callback, delay = 2000) {
  let flag = false,
    timer = null

  return (...args) => {
    if (flag) return

    flag = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, args)
      flag = false
    }, delay)
  }
}

export { description, filterObj, filterTwoObj, deWeight, debounce, throttle }
