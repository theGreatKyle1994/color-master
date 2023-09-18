import { Draggable } from "@hello-pangea/dnd";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import "../css/SingleColor.css";

const SingleColor = ({ index, color }) => {
  // Generate perm id for color instance
  const genID = useRef(uuid());
  const colorId = genID.current;
  const { r, g, b, _id = "none" } = color;

  return (
    <Draggable key={colorId} draggableId={colorId} index={index}>
      {(provided) => {
        // Set the background color to the imported color data
        const listItemStyle = {
          // This is required to maintain css state between drags
          ...provided.draggableProps.style,
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        };
        return (
          <li
            className="draggable"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={listItemStyle}
          >
            <div>
              rgb({color.r}, {color.g}, {color.b})
            </div>
            <div>id: {_id}</div>
          </li>
        );
      }}
    </Draggable>
  );
};

export default SingleColor;
