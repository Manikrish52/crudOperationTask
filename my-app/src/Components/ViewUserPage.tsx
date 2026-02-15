import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { userFormFields } from "./config/userFormConfig";


const ViewUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) return null;

  const { users } = userContext;
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <div>User not found</div>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          {userFormFields.map((field) => (
            <Box key={field.name}>
              <Typography variant="subtitle2" color="text.secondary">
                {field.label}
              </Typography>
              
              <Typography variant="body1">{user[field.name]}</Typography>
            </Box>
          ))}
        </Box>

        <Box mt={4}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewUserPage;
