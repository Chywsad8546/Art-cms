import moment from "moment"
moment.locale("zh-cn")
export default {
  filters: {
    format2mm(date) {
      if (date) {
        return moment(date).format("YYYY-MM-DD HH:mm")
      } else {
        return ""
      }
    },
    roleKey2str(data){
      if (data) {
        switch (data) {
          case 506:
            return '普通版'
            break;
          case 508:
            return '出租版'
          case 502:
            return '免费版'
          default:
            return '免费版'
            break;
        }
      }else{
        return '免费版'
      }
    }
  }
}