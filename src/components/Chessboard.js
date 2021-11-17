import React from 'react';
import './Chessboard.css';
import Tile from './Tile';
import { xAxis, yAxis } from '../constants/constants';

class Chessboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        width: window.innerWidth, 
                        height: window.innerHeight,
                        grabbedPiece: null
                    }
        this.grabPiece = this.grabPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
    }

    grabPiece(e) {
        if(e.target.classList.contains("piece")){
            const mouseX = e.clientX - (e.target.clientWidth/2);
            const mouseY = e.clientY - (e.target.clientHeight/2);
            e.target.style.position = "absolute";
            e.target.style.left = `${mouseX}px`;
            e.target.style.top = `${mouseY}px`;
            this.setState({
                grabbedPiece: e
            })
        }
    }

    movePiece(e) {
        if(this.state.grabbedPiece){
            const mouseX = e.clientX - (e.target.clientWidth/2);
            const mouseY = e.clientY - (e.target.clientHeight/2);
            let grabbedPiece = this.state.grabbedPiece;
            grabbedPiece.target.style.left = `${mouseX}px`;
            grabbedPiece.target.style.top = `${mouseY}px`;
        }
    }

    dropPiece(e) {
        if(this.state.grabbedPiece){
            this.setState({
                grabbedPiece: null
            })
        }
    }

    render() { 
        let chessBoard = [];
        for(let i = 0; i < yAxis.length; i++){
            for(let j = 0; j < xAxis.length; j++){
                chessBoard.push(<Tile key={`${j},${i}`} xAxis={j} yAxis={i}></Tile>)
            }
        }
        return  <div className="chessboard-center"><div onMouseDown={this.grabPiece} onMouseMove={this.movePiece} onMouseUp={this.dropPiece} id="chessboard">{chessBoard}</div></div>;
    }
}
 
export default Chessboard;