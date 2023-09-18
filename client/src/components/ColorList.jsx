import { useEffect, useState, useContext, useMemo, memo } from "react";
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
    // If item is dragged outside of viable list, auto return to prevent crash
    if (!destination) return;
    if (!source.droppableId || !destination.droppableId) return;
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
            let [reorderedMainItem] = tempMainList.splice(source.index, 1);
            const tempFavList = [...colorLists.favList];
            // The color id is needed for deletion, we use this request to override the local
            // version with the db version and keep its placement in the list
            await axios
              .post("http://localhost:8000/api/colors", reorderedMainItem, {
                withCredentials: true,
              })
              .then((res) => (reorderedMainItem = res.data))
              .catch((err) => console.log(err));
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
            // Deletion request to db when color is moved outside of fav list
            await axios
              .delete(
                `http://localhost:8000/api/colors/${reorderedFavItem._id}`,
                { withCredentials: true }
              )
              .catch((err) => console.log(err));
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

  // When the favList changes, we update the userData in app to match
  // This includes the order of the fav list (local only)
  useEffect(
    () =>
      setUserData((prevData) => ({
        ...prevData,
        colors: colorLists.favList,
      })),
    [colorLists.favList]
  );

  // Grabs color lists once from the userData in app
  useEffect(
    () =>
      setColorLists((prevLists) => ({
        ...prevLists,
        favList: userData.colors,
      })),
    [isAuthenticated]
  );

  return (
    <DragDropContext onDragEnd={sortLists}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <ul ref={provided.innerRef}>
            <h2>Main List</h2>
            {colorLists.mainList &&
              colorLists.mainList.map((color, index) => (
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
              <h2>Fav List</h2>
              {colorLists.favList &&
                colorLists.favList.map((color, index) => (
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
