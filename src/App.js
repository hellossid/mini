import React, { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';
import Modal from 'react-modal';
import './App.css';

// Modal.setAppElement('#root'); // Set the root element for the modal

function App() {
  const [texts, setTexts] = useState([
    'hello',
    'bye',
    'example',
    'text',
    'content',
    'sample',
    'data',
    'information',
    'demo',
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
    newTexts[index] = e.target.value;
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

  return (
    <div className="app">
      <h1 className='h'>Select your sections</h1>
      {texts.map((text, index) => (
        <div id='hel' className={`col${index + 1}`} key={index}>
          <div className="left">
            <div className="menu-icon">
              <AiOutlineMenu />
            </div>
            <GrCircleInformation id='in' className="info-icon" onClick={() => openModal(index)} />
            {editing[index] ? (
              <input type="text" value={text} onChange={(e) => handleInputChange(index, e)} />
            ) : (
              <p id='text' >{text}</p>
            )}
          </div>
          <div className="right">
            {editing[index] ? (
              <button onClick={() => handleSaveClick(index)}>Save</button>
            ) : (
              <MdOutlineModeEditOutline id='edit' onClick={() => handleEditClick(index)} />
            )}
            <div className="toggle" onClick={() => handleToggleClick(index)}>
              {toggle[index] ? <FaToggleOn /> : <FaToggleOff />}
            </div>
          </div>
          {/* Modal for each column */}
          <Modal
            isOpen={modalIsOpen[index]}
            onRequestClose={() => closeModal(index)}
            contentLabel="Example Modal"
          >
            <h2>Modal Content for Column {index + 1}</h2>
            <p>Additional information or content can be placed here.</p>
            <button onClick={() => closeModal(index)}>Close Modal</button>
          </Modal>
        </div>
      ))}
    </div>
  );
}

export default App;
