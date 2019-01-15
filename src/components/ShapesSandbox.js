import React from 'react';
import {
  Rectangle,
  Circle,
  Ellipse,
  Line,
  Polyline,
  CornerBox,
  Triangle
} from 'react-shapes';

import './shapesSandbox.css'

export default class ShapesSandbox extends React.Component {
  render() {

    /*
        <div className="shapesRectangle2">
          <Rectangle width={100} height={100} fill={{color:'rgba(255,255,255,0.9)'}} />
        </div>
        */



    return (
      <div className="shapesSandboxMain">
        Shapes Sandbox
        <div className="shapesRectangle">
          <Rectangle width={300} height={300} fill={{color:'rgba(45,45,255,0.6)'}} />
        </div>
        <div className="shapesCircle">
          <Circle r={70} fill={{color:'white'}} />
        </div>
      </div>
    )
  }
}
