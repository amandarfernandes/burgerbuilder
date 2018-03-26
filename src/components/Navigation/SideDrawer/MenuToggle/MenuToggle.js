import React from 'react';

const MenuToggle = props => (
  <div style={{
      fontSize: "2em",
      fontWeight: "100",
      color:"white"
  }} 
    onClick={props.onClick}
  >&#9776;</div>
);

export default MenuToggle;