import React from "react";

const ListResult = (props) => {
  return (
    <>
      <li>
        <i
          className="fa-solid fa-circle-minus"
          onClick={() => {
            /* props access ho raha hai */
            props.clickFunction(props.id);
          }}
        />
        {props.listItemsVal}
      </li>
    </>
  );
};

export default ListResult;
