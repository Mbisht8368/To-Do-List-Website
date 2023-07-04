import React, { useEffect, useState } from "react";
import ListResult from "./ListResult";

const App = () => {
  /* Input ki value store ho rahi hai */
  const [inputValue, inputValueUpdate] = useState("");

  /* Ye list hai jise array me convert kara hai */
  const [listItems, listItemsUpdate] = useState([]);

  /* onChange input */
  const input = (e) => {
    const value = e.target.value;
    /* Cut the length of the string */
    if (value.split("").length <= 20) {
      inputValueUpdate(value);
    } else {
      alert("Max Word Limit Reached");
    }
  };
  const addButton = () => {
    if (inputValue === "" || inputValue === " ") {
      alert("Enter Something");
    } else {
      /* yaha par old items jitna hai vo + new valye ja rahi hai */
      listItemsUpdate((oldItems) => {
        return [...oldItems, inputValue];
      });
      localStorage.setItem("data", JSON.stringify([...listItems, inputValue]));
    }
  };
  const deleteButton = (id) => {
    const updateListItems = listItems.filter((e, index) => id !== index);
    /* List delete ho rahi hai. Id or index no. check ho raha hai. Agar same hai to filter out ho jata jai */
    listItemsUpdate(updateListItems);
    localStorage.setItem("data", JSON.stringify(updateListItems));
  };

  useEffect(() => {
    const getData = localStorage.getItem("data");
    if (getData) {
      listItemsUpdate(JSON.parse(getData));
    }
  }, []);

  return (
    <>
      <header>To Do List</header>
      <div className="outerContainer">
        <div className="toDoListBox">
          <div className="inputDiv">
            <input
              type="text"
              placeholder="List item name"
              onChange={input}
              value={inputValue}
              className="inputArea"
            ></input>
            <i
              className="fa-solid fa-circle-plus addButton"
              onClick={addButton}
            ></i>
          </div>
          <div className="resultDiv">
            <ul>
              {listItems.map((val, index) => {
                return (
                  <ListResult
                    id={index}
                    key={index}
                    /* props pass ho raha hai */
                    clickFunction={deleteButton}
                    listItemsVal={val}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
