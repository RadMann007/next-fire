import React from 'react';

const Toast = ({msg,handleShow, bgColor}) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor} `} 
    role="alert" data-autohide="false" 
    style={{top: '5px', right: '5px', zIndex: 9, minWidth: '280px'}}
    aria-live="assertive" aria-atomic="true">
    <div className={`toast-header ${bgColor} text-light `}>
      {/* <img src="..." class="rounded mr-2" alt="..."/> */}
      <strong className="mr-auto text-light"> {msg.title} </strong>
      {/* <small>11 mins ago</small> */}
      <button type="button" className="ml-2 mb-1 close text-light" 
      style={{outline: 'none', background: 'none'}}
      onClick={handleShow}
      data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">
      {msg.msg}
    </div>
  </div>
  )
}

export default Toast;
