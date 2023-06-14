import React from "react";
import {
  Droppable
} from "react-beautiful-dnd";


const List = ({ children, onDragEnd, draggableId }) => {
  return (
    <div>
      <div>
        <Droppable droppableId={draggableId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <div>
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;