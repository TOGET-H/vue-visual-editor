import { computed, defineComponent,inject } from "vue";
import './editor.scss'
import  EditorBlock from './editor_block.jsx'
export default defineComponent({
  props: {
    modelValue: {
      type: Object
    }
  },
  setup(props){
    const data = computed({
      get(){
        return props.modelValue
      }
    })
    // console.log(props.modelValue)
    const containerStyles = computed(()=>({
      width:data.value.container.width + 'px',
      height:data.value.container.height + 'px'
    }))

    const config = inject('Config');
    // console.log(containerStyles.value)
    return ()=> <div class="editor">
      <div class="editor-left">
        {/* 左侧物料区 */}
        {config.componentList.map(component=>(
          <div class="editor-left-item">
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
          <div class="editor-container-canvas_content" style={containerStyles.value}>
            {

              (data.value.blocks.map(blocks=>(
                <EditorBlock blocks={blocks} > </EditorBlock>
              )))
          }
          </div>
        </div>
      </div>

    </div>
  }
})
