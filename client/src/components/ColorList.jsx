import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { globalContext } from "../App";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import SingleColor from "./SingleColor";

const ColorList = () => {
  const { userData, setUserData, isAuthenticated } = useContext(globalContext);
  const [colorLists, setColorLists] = useState({
    mainList: [...generateSingleColors(5)],
    favList: [],
  });

  const sortLists = async (e) => {
    const { source, destination } = e;
    switch (source.droppableId) {
      // From main-list
      case "main-list": {
        switch (destination.droppableId) {
          // To main-list
          case "main-list": {
            const tempMainList = [...colorLists.mainList];
            const [reorderedItem] = tempMainList.splice(source.index, 1);
            tempMainList.splice(destination.index, 0, reorderedItem);
            setColorLists((prevLists) => ({
              ...prevLists,
              mainList: tempMainList,
            }));
            break;
          }
          // To fav-list
          case "fav-list": {
            const tempMainList = [...colorLists.mainList];
            const [reorderedMainItem] = tempMainList.splice(source.index, 1);
            const tempFavList = [...colorLists.favList];
            tempFavList.splice(destination.index, 0, reorderedMainItem);
            setColorLists((prevLists) => ({
              mainList: prevLists.mainList.filter(
                (_, index) => index !== source.index
              ),
              favList: tempFavList,
            }));
            break;
          }
        }
        break;
      }
      // From fav-list
      case "fav-list": {
        switch (destination.droppableId) {
          // To main-list
          case "main-list": {
            const tempFavList = [...colorLists.favList];
            const [reorderedFavItem] = tempFavList.splice(source.index, 1);
            const tempMainList = [...colorLists.mainList];
            tempMainList.splice(destination.index, 0, reorderedFavItem);
            setColorLists((prevLists) => ({
              mainList: tempMainList,
              favList: prevLists.favList.filter(
                (_, index) => index !== source.index
              ),
            }));
            break;
          }
          // To fav-list
          case "fav-list": {
            const tempFavList = [...colorLists.favList];
            const [reorderedItem] = tempFavList.splice(source.index, 1);
            tempFavList.splice(destination.index, 0, reorderedItem);
            setColorLists((prevLists) => ({
              ...prevLists,
              favList: tempFavList,
            }));
            break;
          }
        }
      }
    }
  };

  useEffect(
    () =>
      setUserData((prevData) => ({
        ...prevData,
        colors: colorLists.favList,
      })),
    [colorLists.favList]
  );

  return (
    <DragDropContext onDragEnd={sortLists}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <ul ref={provided.innerRef}>
            <h2>List 1</h2>
            {colorLists.mainList.map((color, index) => (
              <SingleColor key={index} index={index} color={color} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {isAuthenticated && (
        <Droppable droppableId="fav-list">
          {(provided) => (
            <ul ref={provided.innerRef}>
              <h2>List 2</h2>
              {colorLists.favList.map((color, index) => (
                <SingleColor key={index} index={index} color={color} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default ColorList;
