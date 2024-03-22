import Task from "@/model/Task";
import { Draggable, Droppable } from "react-beautiful-dnd";


//declare column props
interface TaskColumnProps {
  col: { name: string; tasks: Task[] };
  onClickedTask: (index: number) => void;
  id: string;
}

//column colors
const colColors = [
  "bg-[#A5DD9B]",
  "bg-[#B784B7]",
  "bg-[#9BB8CD]",
  "bg-[#FF90BC]",
  "bg-[#739072]",
  "bg-[#FF8080]",
];

const TaskColumn: React.FC<TaskColumnProps> = ({ col, onClickedTask, id }) => {
  const doneSubtasksNumber = (task: Task) => {
    return task.subtasks.filter((el) => el.isCompleted).length;
  };

  return (
    <div className="w-[280px] shrink-0 h-full">
      <div className="flex mb-6">
        <div
          className={`w-4 h-4 ${
            colColors?.[parseInt(id)] ||
            colColors?.[parseInt(id) - colColors.length]
          } rounded-full inline-block mr-3`}
        ></div>
        <h4 className="text-[#9CAFAA]">
          {col.name} ({col.tasks.length})
        </h4>
      </div>
      <Droppable droppableId={`${id}`}>
        {(provided) => (
          <ul
            className="space-y-5 pb-6 "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {col.tasks.map((task, index) => (
              <Draggable
                draggableId={id + index.toString()}
                index={index}
                key={index}
              >
                {(provided, snapshot) => {
                  return (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <section
                        className="py-6 px-4 bg-[#C7C8CC] dark:bg-black2 rounded-lg shadow-task cursor-pointer border-[#7469B6]"
                        onClick={(e) => onClickedTask(index)}
                      >
                        <h3 className="mb-2">{task.title}</h3>
                        <p className="text-sm text-[#5C5470]  font-bold ">
                          {`${doneSubtasksNumber(task)} of ${
                            task.subtasks.length
                          } subtasks`}
                        </p>
                      </section>
                    </li>
                  );
                }}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
