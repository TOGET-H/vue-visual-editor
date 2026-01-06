export function useMenuDragg(data, containRef) {

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
      data.value = {
        ...data.value, blocks: [
          ...blocks, {
            top: e.offsetY,
            left: e.offsetX,
            key: currentComponent.key,
            align: 'left',
            zIndex: 1,
            alignCenter: true,


          }
        ]
      }

      currentComponent = null

    }
    const dragstart = (e, component) => {
      //进入元素 dragenter
      //目标元素经过 要阻止默认行为 dragover
      //离开元素  增加禁用标识 dragleave
      //松手时根据拖拽组件添加
      containRef.value.addEventListener('dragenter', dragenter)
      containRef.value.addEventListener('dragover', dragover)
      containRef.value.addEventListener('dragleave', dragleave)
      containRef.value.addEventListener('drop', drop)
      currentComponent = component


    }
    const dragend = (e) => {
      containRef.value.removeEventListener('dragenter', dragenter)
      containRef.value.removeEventListener('dragover', dragover)
      containRef.value.removeEventListener('dragleave', dragleave)
      containRef.value.removeEventListener('drop', drop)
    }
  return { dragstart, dragend }
}
