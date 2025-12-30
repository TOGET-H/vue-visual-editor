import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    blocks: {
      type: Object
    }
  },
  setup(props){
    const blockStyle  = computed(()=>({
      top:`${props.blocks.top}px`,
      left:`${props.blocks.left}px`,
      zIndex:`${props.blocks.zIndex}px`,
    }))
    return ()=> {//这个return是返回一个函数
      return <div  class="editor-block" style={blockStyle.value}>11</div>//这个div是返回给上面的函数的
    }
  }
})
