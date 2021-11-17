import React from 'react';
import "./Tile.css";
import { positionPieceMap } from '../constants/constants';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if(positionPieceMap[`${this.props.xAxis}${this.props.yAxis}`] !== undefined){
            if((this.props.xAxis + this.props.yAxis) % 2 === 0){
                return <div className="tile light-tile">
                    <div className="piece" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/assets/pieces/${positionPieceMap[`${this.props.xAxis}${this.props.yAxis}`]}')`}}></div>
                </div>;
            }else {
                return <div className="tile dark-tile">
                    <div className="piece" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/assets/pieces/${positionPieceMap[`${this.props.xAxis}${this.props.yAxis}`]}')`}}></div>
                </div>;
            }
        }
        else{
            if((this.props.xAxis + this.props.yAxis) % 2 === 0){
                return <div className="tile light-tile"></div>;
            }else {
                return <div className="tile dark-tile"></div>;
            }
        }
    }
} 
 
export default Tile;