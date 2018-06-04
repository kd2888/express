import axios from 'axios'
// let url='api'
 let url='http://116.196.102.192:3000'

//登陆
const login=(name,pas)=>{
  return axios.post(`${url}/login`,{name:name,password:pas})
}
//注册
const register=(name,pas)=>{
  return axios.post(`${url}/register`,{name:name,password:pas})
}
//修改密码
const changePassword=(pas,newPas)=>{
  return axios.post(`${url}/changePassword`,{password:pas,newPas:newPas})
}
//提交消费
const subSpending=(data)=>{
  return axios.post(`${url}/subSpending`,data)
}
//获取消费
const getSpending=(date)=>{
  return axios.post(`${url}/getSpending`,{date:date})
}
//按月获取消费 yyyy-mm
const  getSumByDate=(month,nextmonth)=>{
  return axios.post(`${url}/getSumByDate`,{month:month,nextmonth:nextmonth})
}
export {
  register,
  login,
  changePassword,
  subSpending,
  getSpending,
getSumByDate
}
