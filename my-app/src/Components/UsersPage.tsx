import { useState, ChangeEvent, useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { UserContext } from "./UserContext";

const UsersPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [searchText, setSearchText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  if (!userContext) return null;

  const { users, deleteUser } = userContext;

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // When delete button is clicked (opens dialog)
  const handleDelete = (userId: number) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      deleteUser(selectedUserId);
      setSnackbarOpen(true);
    }
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  return (
    <Grid m={2}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Grid>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
        </Grid>

        <Grid>
          <Button
            sx={{ textTransform: "none", backgroundColor: "#d12f2ff2" }}
            variant="contained"
            onClick={() => navigate("/create")}
          >
            <AddCircleOutlineIcon />
            <Typography
              sx={{ textTransform: "none", ml: 1, fontWeight: "600" }}
            >
              Add User
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <UserTable
        users={filteredUsers}
        loading={false}
        onView={(user) => navigate(`/view/${user.id}`)}
        onEdit={(user) => navigate(`/edit/${user.id}`)}
        onDelete={handleDelete}
      />

      {/* Delete Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          User deleted successfully!
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UsersPage;
