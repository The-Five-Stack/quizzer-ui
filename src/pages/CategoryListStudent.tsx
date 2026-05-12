import type { Category } from "../types/quiz";
import { useState, useEffect } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { fetchCategoriesWithAuth } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

export default function CategoryListStudent() {
    const [categories, setCategories] = useState<Category[]>([]);

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <Link
                    to={`/student/categories/${params.id}/published-quizzes`}
                    style={{
                        color: "#1976d2", 
                        textDecoration: "underline", 
                        fontWeight: "500", 
                        cursor: "pointer"
                    }}
                    state={{ categoryName: params.value }}
                >
                    {params.value}
                </Link>
            )
        },
        { 
            field: "description", 
            headerName: "Description", 
            flex: 2, 
            minWidth: 300,
            renderCell: (p) => (
                <Box
                    sx={{
                        whiteSpace: 'normal',
                        lineHeight: 1.5,
                        padding: '12px 8px',
                        maxHeight: '50px',   
                        overflow: 'auto',
                    }}
                >
                    {p.value || '-'}
                </Box>
            )
         }
    ]

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
                <div className="category-header-title">
                    <h2 >Student Categories</h2>
                </div>
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