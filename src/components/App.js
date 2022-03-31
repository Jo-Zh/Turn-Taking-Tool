import React from "react";
import Timer from "./Timer";
import "./app.css";
import create_item from "./functions/newItem";
import background from "./imgs/background-field.jpg";
import create_dragableElement from "./functions/create_dragableElement";
import { dragOver, drop } from "./functions/dragTarget";

const App = () => {
  const [order, setOrder] = React.useState(1);
  const [adding, setAdding] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("team")) {
      const teamList = localStorage.getItem("team").split(",");
      console.log(teamList);
      if (teamList) {
        const loadList = document.querySelector("#requested");
        for (let i = 0; i <= teamList.length - 1; i++) {
          const player = create_dragableElement(i);
          player.innerHTML = teamList[i];
          loadList.appendChild(player);
        }

        setOrder(teamList.length);
      } else {
        return;
      }
    }
    return;
  }, []);

  const createHandler = () => {
    const message = "Please add a description.";
    const error = document.querySelector(".error");
    const target = document.querySelector("#requested");
    if (adding == false) {
      setAdding(true);
      target.appendChild(create_item(order, setOrder, setAdding, error));
      document.querySelector("input").focus();
    } else {
      error.innerHTML = message;
    }
  };

  const listHandler = (e) => {
    e.preventDefault();
    const list = document.querySelectorAll(".item");
    let madeList = [];
    list.forEach((el) => {
      madeList.push(el.textContent);
    });
    localStorage.setItem("team", madeList);
  };

  return (
    <div className="container">
      <Timer />

      <div className="error"></div>

      <div className="flex">
        <div
          className="list drop"
          id="requested"
          style={{ backgroundImage: `url(${background})` }}
          onDragOver={dragOver}
          onDrop={drop}
        >
          <div className="heading">
            <div className="title">IN FIELD</div>
            <div className="add" onClick={createHandler}>
              +
            </div>
          </div>
          <button
            type="button"
            className="btn btn-info btn-lg"
            onClick={listHandler}
          >
            save team
          </button>
        </div>

        <div
          className="list drop"
          id="done"
          onDragOver={dragOver}
          onDrop={drop}
        >
          <div className="heading">
            <div className="title">BACKUP</div>
          </div>
        </div>
      </div>
      <p> 2022 Designed and coded by Joanna Zhong </p>
    </div>
  );
};

export default App;
