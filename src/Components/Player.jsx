import { useState } from "react";

export default function Player({intitalName,symbol,isActive,onChangeName}){
  const [playerName,setPlayerName]=useState(intitalName);
const [isEditing, setIsEditing]=useState(false);
    
function handleEditClick(){
    setIsEditing((editing)=> !editing);
    if(isEditing){
    onChangeName(symbol,playerName);}
}

function handleChange(event){
  setPlayerName(event.target.value);
}

let buttonCaption = "Edit";
let editablePlayerName =<span className="player-name">{playerName}</span>;

if(isEditing){
  editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
  buttonCaption="Save";
}

    return ( <li className={isActive ? 'active':undefined}>
        <span className="player">
           {/* {isEditing ? <input type="text" required/>: <span className="player-name">{name}</span>} */}
            {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
      </li>);
}