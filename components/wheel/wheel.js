// components/c_bs_ui/common/wheel/wheel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '980rpx'
    },
    items: {
      type: Array,
      value: [],
      observer() {
        this.update()
      }
    }
  },

  timer: null,

  /**
   * 组件的初始数据
   */
  data: {
    itemIndex: 0,
    itemNextIndex: 1,
    current: 0
  },

  attached() {
    this.countdown()
  },

  detached() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      if (this.properties.items && this.properties.items.length > 0) {
        this.setData({
          img0: this.properties.items[0].imageUrl
        })
      }
    },
    countdown() {
      this.timer = setTimeout(() => {
        this.roll()
        this.countdown()
      }, 3000)
    },
    roll() {
      // 上方轮播
      if (this.properties.items && this.properties.items.length > 0) {
        // 计算下一个展示图片的索引
        if (this.data.itemIndex == (this.properties.items.length - 1)) {
          this.data.itemNextIndex = 0
        } else {
          this.data.itemNextIndex = this.data.itemIndex + 1
        }

        if (this.data.current == 0) {
          this.setData({
            style0: 'ani-hide',
            style1: 'ani-show',
            img1: this.properties.items[this.data.itemNextIndex].imageUrl,
            current: 1
          })
        } else {
          this.setData({
            style1: 'ani-hide',
            style0: 'ani-show',
            img0: this.properties.items[this.data.itemNextIndex].imageUrl,
            current: 0
          })
        }

        this.setData({
          itemIndex: this.data.itemNextIndex,
        })
      }
    },
    onClick(e) {
      this.triggerEvent("click", this.properties.items[e.currentTarget.dataset.index])
    },
    formAction(e) {
      this.triggerEvent("formAction", e)
    }
  }
})