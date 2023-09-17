import { useEffect, useReducer } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import SingleColor from "./SingleColor";

const reducer = (state, action) => {
  const { source, destination } = action.type;
  switch (source.droppableId) {
    // From main-list
    case "main-list": {
      switch (destination.droppableId) {
        // To main-list
        case "main-list": {
          const tempMainList = [...state.mainList];
          const [reorderedItem] = tempMainList.splice(source.index, 1);
          tempMainList.splice(destination.index, 0, reorderedItem);
          return { ...state, mainList: tempMainList };
        }
        // To fav-list
        case "fav-list": {
          const tempMainList = [...state.mainList];
          const [reorderedMainItem] = tempMainList.splice(source.index, 1);
          const tempFavList = [...state.favList];
          tempFavList.splice(destination.index, 0, reorderedMainItem);
          return {
            mainList: state.mainList.filter(
              (_, index) => index !== source.index
            ),
            favList: tempFavList,
          };
        }
      }
    }
    // From fav-list
    case "fav-list": {
      switch (destination.droppableId) {
        // To main-list
        case "main-list": {
          const tempFavList = [...state.favList];
          const [reorderedMainItem] = tempFavList.splice(source.index, 1);
          const tempMainList = [...state.mainList];
          tempMainList.splice(destination.index, 0, reorderedMainItem);
          return {
            mainList: tempMainList,
            favList: state.favList.filter((_, index) => index !== source.index),
          };
        }
        // To fav-list
        case "fav-list": {
          const tempFavList = [...state.favList];
          const [reorderedItem] = tempFavList.splice(source.index, 1);
          tempFavList.splice(destination.index, 0, reorderedItem);
          return {
            ...state,
            favList: tempFavList,
          };
        }
      }
    }
  }
};

const ColorList = () => {
  const [state, dispatch] = useReducer(reducer, {
    mainList: [...generateSingleColors(5)],
    favList: [...generateSingleColors(5)],
  });

  const onDragEnd = (e) => {
    if (!e.destination) return;
    dispatch({ type: e });
  };

  // useEffect(() => console.log(state), [state]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <ul ref={provided.innerRef}>
            <h2>List 1</h2>
            {state.mainList.map((color, index) => (
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
            {state.favList.map((color, index) => (
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
