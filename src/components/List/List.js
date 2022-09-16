import {Box,Typography} from '@mui/material'

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

function List() {
  return (
    <>
      {testList.map(item=>(
        <Box key={item.id}>
          {item.text}
        </Box>
      ))}
    </>
  )
}

export default List