import React, { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';
import Modal from 'react-modal';
import './App.css';
import List from './List';

import {
  DragDropContext,
  Draggable
} from "react-beautiful-dnd";
// Modal.setAppElement('#root');

const App = () => {
  const [texts, setTexts] = useState([
    { id: '1', name: 'Profile Summary' },
    { id: '2', name: 'Academic and Cocurricular Achievements' },
    { id: '3', name: 'Summer Internship Experience' },
    { id: '4', name: 'Work Experience' },
    { id: '5', name: 'Projects' },
    { id: '6', name: 'Certificates' },
    { id: '7', name: 'Leadership Positions' },
    { id: '8', name: 'Extracurricular' },
    { id: '9', name: 'Education' },
  ]);

  const [editing, setEditing] = useState(Array(9).fill(false));
  const [toggle, setToggle] = useState(Array(9).fill(false));
  const [modalIsOpen, setModalIsOpen] = useState(Array(9).fill(false));

  const handleEditClick = (index) => {
    const newEditing = [...editing];
    newEditing[index] = true;
    setEditing(newEditing);
  };

  const handleSaveClick = (index) => {
    const newEditing = [...editing];
    newEditing[index] = false;
    setEditing(newEditing);
  };

  const handleInputChange = (index, e) => {
    const newTexts = [...texts];
    newTexts[index].name = e.target.value;
    setTexts(newTexts);
  };

  const handleToggleClick = (index) => {
    const newToggle = [...toggle];
    newToggle[index] = !newToggle[index];
    setToggle(newToggle);
  };

  const openModal = (index) => {
    const newModalIsOpen = [...modalIsOpen];
    newModalIsOpen[index] = true;
    setModalIsOpen(newModalIsOpen);
  };

  const closeModal = (index) => {
    const newModalIsOpen = [...modalIsOpen];
    newModalIsOpen[index] = false;
    setModalIsOpen(newModalIsOpen);
  };

  const onDragEnd = (result, e) => {
    if (!result.destination) {
      console.log(result);
      return;
    }
    const listCopy = [...texts];
    const temp = listCopy.splice(result.source.index, 1)[0];
    listCopy.splice(result.destination.index, 0, temp);
    setTexts(listCopy);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <h1 className='h'>Select your sections</h1>
           <List onDragEnd={onDragEnd} draggableId="Name-Placeholder">
            {texts.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                {(
                    provided,
                    snapshot
                ) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                    <div id='hel' className={`col${index + 1}`} key={index}>
                        <div className="left">
                            <div className="menu-icon">
                            <AiOutlineMenu />
                            </div>
                            <GrCircleInformation id='in' className="info-icon" onClick={() => openModal(index)} />
                            {editing[index] ? (
                            <input id='text' type="text" value={item.name} onChange={(e) => handleInputChange(index, e)} />
                            ) : (
                            <p id='text' >{item.name}</p>
                            )}
                        </div>
                        <div className="right">
                            {editing[index] ? (
                            <div class="saveCol" onClick={() => handleSaveClick(index)}>Save</div>
                            ) : (
                            <MdOutlineModeEditOutline id='edit' onClick={() => handleEditClick(index)} />
                            )}
                            <div className="toggle" onClick={() => handleToggleClick(index)}>
                            {toggle[index] ? <FaToggleOn /> : <FaToggleOff />}
                            </div>
                        </div>
                        <Modal
                            isOpen={modalIsOpen[index]}
                            onRequestClose={() => closeModal(index)}
                            contentLabel="Example Modal"
                        >
                            <p>Modal Content for {item.name}</p>
                        </Modal>
                    </div>
                    
                   
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
             </List>
             <div className="saveButton">Save and Next</div>
        </div>
      </DragDropContext>
  );
};
export default App;