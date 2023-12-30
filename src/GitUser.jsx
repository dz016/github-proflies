import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useState } from "react";
const GitUser = () => {
  const [validuser, setValidUser] = useState(true);
  const [close, setClose] = useState(true);
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const APIURL = "https://api.github.com/users/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("dawood");
      // Make your Axios request here
      const res = await axios.get(APIURL + text);
      setData(res.data);
      setClose((prev) => !prev);
      setValidUser(true);
    } catch (err) {
      console.error("Error:", err);

      setValidUser(false);
    }
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: "primary", height: "100vh" }}
      >
        <Typography variant="h1" color="primary" textAlign={"center"}>
          Hello
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => {
              e.preventDefault();
              setText(e.target.value);
            }}
            id="Username"
            label="Username"
            variant="filled"
            sx={{ marginBottom: "1rem" }}
            color="primary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="primary" />
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>

        {!close && validuser && (
          <Card sx={{ maxWidth: "70%", marginTop: "1rem" }}>
            <CardHeader
              avatar={
                <Avatar alt="Remy Sharp" src={`${data?.avatar_url}`}></Avatar>
              }
              action={
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    setClose((prev) => !prev);
                  }}
                  aria-label="settings"
                >
                  <CancelOutlinedIcon></CancelOutlinedIcon>
                </IconButton>
              }
              title={`${data?.login}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {`${data?.bio}`}
              </Typography>
              <List sx={{ display: "flex" }}>
                <ListItem>
                  <ListItemText>{`${data?.followers}`} followers</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {" "}
                    {`${data?.following}`} <br /> following
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {`${data?.public_repos}`} <br></br>repos
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}
        {!validuser && (
          <Typography sx={{ color: "red" }}>No valid user</Typography>
        )}
      </Container>
    </>
  );
};

export default GitUser;
