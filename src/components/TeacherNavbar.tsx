import { AppBar, Button, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const navItems = [
    {
        title: 'Quizzes',
        path: '/',
        isActive: (pathname: string) =>
            pathname === "/" ||
            pathname.startsWith("/quizzes") ||
            pathname.startsWith("/create-quiz") ||
            pathname.startsWith("/questions"),
    },
    {
        title: 'Categories',
        path: '/categories',
        isActive: (pathname: string) => pathname.startsWith("/categories"),
    }
];

export default function TeacherNavbar() {
    const { pathname } = useLocation();
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
                            >{item.title}</Button>
                        );
                    })}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton onClick={handleOpenNavMenu} color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Menu
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
                                    className={`nav-menu-item ${active ? "active" : ""}`}
                                    onClick={handleCloseNavMenu}
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