import { AppBar, Button, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


export default function StudentNavbar() {
    const { pathname } = useLocation();

    const navItems =
        [
            {
                title: 'Quizzes',
                path: '/publishedquizz',
                isActive: (p: string) =>
                    p.startsWith("/publishedquizz") || p.startsWith("/student/quizzes"),
            },
            {
                title: 'Categories',
                path: '/student/categories',
                isActive: (p: string) => p.startsWith("/student/categories"),
            }
        ];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>Quizzer</Typography>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    {navItems.map((item) => {
                        const active = item.isActive(pathname);
                        return (
                            <Button
                                key={item.title}
                                color="inherit"
                                component={RouterLink}
                                to={item.path}
                                className={`nav-link ${active ? "active" : ""}`}
                            >{item.title}
                            </Button>
                        );
                    })}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        aria-label="open navigation menu"
                        aria-controls="navbar-menu"
                        aria-expanded={Boolean(anchorElNav)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="navbar-menu"
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        {navItems.map((item) => {
                            const active = item.isActive(pathname);
                            return (
                                <MenuItem
                                    key={item.title}
                                    component={RouterLink}
                                    to={item.path}
                                    onClick={handleCloseNavMenu}
                                    className={`nav-menu-item ${active ? "active" : ""}`}
                                >
                                    <Typography className="nav-menu-text">
                                        {item.title}
                                    </Typography>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}