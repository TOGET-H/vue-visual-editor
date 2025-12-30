import { defineComponent } from "vue";
import './editor.scss'
export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props){
    console.log(props.data);
    return ()=> <div class="editor">
      <div class="editor-left">左侧物料区</div>
      <div class="editor-top">菜单栏</div>
      <div class="editor-right">属性控制栏</div>
      <div class="editor-container">
        {/* 产生滚动条 */}
        <div class="editor-container-canvas">
          {/* 内容 */}
          <div class="editor-container-canvas_content">
            内容区
          </div>
        </div>
      </div>

    </div>
  }
})
