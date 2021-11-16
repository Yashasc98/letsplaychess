import React from 'react';
import './Chessboard.css';
import Tile from './Tile';

const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

class Chessboard extends React.Component {
    render() { 
        let board = [];
        for(let i = 0; i < yAxis.length; i++){
            for(let j = 0; j < xAxis.length; j++){
                board.push(<Tile key={`${j},${i}`} xAxis={j} yAxis={i}></Tile>)
            }
        }
        return  <div className="chessboard-center"><div id="chessboard">{board}</div></div>;
    }
}
 
export default Chessboard;