// class 문법
import React, { Component } from 'react';

class Modal2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'kim',
            age: 20
        }
    }
    render(){
        return (
            <div>
                <h1>{this.state.age}</h1>
                <button onClick={() => {
                    this.setState({age: 21})
                }} style={{'width':'30px','height':'30px'}}>+</button>
            </div>
        )
    }
}

export default Modal2;