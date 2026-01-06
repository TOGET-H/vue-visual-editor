import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import EditorBlock from './editor_block.jsx'
export default defineComponent({
  props: {
    modelValue: {
      type: Object
    }
  },
  emits:['update:modelValue'],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        //触发更新
        ctx.emit('update:modelValue', newValue)
      }
    })
    // console.log(props.modelValue)
    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px'
    }))
    const containRef = ref(null)
    var currentComponent = null
    const dragenter = (e) => {
      e.dataTransfer.dropEffect = 'move';
    }

    const dragover = (e) => {
      e.preventDefault();
    }

    const dragleave = (e) => {
      e.dataTransfer.dropEffect = 'none'
    }

    const drop = (e) => {
      console.log(currentComponent);

       let blocks = data.value.blocks;
      data.value = {...data.value,blocks:[
        ...blocks,{
          top: e.offsetY,
          left: e.offsetX,
          key: currentComponent.key,
          align:'left',
          zIndex: 1,
          alignCenter: true,


        }
       ]}

        currentComponent = null

    }
    const dragstart = (e, component) => {
      //进入元素 dragenter
      //目标元素经过 要阻止默认行为 dragover
      //离开元素  增加禁用标识 dragleave
      //松手时根据拖拽组件添加
      containRef.value.addEventListener('dragenter',dragenter)
      containRef.value.addEventListener('dragover',dragover)
      containRef.value.addEventListener('dragleave',dragleave)
      containRef.value.addEventListener('drop',drop)
      currentComponent = component


    }
    const config = inject('Config');
    // console.log(containerStyles.value)
    return () => <div
      class="editor"
    >
      <div class="editor-left">
        {/* 左侧物料区 */}
        {config.componentList.map(component => (
          <div class="editor-left-item"
            draggable
            onDragstart = {
              e=> dragstart(e,component)
            }
          >
            <span class="label">{component.label}</span>
            <span>{component.preview()}</span>
          </div>
        ))
        }
      </div>
      <div class="editor-top">菜单栏</div>
      <div class="editor-right">属性控制栏</div>
      <div class="editor-container">
        {/* 产生滚动条 */}
        <div class="editor-container-canvas">
          {/* 内容 */}
          <div class="editor-container-canvas_content" style={containerStyles.value} ref={containRef}>
            {

              (data.value.blocks.map(blocks => (
                <EditorBlock blocks={blocks} > </EditorBlock>
              )))
            }
          </div>
        </div>
      </div>

    </div>
  }
})
