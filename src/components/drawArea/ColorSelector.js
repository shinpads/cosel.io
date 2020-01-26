import React, {Component} from 'react';
import {Color} from './Color.js';
import {Eraser} from './Eraser.js';

export class ColorSelector extends Component {
    componentDidMount() {
        this.props.changeColor(colors[0]);
        let curColorComp = this.refs[colors[0]];
        curColorComp.glow("onClick");
        curColorComp.setState({selected: true});
    }

    erase = () => {
        let eraseComp = this.refs.eraser;
        for(let color of colors){
            let curColorComp = this.refs[color];

            curColorComp.unGlow();
            curColorComp.setState({selected: false});
        }
        eraseComp.setState({outline: "2px solid black"});
        this.props.eraser();
    }

    changeBorder = (c) => {
        let eraseComp = this.refs.eraser;
        eraseComp.setState({outline: "0px solid black"});
        for(let color of colors){
            let curColorComp = this.refs[color];
            
            if (c === color){
                curColorComp.glow("onClick");
                curColorComp.setState({selected: true});
            }
            else {
                curColorComp.unGlow();
                curColorComp.setState({selected: false});
            }
        }
        
        this.props.changeColor(c);
    }

    createColor = (c) => {
        return <div><Color color={c} id={c} ref={c} changeColor={this.changeBorder}/></div>
    }
    
    render(){
        return (
        <div style={horizontal}>
            <div style={flexBox}>
            {colors.map( (c) => {
                return this.createColor(c);
            })}
            </div>
            <Eraser ref="eraser" erase={this.erase}/>
        </div>
        );
    }
  
}

let horizontal = {
    display: 'flex',
    flexDirection: 'row'
}

let flexBox = {
    display: "flex", 
    flexDirection: "row", 
    flexWrap: "wrap", 
    width: "10vmax"
}

let colors = ['purple', 'red', 'blue', 'green', 'yellow', 'pink', 'orange', 'violet'];

export default ColorSelector;
