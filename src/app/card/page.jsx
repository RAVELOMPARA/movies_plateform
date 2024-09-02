"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Grid from "@mui/material/Grid"; // Importez Grid
import "./style.css";
import CommentIcon from "@mui/icons-material/Comment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

const CardContenu = () => {
  const [films, setFilms] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/films", // Remplacez par l'URL correcte
          {
            headers: {
              Authorization: `Bearer 2a6b1b8886327778865c2537b7f470617f5868d8b84f10725cade7e938a49fd61c717c9e3fc38b9fc3868213267dba85ff342dec042a44d1a04998e3871d7b454d053010f72cbabc753e50117888de5ec4df0a3f41cea99b7e71fb8524b48898e026a4968b11b9f4df5cc58a2f96f9baaac1ca6069210964f7b585448d044ebe`,
            },
          }
        );
        setFilms(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchFilms();
  }, []);

  if (!films.length) {
    return (
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      {" "}
      {/* Utilisez Grid container */}
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={4} key={film.id}>
          {" "}
          {/* Définir la taille pour différents écrans */}
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={film.attributes?.Titre || "Titre"}
              subheader={
                <>
                  <Typography variant="subtitle2">
                    Date de sortie :
                    {new Date(
                      film.attributes?.release_date
                    ).toLocaleDateString() || "Date de sortie"}
                  </Typography>
                </>
              }
            />
            <CardMedia
              component="img"
              height="194"
              image={
                film.attributes?.image?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${film.attributes.image.url}`
                  : "/images/cinema-2027080_1280.png"
              }
              alt={film.attributes?.Titre || "Image par défaut"}
            />
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>
                Durée: {film.attributes?.duration || "Inconnue"} mn
              </Typography>
              <Typography>
                Genre: {film.attributes?.genre || "Inconnu"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share" color="primary">
                <CommentIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {film.attributes?.Description ||
                    "Aucune description disponible."}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardContenu;
