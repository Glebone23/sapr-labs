import { Box, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";

export function Home() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper sx={{ width: 600 }}>
                <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#/lab1">
                    <ListItemText primary="Лабораторна робота №1" secondary="Метод зворотного розміщення елементів" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#/lab2">
                    <ListItemText primary="Лабораторна робота №2" secondary="Дослідження алгоритму розміщення методом попарної перестановки" />
                    </ListItemButton>
                </ListItem>
                </List>
            </Paper>
        </Box>
    );
}