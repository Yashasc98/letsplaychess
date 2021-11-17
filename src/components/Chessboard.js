import React from 'react';
import './Chessboard.css';
import Tile from './Tile';
import { xAxis, yAxis } from '../constants/constants';

class Chessboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        grabbedPiece: null
                    }
        this.grabPiece = this.grabPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    grabPiece(e) {
        if(e.button === 0){
            if(e.target.classList.contains("piece")){
                const mouseX = e.clientX - (e.target.clientWidth/2) + window.pageXOffset;
                const mouseY = e.clientY - (e.target.clientHeight/2) + window.pageYOffset;
                e.target.style.position = "absolute";
                e.target.style.left = `${mouseX}px`;
                e.target.style.top = `${mouseY}px`;
                this.setState({
                    grabbedPiece: e
                })
            }
        }
    }

    movePiece(e) {
        if(this.state.grabbedPiece){
            const mouseX = e.clientX - (e.target.clientWidth/2) + window.pageXOffset;
            const mouseY = e.clientY - (e.target.clientHeight/2) + window.pageYOffset;
            console.log(e.target.parentNode.parentNode.clientHeight);
            const grabbedPiece = this.state.grabbedPiece;
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

    handleRightClick(e){
        e.preventDefault();
        if(e.target.classList.contains("piece")){
            e.target.parentNode.removeChild(e.target);
        }
    }

    render() { 
        let chessBoard = [];
        for(let i = 0; i < yAxis.length; i++){
            for(let j = 0; j < xAxis.length; j++){
                chessBoard.push(<Tile key={`${j},${i}`} xAxis={j} yAxis={i}></Tile>)
            }
        }
        return  <div className="chessboard-center"><div onMouseDown={this.grabPiece} onMouseMove={this.movePiece} onMouseUp={this.dropPiece} onContextMenu={this.handleRightClick} id="chessboard">{chessBoard}</div></div>;
    }
}
 
export default Chessboard;