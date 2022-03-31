import create_dragableElement from "./create_dragableElement";

const create_item = (order, setOrder, setAdding, error) => {
  let item = create_dragableElement(order);
  let input = document.createElement("input");

  input.addEventListener("keydown", (e) => {
    error.innerText = "";
    if (e.key === "Enter") {
      if (input.value !== "") {
        setOrder((prev) => prev + 1);
        item.innerHTML = input.value;
        setAdding(false);
      } else {
        return;
      }
    }
  });
  item.appendChild(input);

  let save_btn = document.createElement("button");
  save_btn.innerHTML = "Save";
  save_btn.addEventListener("click", () => {
    error.innerText = "";
    if (input.value !== "") {
      setOrder((prev) => prev + 1);
      item.innerHTML = input.value;
      setAdding(false);
    } else {
      error.innerHTML = "Please add a description.";
    }
    console.log("order: " + order);
  });
  item.appendChild(save_btn);

  return item;
};
export default create_item;
