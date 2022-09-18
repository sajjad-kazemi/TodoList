import {
  Box,
  Typography,
  List as MuiList,
  ListItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  localStorageUpdate,
  changeOrder,
  deleteTodo,
  doneTodo,
} from "../../features/infoSlice/infoSlice";
import { DragIndicator, DeleteOutline } from "@mui/icons-material";
import { useId } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColorList from './ColorList'


function List() {
  const uniqueId = useId();
  const todoList = useSelector(getTodoList);
  const dispatch = useDispatch();

  const updateLS = () => {
    dispatch(localStorageUpdate());
  };

  const handleOrderChange = (result) => {
    if (!result.destination) return;
    const items = [...todoList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeOrder(items));
    updateLS();
  };

  const handleDone = (e) => {
    const id =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement.id.split(
        "-id:"
      )[1];
    dispatch(doneTodo(id));
    updateLS();
  };

  const handleRemove = (e) => {
    const id = +e.currentTarget.parentElement.parentElement.id.split("-id:")[1];
    dispatch(deleteTodo(id));
    updateLS();
  };

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
                  <Box
                    sx={{ filter: item.done && "brightness(70%)",textDecoration:item.done && 'line-through',textDecorationColor:'text.secondary' }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <ListItem
                      id={`${uniqueId}-id:${item.id}`}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderRadius: "6px",
                        my: 1,
                        bgcolor: item.color || "colorList.1",
                        color: (item.done && "text.secondary") || "text.main",
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
                              "&:active , &:hover": {
                                color: "secondary.secondary",
                              },
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
                      <Box sx={{display:'flex',flexDirection:'row'}}>
                        <IconButton
                          sx={{ color: "primary.main" }}
                          disableRipple
                          onClick={handleRemove}
                        >
                          <DeleteOutline />
                        </IconButton>
                        <ColorList Item={item} />
                      </Box>
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
