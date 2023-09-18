import { useState } from "react";
import { DnDContextProvider } from "./DnD";
import { TestDraggableItem } from "./components/TestDraggableItem/TestDraggableItem";
import { TestDroppableArea } from "./components/TestDroppableArea/TestDroppableArea";
// import { closestCenter } from "./DnD/collision-detector";

function App() {
  const [dataItems] = useState<{ id: string; name: string }[]>([
    {
      id: "id1",
      name: "name 1",
    },
    {
      id: "id2",
      name: "name 2",
    },
    {
      id: "id3",
      name: "name 3",
    },
    {
      id: "id4",
      name: "name 4",
    },
  ]);

  return (
    <div className="flex justify-center mt-[4rem]">
      <DnDContextProvider
        eventListeners={{
          onDragStart(dragStartEvt) {
            console.log({ dragStartEvt });
          },
          onDragMove(dragMoveEvt) {
            console.log({ dragMoveEvt });
          },
          onDragOver(dragOverEvt) {
            console.log({ dragOverEvt });
          },
          onDragEnd(dragEndEvt) {
            console.log({ dragEndEvt });
          },
          onDragCancel(dragCancelEvt) {
            console.log({ dragCancelEvt });
          },
        }}
        // collisionDetector={closestCenter}
      >
        <div className="flex gap-[5rem]">
          <div className="">
            <h1>Drag one</h1>
            <ul className="border p-2 flex flex-col gap-4 min-h-[2rem]">
              {dataItems.map((item) => (
                <TestDraggableItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
          <div>
            <h2>Drop here 1</h2>
            <TestDroppableArea id={"TestDroppable 1"} />
            <h2>Drop here 2</h2>
            <TestDroppableArea id={"TestDroppable 2"} />
          </div>
        </div>
      </DnDContextProvider>
    </div>
  );
}

export default App;
