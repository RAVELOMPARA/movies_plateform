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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Ajout d'état pour la case à cocher
  const [loading, setLoading] = useState(false); // État pour le chargement
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Démarrer le chargement

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );

      const { jwt } = response.data;
      document.cookie = `token=${jwt}; path=/`; // Sauvegarde du token JWT dans un cookie

      // Redirection vers une autre page après connexion
      router.push("/home"); // Assurez-vous que cette route existe
    } catch (err) {
      console.error(err);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
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
              <form onSubmit={handleLogin}>
                <Typography variant="h3" align="center" gutterBottom>
                  Login Here
                </Typography>
                {error && <Typography color="error">{error}</Typography>}

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

                {/* 2 column grid layout for inline styling */}
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} container justifyContent="center">
                    {/* Checkbox */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} container justifyContent="flex-end">
                    {/* Simple link */}
                    <Link href="/register">Create an account</Link>
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
                  {loading ? <CircularProgress size={24} /> : "Sign in"}{" "}
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
