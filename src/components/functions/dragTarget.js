const dragOver = (ev) => {
  ev.preventDefault();
};

const drop = (event) => {
  //   const droppedItem = ev.dataTransfer.getData("drag-item");

  //   if (droppedItem) {
  //     props.onItemDropped(droppedItem);
  //   }

  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(id));
};

export { dragOver, drop };
