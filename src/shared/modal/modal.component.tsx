import React from 'react';

import './modal.component.scss';

const ModalComponent = (props: any) => {
  if (!props.show) {
    return null
  }

  // const closeOnEscKeyDown = (e: any) => {
  //   if ((e.charCode || e.keyCode) === 27) {
  //     props.onClose()
  //   }
  // }


  // useEffect(() => {
  //   document.body.addEventListener('keydown', closeOnEscKeyDown)
  //   return () => {
  //     document.body.removeEventListener('keydown', closeOnEscKeyDown)
  //   }
  // }, [])

  return (
    <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent;