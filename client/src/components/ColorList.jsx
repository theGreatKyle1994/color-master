import { useState, useReducer } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import SingleColor from "./SingleColor";

const reducer = (state, action) => {
  console.log(state, action.type);
};

const ColorList = () => {
  const [state, dispatch] = useReducer(reducer, {
    mainList: [...generateSingleColors(5)],
    favList: [...generateSingleColors(5)],
  });
  const [leftList, setLeftList] = useState(generateSingleColors(5));
  const [rightList, setRightList] = useState(generateSingleColors(5));

  const onDragEnd = (e) => {
    if (!e.destination) return;
    dispatch({ type: e });
    switch (e.source.droppableId) {
      case "main-list":
        {
          switch (e.destination.droppableId) {
            case "main-list":
              {
                const tempLeftList = [...leftList];
                const [reorderedItem] = tempLeftList.splice(e.source.index, 1);
                tempLeftList.splice(e.destination.index, 0, reorderedItem);
                setLeftList(tempLeftList);
              }
              break;
            case "fav-list":
              {
                const tempLeftList = [...leftList];
                const [reorderedLeftItem] = tempLeftList.splice(
                  e.source.index,
                  1
                );
                setLeftList((prevList) =>
                  prevList.filter((_, index) => index !== e.source.index)
                );

                const tempRightList = [...rightList];
                tempRightList.splice(e.destination.index, 0, reorderedLeftItem);
                setRightList(tempRightList);
              }
              break;
          }
        }
        break;
      case "fav-list":
        {
          switch (e.destination.droppableId) {
            case "main-list":
              {
                const tempRightList = [...rightList];
                const [reorderedLeftItem] = tempRightList.splice(
                  e.source.index,
                  1
                );
                setRightList((prevList) =>
                  prevList.filter((_, index) => index !== e.source.index)
                );

                const tempLeftList = [...leftList];
                tempLeftList.splice(e.destination.index, 0, reorderedLeftItem);
                setLeftList(tempLeftList);
              }
              break;
            case "fav-list":
              {
                const tempRightList = [...rightList];
                const [reorderedItem] = tempRightList.splice(e.source.index, 1);
                tempRightList.splice(e.destination.index, 0, reorderedItem);
                setRightList(tempRightList);
              }
              break;
          }
        }
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <ul ref={provided.innerRef}>
            <h2>List 1</h2>
            {leftList.map((color, index) => (
              <SingleColor key={index} index={index} color={color} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <Droppable droppableId="fav-list">
        {(provided) => (
          <ul ref={provided.innerRef}>
            <h2>List 2</h2>
            {rightList.map((color, index) => (
              <SingleColor key={index} index={index} color={color} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColorList;
