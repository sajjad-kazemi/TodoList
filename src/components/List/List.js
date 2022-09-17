import {
  Box,
  Typography,
  List as MuiList,
  ListItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  localStorageUpdate,
  changeOrder,
  deleteTodo,
  doneTodo
} from "../../features/infoSlice/infoSlice";
import { DragIndicator } from "@mui/icons-material";
import { useId, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function List() {
  const uniqueId = useId();
  const todoList = useSelector(getTodoList);
  const dispatch = useDispatch();

  const updateLS = () => {
    dispatch(localStorageUpdate());
  };

  const handleRemove = (e) => {
    const id = 0
    dispatch(deleteTodo(id))
  }

  const handleOrderChange = (result) => {
    if(!result.destination) return
    const items = [...todoList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeOrder(items));
    updateLS();
  };

  const handleDone = (e)=>{
    const id = e.target.parentElement.parentElement.parentElement.parentElement.id.split('-id:')[1]
    dispatch(doneTodo(id))
  }

  return (
    <DragDropContext onDragEnd={handleOrderChange}>
      <Droppable droppableId="TodoList">
        {(provided) => (
          <MuiList {...provided.droppableProps} ref={provided.innerRef}>
            {todoList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
              >
                {(provided) => (
                  <Box {...provided.draggableProps} ref={provided.innerRef}>
                    <ListItem
                      id={`${uniqueId}-id:${item.id}`}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderRadius: "6px",
                        my: 1,
                        bgcolor: item.color || "#eee",
                        color: "text.main",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{ display: "flex" }}
                          {...provided.dragHandleProps}
                        >
                          <DragIndicator
                            sx={{
                              justifySelf: "flex-start",
                              filter: "brightness(90%)",
                              '&:active , &:hover':{color:'secondary.negative'}
                            }}
                          />
                        </span>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleDone}
                              checked={item.done}
                              sx={{ "& svg": { color: "text.main" } }}
                              disableRipple
                              color="secondary"
                              size="small"
                            />
                          }
                          label={
                            <Typography sx={{ justifySelf: "center" }}>
                              {item.text}
                            </Typography>
                          }
                        />
                      </Box>
                      <Box>options!!</Box>
                    </ListItem>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </MuiList>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
