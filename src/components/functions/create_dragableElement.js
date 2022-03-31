const create_dragableElement = (id_num) => {
  let item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute("id", "item-" + id_num); //id = 'item-' + order;
  item.setAttribute("draggable", "true"); //  draggable = true;
  item.addEventListener("dblclick", () => {
    item.remove();
  });
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text", event.target.id);
  });
  // item.addEventListener("dragend", (event) => {
  //   // event.dataTransfer.clearData();
  // });
  return item;
};
export default create_dragableElement;
