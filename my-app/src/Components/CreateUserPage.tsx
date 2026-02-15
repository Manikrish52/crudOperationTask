import { Container, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "./config/user";
import UserForm from "./UserForm";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (!userContext) return null;

  const { addUser } = userContext;

  const handleCreate = (data: User) => {
    addUser(data);
    setOpenSnackbar(true); // show success message
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
    navigate("/"); // navigate after closing the message
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>
        <UserForm onSubmit={handleCreate} />
      </Paper>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          User created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUserPage;
