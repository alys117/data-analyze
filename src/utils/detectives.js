function detec(app) {
  app.directive('drag', {
    mounted(el, binding, vnode, oldVnode) {
      console.log('自定义指令 directive', binding, vnode)
      const minHeight = binding.value.minHeight || 200
      const dragDom = el
      dragDom.style.overflow = 'auto'
      dragDom.style.position = 'relative'

      const resizeElL = document.createElement('div')
      const img = new Image(12, 19)
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAqVJREFUeF7tmj3MTUEQhp+vVYlErRUkChKdUCg0QvxFNGqi1hKNWkKr9Zeg0yGRaIiKRC0iQUEkGgUZOTc51u59z+61+518O6e7md2dmWffOWd3767R+bPWef44AFdA5wS8BDoXgL8EW5bAZeAE8Bl4Btjv8TO2XwGetlBnSwBPgANDUm+AXUGCY7slf3CjAfgVJBTCV/YqPFoqQCWo7A6gBgFXQA2qiTGVxJW9SqiugCpY44OqGVb2KqG6AqpgdQVECSiJK3uVufISWAHrFuAw8A14BXwUY6kZVvbY8GeBD6tsnEoVsAO4C+wcoroHnGoM4DpwcbS5Mv9vcye0BECY/MKnGkvNsLKHuYXtbYeZDUEFHTpNJb8eCrgFnAsCzIaQAyCV/GvgDPCucQlsB24Du1eBMBVAKvkXwGng/YTaUxJX9piLbcAdYF8phCkAUsnbCY7V3JcJyVsTlaCyp9xsBe4D+0sgKACp5B8Dx4EfE5OvCcDG3gQ8BA7lQlgGIJW8OTqWkfiiqZphZZ/i8hFwJAdCCsBm4PnoOz/FeW4bdSaYO96y9vZ1sENWO5H+60kBOAo8+J8RRMZqCcDcXwBu9gzAFPDPfw09lUD4P8QfMfhLUNR515/BBZuuF0IKQhdLYQWhi82QgrAe2+EbwPmcVV/sfaf2ArE+czkQ+QTYRmjxZJ8FqM/gsg/EHI7ErgGXhiCLkl8FgPWdw6HoSeDnsML7WrJ0LymBEj/WR+32lL3U79J+DqAK1vigaoaVvUqoroAqWF0BUQJK4speZa68BKpg9RLwEogRUDWu7FXE6u+AKljjg6rL0i+BPUNXu3Cxt0VsLRWgrsvbbZOrwHdgQ16XbzGh2T5aKiA7uBYdHEALynP24QqY8+y0iM0V0ILynH38BphO0kEdS9VDAAAAAElFTkSuQmCC'
      dragDom.appendChild(img)
      dragDom.appendChild(resizeElL)
      resizeElL.style.cursor = 'n-resize'
      resizeElL.style.position = 'absolute'
      resizeElL.style.height = '10px'
      resizeElL.style.width = '100%'
      resizeElL.style.bottom = '0px'
      resizeElL.style.userSelect = 'none'
      resizeElL.style.padding = '0 20px'
      resizeElL.style.backgroundClip = 'content-box'
      resizeElL.style.backgroundImage = 'linear-gradient(to top, transparent 0%, transparent 60%,rgba(0, 0, 0, .2) 66%, transparent 70%, transparent 100%)'
      // resizeElL.style.zIndex = '999'
      img.style.position = 'absolute'
      img.style.left = '50%'
      img.style.bottom = '-3px'
      img.style.userSelect = 'none'
      img.style.transform = 'rotate(90deg)'

      resizeElL.onmousedown = (e) => {
        const elH = dragDom.clientHeight // 元素本身的高度
        const EloffsetTop = dragDom.offsetTop // 元素向上高度
        const clientY = e.clientY // 鼠标向上的高度
        document.onmousemove = function(e) {
          e.preventDefault()
          console.log('move')
          // 左侧鼠标拖拽位置
          if (clientY > EloffsetTop + elH - 10 && clientY < EloffsetTop + elH + 10 || true) {
            // 往左拖拽
            if (clientY > e.clientY) {
              if (dragDom.clientHeight >= minHeight) {
                dragDom.style.height = elH - (clientY - e.clientY) + 'px'
                console.log(dragDom.style.height, '往上')
              }
            }
            // 往右拖拽
            if (clientY < e.clientY) {
              dragDom.style.height = elH + (e.clientY - clientY) + 'px'
              console.log(dragDom.style.height, '往下')
            }
          }
        }
        // 拉伸结束
        document.onmouseup = function(e) {
          if (typeof binding.value === 'function') {
            binding.value(el, dragDom.style.height)
          }
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
}
export default detec

