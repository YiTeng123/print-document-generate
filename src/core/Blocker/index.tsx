import { ComponentProps, forwardRef } from 'react'
import css from './index.module.less'
import cls from 'classnames'
import { useEditorStore } from '../../store/editStore.ts'
import { useMove } from '../../hooks/useMove.tsx'
import { onChangeSelected } from '../../store/actions.ts'
import { shallow } from 'zustand/shallow'

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string
}

const Blocker = forwardRef<HTMLDivElement, ComponentContainerProps>(
  ({ style, className, children, id }, ref) => {
    const [selectedKeys, zoom] = useEditorStore(
      (e) => [e.selectedKeys, e.zoom],
      shallow
    )
    const selected = selectedKeys.has(id)
    const { onMouseDown } = useMove({
      onMouseDown: () => onChangeSelected(id),
      zoom,
      autoAlign: true,
    })
    const onClick = () => {
      console.log(id)
      onChangeSelected(id)
    }
    return (
      <div
        data-id={id}
        ref={ref}
        onMouseDown={onMouseDown}
        className={cls(css.blocker, className, { [css.selected]: selected })}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

export default Blocker