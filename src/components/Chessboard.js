import React from 'react';
import './Chessboard.css';
import Tile from './Tile';
import { xAxis, yAxis } from '../constants/constants';

class Chessboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        grabbedPiece: null,
                        chessboardLeft: null,
                        chessboardRight: null,
                        chessBoardTop: null,
                        chessBoardBottom: null,
                        validSquares: null
                    }
        this.grabPiece = this.grabPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            chessboardLeft: document.getElementById("chessboard").getBoundingClientRect().left + window.pageXOffset,
            chessboardRight: document.getElementById("chessboard").getBoundingClientRect().right + window.pageXOffset,
            chessBoardTop: document.getElementById("chessboard").getBoundingClientRect().top + window.pageYOffset,
            chessBoardBottom: document.getElementById("chessboard").getBoundingClientRect().bottom + window.pageYOffset
        })
    }

    grabPiece(e) {
        if(e.button === 0){
            if(e.target.classList.contains("piece")){
                const mouseX = e.clientX - (e.target.clientWidth/2) + window.pageXOffset;
                const mouseY = e.clientY - (e.target.clientHeight/2) + window.pageYOffset;
                e.target.style.position = "absolute";
                e.target.style.left = `${mouseX}px`;
                e.target.style.top = `${mouseY}px`;
                this.getAllValidSquaresForPiece(this.getPieceTypeAndColour(e.target)[0], e.target.parentNode.id)
                this.setState({
                    grabbedPiece: e,
                })
            }
        }
    }

    getAllValidSquaresForPiece(piece, currentSquare){
        console.log(piece + " " + currentSquare);

        let validSquares = []; //FILL THIS CONDITIONALLY WITH IDS OF SQUARES THE PIECE CAN GO TO

        this.styleToValidSquares(validSquares, 1);
        this.setState({
            validSquares
        })
        return validSquares;
    }

    styleToValidSquares(validSquares, styleFlag){
        if(styleFlag){
            for(let i=0; i<validSquares.length; i++){
                document.getElementById(validSquares[i]).classList.add("validSquare");
            }
        }else{
            for(let i=0; i<this.state.validSquares.length; i++){
                document.getElementById(this.state.validSquares[i]).classList.remove("validSquare");
            }
            this.setState({
                validSquares: null
            })
        }
    }

    movePiece(e) {
        if(this.state.grabbedPiece){
            const currxCoordinate = e.clientX;
            const curryCoordinate = e.clientY;
            const currxOffset = window.pageXOffset;
            const curryOffset = window.pageYOffset;
            const piece = e.target;
            const pieceWidth = piece.clientWidth;
            const pieceHeight = piece.clientHeight;
            const mouseX = currxCoordinate - (pieceWidth/2) + window.pageXOffset;
            const mouseY = curryCoordinate - (pieceHeight/2) + window.pageYOffset;
            const grabbedPiece = this.state.grabbedPiece;
            if(this.validatePieceInsideChessboard(e, currxCoordinate, curryCoordinate, currxOffset, curryOffset, pieceWidth/4, pieceHeight/4)){
                grabbedPiece.target.style.left = `${mouseX}px`;
                grabbedPiece.target.style.top = `${mouseY}px`;
            }
        }
    }

    validatePieceInsideChessboard(e, currxCoordinate, curryCoordinate, currxOffset, curryOffset, pieceWidth, pieceHeight){
        if(this.state.chessboardLeft + pieceWidth <= currxCoordinate + currxOffset &&
        this.state.chessboardRight - pieceWidth >= currxCoordinate + currxOffset &&
        this.state.chessBoardTop + pieceHeight <= curryCoordinate + curryOffset &&
        this.state.chessBoardBottom - pieceHeight >= curryCoordinate + curryOffset){
            return true;
        }
        return false;
    }

    dropPiece(e) {
        if(this.state.grabbedPiece){
            this.styleToValidSquares(null, null);
            const grabbedPiece = this.state.grabbedPiece;
            grabbedPiece.target.style.position = "static";
            
            let destinationSquare = document.elementFromPoint(e.clientX, e.clientY);
            let destinationContainsPiece = false;
            if(destinationSquare.classList.contains("piece")){
                destinationContainsPiece = true;
                destinationSquare = destinationSquare.parentNode;
            }

            if(destinationSquare.firstChild !== e.target && this.validDropSquare(destinationSquare, grabbedPiece)){
                if(destinationContainsPiece){
                    destinationSquare.removeChild(destinationSquare.firstChild);
                    destinationSquare.appendChild(grabbedPiece.target);
                }else{
                    e.target.parentNode.removeChild(e.target);
                    destinationSquare.appendChild(grabbedPiece.target);
                }
            }

            this.setState({
                grabbedPiece: null
            })
        }
    }

    validDropSquare(destinationSquare, grabbedPiece) {
        if(destinationSquare.firstChild && destinationSquare.firstChild.classList.contains("piece")){
            if(this.getPieceTypeAndColour(destinationSquare.firstChild)[1] === this.getPieceTypeAndColour(grabbedPiece.target)[1]){
                return false;
            }
        }
        return true;
    }

    handleRightClick(e){
        e.preventDefault();
        if(e.target.classList.contains("piece")){
            if(!e.target.classList.contains("selected")){
                e.target.classList.add("selected");
            }else {
                e.target.classList.remove("selected");
            }
        }
    }

    getPieceTypeAndColour(piece){
        return piece.style.backgroundImage.split(".")[0].split("/").pop().split("_");
    }

    render() { 
        let chessBoard = [];
        for(let i = 0; i < yAxis.length; i++){
            for(let j = 0; j < xAxis.length; j++){
                chessBoard.push(<Tile key={`${j},${i}`} xAxis={j} yAxis={i}></Tile>)
            }
        }
        return  <div id="chessboard-center"><div onMouseDown={this.grabPiece} onMouseMove={this.movePiece} onMouseUp={this.dropPiece} onContextMenu={this.handleRightClick} id="chessboard">{chessBoard}</div></div>;
    }
}
 
export default Chessboard;