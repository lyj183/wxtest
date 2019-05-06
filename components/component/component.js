// components/component/component.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "点击这个按钮将触发“myevent”事件"

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      const myEventDetail = this.data // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }

  }
})
