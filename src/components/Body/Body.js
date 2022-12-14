import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { DoneAll, Delete, AutoDelete, RemoveDone } from "@mui/icons-material";
import { MoreVert, Add } from "@mui/icons-material";
import List from "../List/List";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  localStorageUpdate,
  deleteAll,
  doneAll,
  undoneAll,
  clearHistory,
  getFirstTodo
} from "../../features/infoSlice/infoSlice";

function Body() {
  const Theme = JSON.parse(localStorage.getItem("theme"));
  const [colorListPlace, setColorListPlace] = useState(1);
  const firstTodo = useSelector(getFirstTodo)
  const { t } = useTranslation();
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const [firstAdd, setFirstAdd] = useState(true);
  const AddTodo = (e) => {
    let placeNumber = colorListPlace
    if(e) {
      e.currentTarget.previousSibling.focus()
    }
    if (todoInput === "") return;
    if(firstTodo && firstAdd){
      const nextNumber = +firstTodo.color.split('.')[1]+1
      if(nextNumber !== 6 ) {
        placeNumber = nextNumber
      }else{
        placeNumber = 1
      }
    }
    dispatch(addTodo({text:todoInput,color:'colorList.'+placeNumber}));
    dispatch(localStorageUpdate())
    setTodoInput("")
    if(placeNumber !== 5){
      placeNumber++
    }else{
      placeNumber = 1
    }
    setFirstAdd(false)
    setColorListPlace(placeNumber)
  };

  const handleSubmit = (e) => {
    if (e.key !== "Enter") return;
    AddTodo();
  };

  return (
    <Container
      fixed
      sx={{
        my: 5,
        px: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          px: 3,
          py: 2,
          mb: 4,
          mt: 1,
          width: "90%",
          borderRadius: "10px",
          bgcolor:
            (Theme === "dark" && "secondary.secondary") ||
            "secondary.secondary",
          color: (Theme === "dark" && "secondary.negative") || "text.main",
        }}
      >
        <TextField
          tabIndex={0}
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.currentTarget.value);
          }}
          onKeyDown={handleSubmit}
          variant="outlined"
          color="secondary"
          sx={{
            width: "100%",
            px: 0,
            borderRadius: "6px",
            textAlign: "auto",
            "&:hover": { border: "none" },
            "& input": { px: 1 },
            "&>div": { px: 0, alignItems: "stretch" },
          }}
          placeholder={t("addAction")}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={AddTodo}
                title={t("addAction")}
                sx={{ alignSelf: "center", mx: 1 }}
              >
                <Add color="primary" />
              </IconButton>
            ),
            startAdornment: <Menu Theme={Theme} />,
          }}
        />
        <List />
      </Paper>
    </Container>
  );
}

function Menu({ Theme }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleActions = (Action) => {
    handleClose();
    Action();
    dispatch(localStorageUpdate());
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "secondary.main",
          height: "auto",
          my: 0,
          mx: 0,
          p: 0,
          boxShadow: "none",
          "&:hover": {
            bgcolor:
              (Theme === "dark" && "secondary.negative") ||
              "secondary.secondary",
            boxShadow: "none",
          },
        }}
        color="secondary"
        variant="contained"
      >
        <MoreVert color="primary" />
      </Button>
      <MuiMenu
        sx={{ filter: "brightness(90%)" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { bgcolor: "secondary.secondary" },
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={() => handleActions(() => dispatch(doneAll()))}>
          <ListItemIcon>
            <DoneAll />
          </ListItemIcon>
          <ListItemText>{t("doneAll")}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleActions(() => dispatch(undoneAll()))}>
          <ListItemIcon>
            <RemoveDone />
          </ListItemIcon>
          <ListItemText>{t("undoneAll")}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleActions(() => dispatch(clearHistory()))}>
          <ListItemIcon>
            <AutoDelete />
          </ListItemIcon>
          <ListItemText>{t("clearHistory")}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleActions(() => dispatch(deleteAll()))}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>{t("deleteAll")}</ListItemText>
        </MenuItem>
      </MuiMenu>
    </>
  );
}

export default Body;
