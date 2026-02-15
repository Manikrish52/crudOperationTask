import { Container, Typography, Paper, Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import UserForm from "./UserForm";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!userContext) return null;

  const { users, updateUser } = userContext;
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <div>User not found</div>;

  const handleUpdate = (data: any) => {
    updateUser({ ...data, id: user.id });
    setSnackbarOpen(true);
  };

  // Fix: Proper typing for Snackbar onClose
  const handleSnackbarClose = (
  event: React.SyntheticEvent<any, Event> | Event,
  reason: SnackbarCloseReason
) => {

    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    navigate("/"); // Navigate after closing snackbar
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Edit User
        </Typography>

        <UserForm initialValues={user} onSubmit={handleUpdate} />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="success"
            sx={{ width: "100%" }}
          >
            User edited successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default EditUserPage;
