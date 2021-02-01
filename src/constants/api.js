const target= 'http://192.168.1.5:10055';
const test = 'https://www.fastmock.site/mock/67fa6d4181628fd727a8a4c44d93dd5c/exam_system';
const APIS = {
    // 登录注册
    verificationCode: `${target}/users/createCode`,
    userRegister:`${target}/users/userRegister`,
    getUserList:`${target}/userAdmin/getUserList`,
    login:`${test}/users/userLogin`,

    // 知识点管理
    getPoints: `${test}/point/selectPoint`,
    getAllPoints: `${test}/point/selectAllPoint`,
    addPoint: `${test}/point/addPoint`,
    updatePoint: `${test}/point/updatePoint`,
    dropPoint: `${test}/point/dropPoint`,

    // 学科管理
    getSubjects: `${test}/subject/selectSubjectList`,
    getAllSubjects: `${test}/subject/selectAllSubject`,
    addSubject: `${test}/subject/addSubject`,
    updateSubject: `${test}/subject/updateSubject`,
    dropSubject: `${test}/subject/dropSubject`,
}
export default APIS;