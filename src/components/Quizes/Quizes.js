import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
import styles from "./Quizes.module.css";
import ChipInput from "material-ui-chip-input";
import {
  AppBar,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./style";
import { getQuizesBySearch } from "../../actions/quiz";
import Pagination from "../Pagination/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Quizes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { quizes, isLoading } = useSelector((state) => state.quiz);
  const isLanguageEnglish = true;
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  console.log("quizes", quizes);

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  if (!localStorage.getItem("user")) history.push("/");

  const searchPost = () => {
    if (search.trim() !== "" || tags.length !== 0) {
      console.log(search.trim());
      dispatch(getQuizesBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/quizes/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/quizes");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className={styles["quizes-list"]}>
      <AppBar
        className={classes.appBarSearch}
        position="static"
        color="inherit"
        style={{ width: "50%" }}
      >
        <TextField
          onKeyDown={handleKeyPress}
          name="search"
          variant="outlined"
          label={
            isLanguageEnglish
              ? "Search presentation by name"
              : "Szukaj quizów po nazwie"
          }
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChipInput
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label={
            isLanguageEnglish
              ? "Search presentation by tags"
              : "Szukaj quizów po kategoriach"
          }
          variant="outlined"
        />
        <Button
          onClick={searchPost}
          className={classes.searchButton}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#F9F871" }}
        >
          {isLanguageEnglish ? "Search" : "Szukaj"}
        </Button>
      </AppBar>
      {isLoading ? (
        <CircularProgress />
      ) : (
        quizes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)
      )}
      {!searchQuery && !tags.length && (
        <Paper className={classes.pagination} elevation={6}>
          <Pagination page={page} />
        </Paper>
      )}
    </div>
  );
}
