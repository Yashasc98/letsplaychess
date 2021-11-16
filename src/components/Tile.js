import React from 'react';
import "./Tile.css";

// const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
// const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if((this.props.xAxis + this.props.yAxis) % 2 === 0){
            return <div className="tile light-tile"> </div>;
        }else {
            return <div className="tile dark-tile"> </div>;
        }
    }
} 
 
export default Tile;