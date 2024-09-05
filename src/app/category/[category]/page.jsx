"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import MiniDrawer from "../../navbar/page.jsx";
import "./style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";


const FilmsByCategory = () => {
  const { category } = useParams(); // Récupère le slug de la catégorie à partir de l'URL
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      if (!category) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:1337/api/films?filters[category][Slug][$eq]=${category}&pagination[page]=${
            page + 1
          }&pagination[pageSize]=${rowsPerPage}`,
          {
            headers: {
              Authorization: `Bearer 2a6b1b8886327778865c2537b7f470617f5868d8b84f10725cade7e938a49fd61c717c9e3fc38b9fc3868213267dba85ff342dec042a44d1a04998e3871d7b454d053010f72cbabc753e50117888de5ec4df0a3f41cea99b7e71fb8524b48898e026a4968b11b9f4df5cc58a2f96f9baaac1ca6069210964f7b585448d044ebe`,
            },
          }
        );
        setFilms(response.data.data);
        setTotalPages(response.data.meta.pagination.pageCount);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Erreur lors de la récupération des films."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [category, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return (
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
  if (error) return <Typography>{error}</Typography>;

  return (
    <>
      <MiniDrawer>
        <Typography variant="h4" gutterBottom>
          Films de la catégorie : {category}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Durée (min)</TableCell>
                <TableCell>Date de sortie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {films.length > 0 ? (
                films.map((film) => (
                  <TableRow key={film.id}>
                    <TableCell>{film.attributes.Titre}</TableCell>
                    <TableCell>{film.attributes.Description}</TableCell>
                    <TableCell>{film.attributes.duration}</TableCell>
                    <TableCell>
                      {new Date(
                        film.attributes.release_date
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>Aucun film trouvé</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalPages * rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </MiniDrawer>
    </>
  );
};

export default FilmsByCategory;
