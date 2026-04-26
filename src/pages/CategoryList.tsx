import type { Category } from "../types/quiz";
import { useState, useEffect } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { deleteCategory, fetchCategoriesWithAuth } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./CategoryList.css";

export default function CategoryList() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
        { field: "description", headerName: "Description", flex: 2, minWidth: 300, },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params: GridRenderCellParams) =>
                <IconButton
                    aria-label="delete category"
                    onClick={() => handleDelete(params.row.id as number)}
                    color="error"
                    size="small"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
        }
    ]


    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(id)
                .then(() => {
                    setCategories((prev) => prev.filter((c) => c.id !== id));
                })
                .catch(err => {
                    console.error(err);
                    alert("Error when deleting category!");
                });
        }
    }

    useEffect(() => {
        fetchCategoriesWithAuth()
            .then(data => setCategories(data))
            .catch((err) => {
                console.error("Failed to fetch categories:", err);
                alert("Failed to load categories.");
            });
    }, []);

    return (
        <Box className="category-page">
            <Box className="category-header">
                <h2 >
                    Category Management
                </h2>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate("/categories/new")}
                    sx={{ mt: 1 }}
                >
                    Add category
                </Button>
            </Box>
            <Box className="category-grid-wrap">
                <DataGrid
                    rows={categories}
                    columns={columns}
                    getRowId={row => row.id} 
                    autoPageSize
                    rowSelection={false}
                    disableColumnMenu 
                />
            </Box>
        </Box>
    );
}