import { computed, defineComponent, inject, onMounted,ref } from "vue";

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
    }));

    const blockRef = ref(null);

    onMounted(() => {
      let {offsetWidth, offsetHeight} = blockRef.value;
      if(props.blocks.alignCenter){
        props.blocks.left = props.blocks.left - offsetWidth/2;
        props.blocks.top = props.blocks.top - offsetHeight/2;
        props.blocks.alignCenter = false;//只执行一次
      }
    })
    const config = inject('Config');

    return ()=> {//这个return是返回一个函数
      const component = config.componentMap[props.blocks.key];//通过key找到对应的组件
      // console.log('component', component);
     const RenderComponent =  component.render();//调用对应组件的render函数，返回对应的组件
      return <div  class="editor-block" style={blockStyle.value} ref={blockRef}>
        {RenderComponent}
      </div>//这个div是返回给上面的函数的
    }
  }
})
