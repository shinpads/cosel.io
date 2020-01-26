import React, {Component} from 'react';
import untitled from './untitled.png';

export class Eraser extends Component {

    state = {
        outline: ''
    }

    componentDidMount() {
    }

  

    render(){
        return (
        <div>
            <img onClick={(e) => {this.props.erase()}} style={{width: "24px", height: "24px", outline: this.state.outline}} src={untitled} alt="eraser" />
        </div>
        );
    }
  
}
export default Eraser;
