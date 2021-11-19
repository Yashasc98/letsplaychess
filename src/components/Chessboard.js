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
                        validSquares: null,
                        isMobile: null,
                        colourToMove: "w"
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
            chessBoardBottom: document.getElementById("chessboard").getBoundingClientRect().bottom + window.pageYOffset,
            isMobile: window.innerWidth <= 768 ? true : false
        })
    }

    grabPiece(e) {
        if(e.button !== 2){
            if(e.target.classList.contains("piece")){
                if(this.getPieceTypeAndColour(e.target)[1] !== this.state.colourToMove){
                    return;
                }
                document.body.classList.add("disableScroll"); //Disables scrolling
                const mouseX = (this.state.isMobile && e._reactName==="onTouchStart" ? e.touches[0].clientX : e.clientX) + (-(e.target.clientWidth/2) + window.pageXOffset);
                const mouseY = (this.state.isMobile && e._reactName==="onTouchStart" ? e.touches[0].clientY : e.clientY) + (-(e.target.clientHeight/2) + window.pageYOffset);
                e.target.classList.add("movingPiece");
                e.target.style.left = `${mouseX}px`;
                e.target.style.top = `${mouseY}px`;
                this.getAllValidSquaresForPiece(this.getPieceTypeAndColour(e.target)[0], e.target.parentNode.id, this.getPieceTypeAndColour(e.target)[1])
                this.setState({
                    grabbedPiece: e,
                })
            }
        }
    }

    getAllValidSquaresForPiece(piece, currentSquare, colour){
        let validSquares = [];

        if(piece === "pawn"){
            currentSquare = parseInt(currentSquare);
            if(colour === "b"){
                if(this.isThisIdValidOnChessBoard(currentSquare - 1, colour) && !(document.getElementById(currentSquare - 1).firstChild)){
                    validSquares.push((currentSquare - 1).toString());
                }
                if(this.isThisIdValidOnChessBoard(currentSquare - 11, colour) && (document.getElementById(currentSquare - 11).firstChild)){
                    validSquares.push((currentSquare - 11).toString());
                }
                if(this.isThisIdValidOnChessBoard(currentSquare + 9, colour) && (document.getElementById(currentSquare + 9).firstChild)){
                    validSquares.push((currentSquare + 9).toString());
                }
                if(currentSquare % 10 === 7 && this.isThisIdValidOnChessBoard(currentSquare - 2, colour)){
                    validSquares.push((currentSquare - 2).toString());
                }
            }else if (colour === "w"){
                if(this.isThisIdValidOnChessBoard(currentSquare + 1, colour) && !(document.getElementById(currentSquare + 1).firstChild)){
                    validSquares.push((currentSquare + 1).toString());
                }
                if(this.isThisIdValidOnChessBoard(currentSquare + 11, colour) && (document.getElementById(currentSquare + 11).firstChild)){
                    validSquares.push((currentSquare + 11).toString());
                }
                if(this.isThisIdValidOnChessBoard(currentSquare - 9, colour) && (document.getElementById(currentSquare - 9).firstChild)){
                    validSquares.push((currentSquare - 9).toString());
                }
                if(currentSquare % 10 === 2 && this.isThisIdValidOnChessBoard(currentSquare + 2, colour)){
                    validSquares.push((currentSquare + 2).toString());
                }
            }
        }

        if(piece === "knight"){
            let tempKnightSquare = parseInt(currentSquare);
            if(this.isThisIdValidOnChessBoard(tempKnightSquare + 12, colour)){
                validSquares.push((tempKnightSquare + 12).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare - 12, colour)){
                validSquares.push((tempKnightSquare - 12).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare + 8, colour)){
                validSquares.push((tempKnightSquare + 8).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare - 8, colour)){
                validSquares.push((tempKnightSquare - 8).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare + 21, colour)){
                validSquares.push((tempKnightSquare + 21).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare - 21, colour)){
                validSquares.push((tempKnightSquare - 21).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare + 19, colour)){
                validSquares.push((tempKnightSquare + 19).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKnightSquare - 19, colour)){
                validSquares.push((tempKnightSquare - 19).toString());
            }
        }

        if(piece === "bishop"){
            let tempBishopSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempBishopSquare + 11, colour)){
                validSquares.push((tempBishopSquare + 11).toString());
                if(document.getElementById((tempBishopSquare + 11).toString()).firstChild){
                    break;
                }
                tempBishopSquare = tempBishopSquare + 11;
            }
            tempBishopSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempBishopSquare - 11, colour)){
                validSquares.push((tempBishopSquare - 11).toString());
                if(document.getElementById((tempBishopSquare - 11).toString()).firstChild){
                    break;
                }
                tempBishopSquare = tempBishopSquare - 11;
            }
            tempBishopSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempBishopSquare - 9, colour)){
                validSquares.push((tempBishopSquare - 9).toString());
                if(document.getElementById((tempBishopSquare - 9).toString()).firstChild){
                    break;
                }
                tempBishopSquare = tempBishopSquare - 9;
            }
            tempBishopSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempBishopSquare + 9, colour)){
                validSquares.push((tempBishopSquare + 9).toString());
                if(document.getElementById((tempBishopSquare + 9).toString()).firstChild){
                    break;
                }
                tempBishopSquare = tempBishopSquare + 9;
            }
        }

        if(piece === "rook"){
            let tempRookSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempRookSquare + 1, colour)){
                validSquares.push((tempRookSquare + 1).toString());
                if(document.getElementById((tempRookSquare + 1).toString()).firstChild){
                    break;
                }
                tempRookSquare = tempRookSquare + 1;
            }
            tempRookSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempRookSquare - 1, colour)){
                validSquares.push((tempRookSquare - 1).toString());
                if(document.getElementById((tempRookSquare - 1).toString()).firstChild){
                    break;
                }
                tempRookSquare = tempRookSquare - 1;
            }
            tempRookSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempRookSquare + 10, colour)){
                validSquares.push((tempRookSquare + 10).toString());
                if(document.getElementById((tempRookSquare + 10).toString()).firstChild){
                    break;
                }
                tempRookSquare = tempRookSquare + 10;
            }
            tempRookSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempRookSquare - 10, colour)){
                validSquares.push((tempRookSquare - 10).toString());
                if(document.getElementById((tempRookSquare - 10).toString()).firstChild){
                    break;
                }
                tempRookSquare = tempRookSquare - 10;
            }
        }

        if(piece === "queen"){
            let tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare + 1, colour)){
                validSquares.push((tempQueenSquare + 1).toString());
                if(document.getElementById((tempQueenSquare + 1).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare + 1;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare - 1, colour)){
                validSquares.push((tempQueenSquare - 1).toString());
                if(document.getElementById((tempQueenSquare - 1).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare - 1;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare + 10, colour)){
                validSquares.push((tempQueenSquare + 10).toString());
                if(document.getElementById((tempQueenSquare + 10).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare + 10;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare - 10, colour)){
                validSquares.push((tempQueenSquare - 10).toString());
                if(document.getElementById((tempQueenSquare - 10).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare - 10;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare + 11, colour)){
                validSquares.push((tempQueenSquare + 11).toString());
                if(document.getElementById((tempQueenSquare + 11).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare + 11;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare - 11, colour)){
                validSquares.push((tempQueenSquare - 11).toString());
                if(document.getElementById((tempQueenSquare - 11).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare - 11;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare - 9, colour)){
                validSquares.push((tempQueenSquare - 9).toString());
                if(document.getElementById((tempQueenSquare - 9).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare - 9;
            }
            tempQueenSquare = parseInt(currentSquare);
            while(this.isThisIdValidOnChessBoard(tempQueenSquare + 9, colour)){
                validSquares.push((tempQueenSquare + 9).toString());
                if(document.getElementById((tempQueenSquare + 9).toString()).firstChild){
                    break;
                }
                tempQueenSquare = tempQueenSquare + 9;
            }
        }

        if(piece === "king"){
            let tempKingSquare = parseInt(currentSquare);
            if(colour === "w"){ //Castling logic hardcoded by tile ID
                if(tempKingSquare === 51 && !document.getElementById(61).firstChild && !document.getElementById(71).firstChild && document.getElementById(81).firstChild && this.getPieceTypeAndColour(document.getElementById(81).firstChild)[0] === "rook" && !this.isKingInCheck(51) && !this.isKingInCheck(61) && !this.isKingInCheck(71)){
                    validSquares.push("71");
                }
                if(tempKingSquare === 51 && !document.getElementById(41).firstChild && !document.getElementById(31).firstChild && !document.getElementById(21).firstChild && document.getElementById(81).firstChild && this.getPieceTypeAndColour(document.getElementById(11).firstChild)[0] === "rook" && !this.isKingInCheck(51) && !this.isKingInCheck(41) && !this.isKingInCheck(31)){
                    validSquares.push("31");
                }
            }else if(colour === "b"){
                if(tempKingSquare === 58 && !document.getElementById(68).firstChild && !document.getElementById(78).firstChild && document.getElementById(88).firstChild && this.getPieceTypeAndColour(document.getElementById(88).firstChild)[0] === "rook" && !this.isKingInCheck(58) && !this.isKingInCheck(68) && !this.isKingInCheck(78)){
                    validSquares.push("78");
                }
                if(tempKingSquare === 58 && !document.getElementById(48).firstChild && !document.getElementById(38).firstChild && !document.getElementById(28).firstChild && document.getElementById(18).firstChild && this.getPieceTypeAndColour(document.getElementById(88).firstChild)[0] === "rook" && !this.isKingInCheck(58) && !this.isKingInCheck(48) && !this.isKingInCheck(38)){
                    validSquares.push("38");
                }
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare + 1, colour)){
                validSquares.push((tempKingSquare + 1).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare - 1, colour)){
                validSquares.push((tempKingSquare - 1).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare + 10, colour)){
                validSquares.push((tempKingSquare + 10).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare - 10, colour)){
                validSquares.push((tempKingSquare - 10).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare + 11, colour)){
                validSquares.push((tempKingSquare + 11).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare - 11, colour)){
                validSquares.push((tempKingSquare - 11).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare + 9, colour)){
                validSquares.push((tempKingSquare + 9).toString());
            }
            if(this.isThisIdValidOnChessBoard(tempKingSquare - 9, colour)){
                validSquares.push((tempKingSquare - 9).toString());
            }
        }

        this.styleToValidSquares(validSquares, 1);
        this.setState({
            validSquares
        })
        return 0;
    }

    styleToValidSquares(validSquares, styleFlag){
        if(styleFlag){
            for(let i=0; i<validSquares.length; i++){
                if(document.getElementById(validSquares[i]).firstChild){
                    document.getElementById(validSquares[i]).firstChild.classList.add("validSquare");
                }else {
                    document.getElementById(validSquares[i]).classList.add("validSquare");
                }
            }
        }else{
            for(let i=0; i<this.state.validSquares.length; i++){
                if(document.getElementById(this.state.validSquares[i]).firstChild){
                    document.getElementById(this.state.validSquares[i]).firstChild.classList.remove("validSquare");
                }else {
                    document.getElementById(this.state.validSquares[i]).classList.remove("validSquare");
                }
            }
        }
    }

    isThisIdValidOnChessBoard(destinationId, currentPieceColour){
        if(destinationId < 11 || destinationId > 88){
            return false;
        }
        const firstDigit = destinationId % 10;
        const secondDigit = (destinationId - firstDigit) / 10;
        if(!(firstDigit >= 1 && firstDigit <= 8 && secondDigit >= 1 && secondDigit <= 8)){
            return false;
        }
        if(document.getElementById(destinationId).firstChild && document.getElementById(destinationId).firstChild.classList.contains("piece")){
            if(currentPieceColour === this.getPieceTypeAndColour(document.getElementById(destinationId).firstChild)[1]){
                return false;
            }
        }
        return true;
    }

    isKingInCheck(kingSquareId){
        return false;
    }

    movePiece(e) {
        if(this.state.grabbedPiece){
            const currxCoordinate = this.state.isMobile && e._reactName==="onTouchMove" ? e.touches[0].clientX : e.clientX;
            const curryCoordinate = this.state.isMobile && e._reactName==="onTouchMove" ? e.touches[0].clientY : e.clientY;
            const grabbedPiece = this.state.grabbedPiece;
            if(this.validatePieceInsideChessboard(e, currxCoordinate, curryCoordinate, window.pageXOffset, window.pageYOffset, e.target.clientWidth/4, e.target.clientHeight/4)){
                grabbedPiece.target.style.left = `${currxCoordinate - (e.target.clientWidth/2) + window.pageXOffset}px`;
                grabbedPiece.target.style.top = `${curryCoordinate - (e.target.clientHeight/2) + window.pageYOffset}px`;
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
            document.body.classList.remove("disableScroll"); //Enables scrolling
            this.styleToValidSquares(null, null);
            const grabbedPiece = this.state.grabbedPiece;
            grabbedPiece.target.classList.remove("movingPiece");
            let destinationSquare = this.state.isMobile && e._reactName==="onTouchEnd" ? document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) : document.elementFromPoint(e.clientX, e.clientY);
            let destinationContainsPiece = false;
            if(destinationSquare.classList.contains("piece")){
                destinationContainsPiece = true;
                destinationSquare = destinationSquare.parentNode;
            }
            let backToOriginalPosition = false;
            if(this.validDropSquare(destinationSquare, grabbedPiece)){
                if(destinationContainsPiece){
                    destinationSquare.removeChild(destinationSquare.firstChild);
                    destinationSquare.appendChild(grabbedPiece.target);
                }else{
                    if(this.getPieceTypeAndColour(grabbedPiece.target)[0] === "king"){
                        if(destinationSquare.id - e.target.parentNode.id === 20){
                            const rook = document.getElementById((parseInt(e.target.parentNode.id) + 30).toString()).firstChild;
                            rook.parentNode.removeChild(rook);
                            document.getElementById((parseInt(e.target.parentNode.id) + 10).toString()).appendChild(rook);
                        }else if(destinationSquare.id - e.target.parentNode.id === -20){
                            const rook = document.getElementById((parseInt(e.target.parentNode.id) - 40).toString()).firstChild;
                            rook.parentNode.removeChild(rook);
                            document.getElementById((parseInt(e.target.parentNode.id) - 10).toString()).appendChild(rook);
                        }
                    }
                    e.target.parentNode.removeChild(e.target);
                    destinationSquare.appendChild(grabbedPiece.target);
                }
            }else{
                backToOriginalPosition = true;
            }
            this.setState({
                grabbedPiece: null,
                validSquares: null,
            })
            if(!backToOriginalPosition){
                this.setState({
                    colourToMove: this.state.colourToMove === "w" ? "b" : "w"
                })
            }
        }
    }

    validDropSquare(destinationSquare, grabbedPiece) {
        if(!destinationSquare.classList.contains("tile")){
            return false;
        }
        if(!this.state.validSquares.includes(destinationSquare.id)){
            return false;
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
        return  <div onMouseUp={this.dropPiece} id="chessboard-center"><div onMouseDown={this.grabPiece} onTouchStart={this.grabPiece} onMouseMove={this.movePiece} onTouchMove={this.movePiece}  onTouchEnd={this.dropPiece} onContextMenu={this.handleRightClick} id="chessboard">{chessBoard}</div></div>;
    }
}
 
export default Chessboard;