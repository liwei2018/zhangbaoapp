//index.js
//获取应用实例
const $request = require('../../utils/request')

Component({
  properties: {
    user: {
      type: Object,
      value: {},
      
    },
    isReg: {
      type: String,
      value: '',
      
    },
  },
  data: {
    
  },
  attached: function () {
 
  },
  moved: function () {
  },
  detached: function () {
  },
  onShareAppMessage() {
    return {
      title: '宝账管家',
      path: '/page/bill/index'
    }
  },
  methods: {
    checkPosition: function (val) {
      return this.data.positions.indexOf(val) >= 0;
    },
    touchstart: function () {
      if (this.data.closeOnClickModal) {
        this.close();
      }
    },
    closedialog: function () {
      if (this.dataset.model) {
        let currentPage = getCurrentPages().pop();
        let data = {};
        data[this.dataset.model] = false;
        currentPage.setData(data);
      }
    },
    close: function () {
      this.closedialog();
      this.triggerEvent('close');
    },
    confirm: function () {
      this.closedialog();
      this.triggerEvent('confirm');
    },
    
  }
})