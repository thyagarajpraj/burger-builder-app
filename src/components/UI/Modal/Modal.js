import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'

const modal = props => {
  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Auxiliary>
  )
}

export default React.memo(modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show
    && prevProps.children === nextProps.children
);
