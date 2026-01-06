import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import EditorBlock from './editor_block.jsx'
import { useMenuDragg } from "../packages/useMenuDragg.js";
export default defineComponent({
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
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
    const { dragstart, dragend } = useMenuDragg(data, containRef);//菜单拖拽


    //获取焦点



    //拖拽多个元素


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
            onDragstart={
              e => dragstart(e, component)
            }
            onDragend={dragend}
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
