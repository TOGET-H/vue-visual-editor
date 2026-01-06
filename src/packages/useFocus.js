import { computed } from "vue";

export function useFocus(data) {
  const clearBlockFocus = () => {
    data.value.blocks.forEach(blocks => blocks.focus = false)
  }

  const focusData = computed(() => {
    let focus = [];
    let unFocus = [];

    // 遍历当前的 blocks 列表，根据 focus 状态进行分类
    data.value.blocks.forEach(block => {
      (block.focus ? focus : unFocus).push(block);
    });

    // 必须在 computed 内部 return，这样 focusData.value 才能拿到这个对象
    return {
      focus,
      unFocus
    };
  });
  const containerMousedown = () => {
    //点击空白区域取消所有选中
    clearBlockFocus();
  }

  const blockMousedown = (e, blocks) => {
    e.preventDefault();
    e.stopPropagation();
    //block上规定属性focus，获取焦点后就将focus设为true

    if (e.shiftKey) {
      blocks.focus = !blocks.focus
    } else {
      if (!blocks.focus) {
        clearBlockFocus();
        blocks.focus = true

      } else {
        blocks.focus = false
      }


    }

  }
  return { containerMousedown, blockMousedown, focusData }
}
