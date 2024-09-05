"use client";
import React, { useState, useEffect } from "react";
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
  const [category, setCategory] = useState(""); // État pour la catégorie sélectionnée
  const [categories, setCategories] = useState([]); // État pour stocker les catégories récupérées
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Utilisez useEffect pour récupérer les catégories depuis Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/categories",
          {
            headers: {
              Authorization: `Bearer  2a6b1b8886327778865c2537b7f470617f5868d8b84f10725cade7e938a49fd61c717c9e3fc38b9fc3868213267dba85ff342dec042a44d1a04998e3871d7b454d053010f72cbabc753e50117888de5ec4df0a3f41cea99b7e71fb8524b48898e026a4968b11b9f4df5cc58a2f96f9baaac1ca6069210964f7b585448d044ebe`, // Remplacez par votre token API
            },
          }
        );
        setCategories(response.data.data); // Mettez à jour l'état avec les catégories récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setError("Erreur lors de la récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);

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
        category, // Inclure la catégorie sélectionnée dans la requête
      })
    );
    if (image) {
      formData.append("files.image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/api/films",
        formData,
        {
          headers: {
            Authorization: `Bearer  2a6b1b8886327778865c2537b7f470617f5868d8b84f10725cade7e938a49fd61c717c9e3fc38b9fc3868213267dba85ff342dec042a44d1a04998e3871d7b454d053010f72cbabc753e50117888de5ec4df0a3f41cea99b7e71fb8524b48898e026a4968b11b9f4df5cc58a2f96f9baaac1ca6069210964f7b585448d044ebe`, // Remplacez par votre token API
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Film ajouté avec succès !");
      setTitre("");
      setDescription("");
      setDuration("");
      setReleaseDate("");
      setGenre("");
      setCategory(""); // Réinitialiser la catégorie
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
          Ajouter un nouveau film
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
              <TextField
                select
                label=""
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                InputProps={{
                  style: {
                    color: "black",
                  },
                }}
              >
                <option
                  value=""
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  Sélectionner une catégorie
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    style={{
                      color: "black !important",
                      backgroundColor: "green !important",
                    }}
                  >
                      {cat.attributes.nom}
                    
                  </option>
                ))}
              </TextField>
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
