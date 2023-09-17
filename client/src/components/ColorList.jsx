import { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { globalContext } from "../App";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import SingleColor from "./SingleColor";

const reducer = (state, action) => {
  switch (action.type) {
    case "update-favs": {
      return {
        ...state,
        favList: action.data,
      };
    }
  }
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
          return {
            ...state,
            mainList: tempMainList,
            favColor: {
              color: "",
              _id: "",
            },
            delColor: {
              color: "",
              _id: "",
            },
          };
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
            favColor: {
              color: reorderedMainItem,
              _id: "",
            },
            delColor: {
              color: "",
              _id: "",
            },
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
          const [reorderedFavItem] = tempFavList.splice(source.index, 1);
          const tempMainList = [...state.mainList];
          tempMainList.splice(destination.index, 0, reorderedFavItem);
          return {
            mainList: tempMainList,
            favList: state.favList.filter((_, index) => index !== source.index),
            favColor: {
              color: "",
              _id: "",
            },
            delColor: {
              color: reorderedFavItem.color,
              _id: reorderedFavItem._id,
            },
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
            favColor: {
              color: "",
              _id: "",
            },
            delColor: {
              color: "",
              _id: "",
            },
          };
        }
      }
    }
  }
};

const ColorList = () => {
  const { userData, isAuthenticated } = useContext(globalContext);
  const [state, dispatch] = useReducer(reducer, {
    mainList: [...generateSingleColors(5)],
    favList: [],
    favColor: {
      color: "",
      _id: "",
    },
    delColor: {
      color: "",
      _id: "",
    },
  });

  const onDragEnd = async (e) => {
    if (!e.destination) return;
    dispatch({ type: e });
  };

  useEffect(() => {
    if (state.favColor.color !== "") {
      const { r, g, b } = state.favColor.color;
      (async () => {
        await axios
          .post(
            "http://localhost:8000/api/colors",
            { r, g, b },
            {
              withCredentials: true,
            }
          )
          .catch((err) => console.log(err));
      })();
    }
  }, [state.favColor.color]);

  useEffect(() => {
    if (state.delColor.color !== "") {
      (async () => {
        console.log(state.delColor._id);
        await axios
          .delete(`http://localhost:8000/api/colors/${state.delColor._id}`, {
            withCredentials: true,
          })
          .catch((err) => console.log(err));
      })();
    }
  }, [state.delColor.color]);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8000/api/colors", {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({ type: "update-favs", data: res.data });
          const data = JSON.parse(sessionStorage.getItem("userInfo"));
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...data,
              colors: state.favList,
            })
          );
        })
        .catch((err) => console.log(err));
    })();
  }, [state.favList.length]);

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
      {isAuthenticated && (
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
      )}
    </DragDropContext>
  );
};

export default ColorList;
