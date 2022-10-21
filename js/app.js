/*
   1. 鼠标移入显示,移出隐藏
      目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
   2. 鼠标移动切换二级导航菜单的切换显示和隐藏
   3. 输入搜索关键字, 列表显示匹配的结果
   4. 点击显示或者隐藏更多的分享图标
   5. 鼠标移入移出切换地址的显示隐藏
   6. 点击切换地址tab
  
   7. 鼠标移入移出切换显示迷你购物车
   8. 点击切换产品选项 (商品详情等显示出来)
  
   9. 点击向右/左, 移动当前展示商品的小图片
   10. 当鼠标悬停在某个小图上,在上方显示对应的中图
   11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

(function () {

  // 1. 鼠标移入显示,移出隐藏
  showHide()

  // 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
  showSubMenu()

  // 3. 输入搜索关键字, 列表显示匹配的结果
  search()

  // 4. 点击显示或者隐藏更多的分享图标
  share()

  // 5. 鼠标移入移出切换地址的显示隐藏
  hoverAddr()

  // 6. 点击切换地址tab
  clickTabs()

  // 7. 鼠标移入移出切换显示迷你购物车
  miniCart()

  // 8. 点击切换产品选项 (商品详情等显示出来)
  tabProductDetail()

  // 9. 点击向右/左, 移动当前展示商品的小图片
  moveMiniImg()


  /*
    1. 鼠标移入显示,移出隐藏
   */
  function showHide() {
    $('[name=show_hide]').hover(function () {  // 显示
      var id = this.id + '_items'
      $('#'+id).show()
    },function () {  // 隐藏
      var id = this.id + '_items'
      $('#'+id).hide()
    })
  }

  /*
    2. 鼠标移动切换二级导航菜单的切换显示和隐藏
   */
  function showSubMenu() {
    $('#category_items>div').hover(function () {
      $(this).children('.sub_cate_box').show()
    },function () {
      $(this).children('.sub_cate_box').hide()
    })
  }

  /*
    3. 输入搜索关键字, 列表显示匹配的结果
   */
  function search() {
    $('#txtSearch').on('focus keyup',function () {
      // 如果输入框有文本才显示列表
      var txt = this.value.trim()
      if(txt){
        $('#search_helper').show()
      }
    }).blur(function () {
      // 失去焦点,隐藏列表
      $('#search_helper').hide()
    })
  }

  /*
      4. 点击显示或者隐藏更多的分享图标
   */
  function share() {
    var isOpen = false
    $('#shareMore').click(function () {
      if(isOpen){
        $(this).parent().css('width','155')
        $(this).children('b').removeClass()
        $(this).prevAll(':lt(2)').hide()
      }else{
        $(this).parent().css('width','200')
        $(this).children('b').addClass('backword')
        $(this).prevAll(':lt(2)').show()
      }
      isOpen = !isOpen
    })
  }

  /*
     5. 鼠标移入移出切换地址的显示隐藏
   */
  function hoverAddr() {
    $('#store_select').hover(function () {
      $('#store_select').children(':eq(1)').show()
      $('#store_select').children(':eq(2)').show()
    },function () {
      $('#store_select').children(':eq(1)').hide()
      $('#store_select').children(':eq(2)').hide()
    })
    $('#store_select').children(':eq(2)').click(function () {
      $('#store_select').children(':eq(1)').hide()
      $('#store_select').children(':eq(2)').hide()
    })
  }

  /*
      6. 点击切换地址tab
   */
  function clickTabs() {
    $('#store_tabs>li').click(function () {
      $('#store_tabs>li').removeClass()
      $(this).addClass('hover')
    })
  }

  /*
      7. 鼠标移入移出切换显示迷你购物车
   */
  function miniCart() {
    $('#minicart').hover(function () {
      $(this).addClass('minicart')
      $(this).children('div').show()
    },function () {
      $(this).removeClass('minicart')
      $(this).children('div').hide()
    })
  }

  /*
      8. 点击切换产品选项 (商品详情等显示出来)
   */
  function tabProductDetail() {
    $('#product_detail>ul>li').click(function () {
      $('#product_detail>ul>li').removeClass()
      $(this).addClass('current')
      var index = $(this).index()
      $('#product_detail>div:gt(0)').hide()
      $('#product_detail>div:gt(0)').eq(index).show()
    })
  }

  /*
      9. 点击向右/左, 移动当前展示商品的小图片
   */
  function moveMiniImg() {
    var $ul = $('#icon_list')
    var $backward = $('#preview>h1>a:first')
    var $forward = $('#preview>h1>a:last')
    var imgCount = $ul.children('li').length
    var SHOWCOUNT = 5
    var moveCount = 0  // 移动的次数 (点击向右移动箭头为正数,点击向左移动箭头为负数)
    var liWidth = $ul.children(':first').width()

    // 初始化更新
    if(imgCount > SHOWCOUNT) {
      // 更新向右按钮的样式为可点击
      $forward.attr('class','forward')
    }

    // 给向右按钮绑定点击监听
    $forward.click(function () {
      // 判断是否需要移动,如果不需要直接结束
      if(moveCount === imgCount - SHOWCOUNT){
        return
      }
      // 更新moveCount值
      moveCount++
      // 更新向左按钮的样式为可点击
      $backward.attr('class','backward')
      // 判断是否到最后了
      if(moveCount === imgCount - SHOWCOUNT){
        // 更新向右按钮样式为不可点击
        $forward.attr('class','forward_disabled')
      }
      // 移动ul的left值
      $ul.css({
        left: -moveCount * liWidth
      })
    })

    // 给向做按钮绑定点击监听
    $backward.click(function () {
      // 判断是否需要移动,如果不需要直接结束
      if(moveCount === 0){
        return
      }
      // 更新moveCount值
      moveCount--
      // 更新向右按钮的样式为可点击
      $forward.attr('class','forward')
      // 判断是否到最前了
      if(moveCount === 0){
        // 更新向左按钮样式为不可点击
        $backward.attr('class','backward_disabled')
      }
      // 移动ul的left值
      $ul.css({
        left: -moveCount * liWidth
      })
    })
  }

})()