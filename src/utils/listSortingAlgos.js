export const sortLists = (e, colorLists, setColorLists) => {
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
            newColor: "",
            delColor: "",
          }));
          break;
        }
        // To main-list2
        case "main-list2": {
          const tempMainList = [...colorLists.mainList];
          const [reorderedMainItem] = tempMainList.splice(source.index, 1);
          const tempMainList2 = [...colorLists.mainList2];
          tempMainList2.splice(destination.index, 0, reorderedMainItem);
          setColorLists((prevLists) => ({
            ...prevLists,
            mainList: prevLists.mainList.filter(
              (_, index) => index !== source.index
            ),
            mainList2: tempMainList2,
            newColor: "",
            delColor: "",
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
            ...prevLists,
            mainList: prevLists.mainList.filter(
              (_, index) => index !== source.index
            ),
            favList: tempFavList,
            newColor: reorderedMainItem,
            delColor: "",
          }));
          break;
        }
      }
      break;
    }
    // From main-list2
    case "main-list2": {
      switch (destination.droppableId) {
        // To main-list
        case "main-list": {
          const tempMainList2 = [...colorLists.mainList2];
          const [reorderedMain2Item] = tempMainList2.splice(source.index, 1);
          const tempMainList = [...colorLists.mainList];
          tempMainList.splice(destination.index, 0, reorderedMain2Item);
          setColorLists((prevLists) => ({
            ...prevLists,
            mainList: tempMainList,
            mainList2: prevLists.mainList2.filter(
              (_, index) => index !== source.index
            ),
            newColor: "",
            delColor: "",
          }));
          break;
        }
        // To main-list2
        case "main-list2": {
          const tempMainList2 = [...colorLists.mainList2];
          const [reorderedItem] = tempMainList2.splice(source.index, 1);
          tempMainList2.splice(destination.index, 0, reorderedItem);
          setColorLists((prevLists) => ({
            ...prevLists,
            mainList2: tempMainList2,
            newColor: "",
            delColor: "",
          }));
          break;
        }
        // To fav-list
        case "fav-list": {
          const tempMainList2 = [...colorLists.mainList2];
          const [reorderedMain2Item] = tempMainList2.splice(source.index, 1);
          const tempFavList = [...colorLists.favList];
          tempFavList.splice(destination.index, 0, reorderedMain2Item);
          setColorLists((prevLists) => ({
            ...prevLists,
            mainList2: prevLists.mainList2.filter(
              (_, index) => index !== source.index
            ),
            favList: tempFavList,
            newColor: reorderedMain2Item,
            delColor: "",
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
            ...prevLists,
            mainList: tempMainList,
            favList: prevLists.favList.filter(
              (_, index) => index !== source.index
            ),
            newColor: "",
            delColor: reorderedFavItem,
          }));
          break;
        }
        // To main-list2
        case "main-list2": {
          const tempFavList = [...colorLists.favList];
          const [reorderedMain2Item] = tempFavList.splice(source.index, 1);
          const tempMainList2 = [...colorLists.mainList2];
          tempMainList2.splice(destination.index, 0, reorderedMain2Item);
          setColorLists((prevLists) => ({
            ...prevLists,
            mainList2: tempMainList2,
            favList: prevLists.favList.filter(
              (_, index) => index !== source.index
            ),
            newColor: "",
            delColor: reorderedMain2Item,
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
            newColor: "",
            delColor: "",
          }));
          break;
        }
      }
    }
  }
};
