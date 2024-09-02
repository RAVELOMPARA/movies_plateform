"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  boxShadow: theme.shadows[5],
}));

const FilmForm = () => {
  const [Titre, setTitre] = useState("");
  const [Description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        Titre,
        Description,
        duration,
        release_date: releaseDate,
        genre,
      })
    );
    if (image) {
      formData.append("files.image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/api/films", // Remplacez par l'URL correcte
        formData,
        {
          headers: {
            Authorization: `Bearer 2a6b1b8886327778865c2537b7f470617f5868d8b84f10725cade7e938a49fd61c717c9e3fc38b9fc3868213267dba85ff342dec042a44d1a04998e3871d7b454d053010f72cbabc753e50117888de5ec4df0a3f41cea99b7e71fb8524b48898e026a4968b11b9f4df5cc58a2f96f9baaac1ca6069210964f7b585448d044ebe`, // Remplacez par votre token API
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Film ajouté avec succès !");
      console.log("Film ajouté avec succès :", response.data);
      // Réinitialisez le formulaire ou faites autre chose
      setTitre("");
      setDescription("");
      setDuration("");
      setReleaseDate("");
      setGenre("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du film :", error);
      setError("Erreur lors de l'ajout du film.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Ajouter un Film
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Titre"
                variant="outlined"
                fullWidth
                value={Titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Durée (en minutes)"
                variant="outlined"
                type="number"
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date de sortie"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Genre"
                variant="outlined"
                fullWidth
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Typography color="success">{success}</Typography>
              </Grid>
            )}
            {loading && (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Ajouter"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </StyledCard>
  );
};

export default FilmForm;
