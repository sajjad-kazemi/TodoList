import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Paper,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import { MoreVert, Add } from "@mui/icons-material";

const testList = [
  {
    id: "1",
    text: "doing the dishes",
    done: false,
  },
  {
    id: "2",
    text: "testing todo list",
    done: false,
  },
  {
    id: "3",
    text: "hidden history or not",
    done: true,
  },
  {
    id: "4",
    text: "drag and drop library",
    done: false,
  },
  {
    id: "5",
    text: "lorem ipsum test text",
    done: false,
  },
];

function Body() {
  const { t } = useTranslation();
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
      <Paper sx={{ px: 3, py: 2, minWidth: "80%" }}>
        <TextField
          variant="outlined"
          sx={{
            width: "100%",
            px: 0,
            "& input": { px: 0, mx: 1 },
            "&>div": { px: 0, alignItems: "stretch" },
          }}
          placeholder={t("addAction")}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ alignSelf: "center" }}>
                <Add color="primary" />
              </IconButton>
            ),
            startAdornment: (
                <Menu/>
            ),
          }}
        />
        <ul>
          {testList.map((item) => {
            return (
              <li key={item.id} style={{ width: "400px" }}>
                {item.text}
              </li>
            );
          })}
        </ul>
      </Paper>
    </Container>
  );
}


function Menu() {
  return (
    <>
      <Button
        sx={{
          bgcolor: "secondary.main",
          height: "auto",
          my: 0,
          mx: 0,
          p: 0,
          boxShadow: "none",
          "&:hover": { bgcolor: "secondary.light", boxShadow: "none" },
        }}
        color="secondary"
        variant="contained"
      >
        <MoreVert color="primary" />
      </Button>
      <Divider orientation="vertical" />
    </>
  );
}


export default Body;