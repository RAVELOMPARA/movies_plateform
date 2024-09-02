"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importer Image de Next.js
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress, // Importer CircularProgress pour l'indicateur de chargement
} from "@mui/material";
import "./style.css"; // Import du fichier CSS
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // État pour le champ de confirmation
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // État pour le chargement
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true); // Démarrer le chargement

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      const { jwt } = response.data;
      localStorage.setItem("token", jwt); // Sauvegarde du token JWT dans le localStorage

      // Redirection vers la page de connexion après inscription
      router.push("/login");
    } catch (err) {
      setError(
        "Échec de l'inscription. Veuillez vérifier les informations fournies."
      );
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <Card className="mb-3" style={{ maxWidth: "900px", width: "100%" }}>
        <Grid container>
          <Grid item lg={4} className="d-none d-lg-flex">
            <Image
              src="/images/web-design-3411373_1920.jpg"
              alt="Design"
              width={700} // Spécifiez la largeur de l'image
              height={500} // Spécifiez la hauteur de l'image
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </Grid>
          <Grid item lg={8}>
            <CardContent className="py-5 px-md-5">
              <form onSubmit={handleRegister}>
                <Typography variant="h3" align="center" gutterBottom>
                  Register
                </Typography>
                {error && <Typography color="error">{error}</Typography>}

                {/* Username input */}
                <TextField
                  id="username"
                  label="Username"
                  variant="filled"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />

                {/* Email input */}
                <TextField
                  id="email"
                  label="Email address"
                  variant="filled"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />

                {/* Password input */}
                <TextField
                  id="password"
                  label="Password"
                  variant="filled"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />

                {/* Confirm Password input */}
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />

                {/* 2 column grid layout for inline styling */}
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} container justifyContent="center">
                    {/* Checkbox */}
                    <FormControlLabel
                      control={<Checkbox id="agree" />}
                      label="I agree to the terms and conditions"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} container justifyContent="flex-end">
                    {/* Simple link */}
                    <Link href="/login">Already have an account?</Link>
                  </Grid>
                </Grid>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem" }}
                  disabled={loading} // Désactiver le bouton pendant le chargement
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}{" "}
                  {/* Afficher le spinner ou le texte */}
                </Button>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </section>
  );
}
