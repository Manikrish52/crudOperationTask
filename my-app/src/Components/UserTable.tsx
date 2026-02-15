import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Skeleton,
} from "@mui/material";
import { User } from "./config/user";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

interface Props {
  users: User[];
  loading: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const SCROLL_BATCH = 10; 

const UserTable = ({ users, loading, onView, onEdit, onDelete }: Props) => {
  const [visibleUsers, setVisibleUsers] = React.useState<User[]>([]);
  const [loadingMore, setLoadingMore] = React.useState(false); 
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setVisibleUsers(users.slice(0, SCROLL_BATCH));
  }, [users]);

  // Handle scroll
  const handleScroll = () => {
    if (!containerRef.current || loadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      const nextBatch = users.slice(visibleUsers.length, visibleUsers.length + SCROLL_BATCH);
      if (nextBatch.length === 0) return;

      // Show loader
      setLoadingMore(true);

      setTimeout(() => {
        setVisibleUsers(prev => [...prev, ...nextBatch]);
        setLoadingMore(false);
      }, 800); 
    }
  };

  const navigate = useNavigate();



  return (
    <TableContainer
      ref={containerRef}
      onScroll={handleScroll}
      sx={{ mt: 2, maxHeight: 600, overflowY: "auto" }}
    >
      <Table stickyHeader
      className="Table_content"
       sx={{ 
      border: '1px solid black',       
      borderCollapse: 'collapse'       
    }} >
        <TableHead className="Table_header">
          <TableRow>
            <TableCell sx={{border:"1px solid black"}}>S.No</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {loading
            ? Array.from(new Array(SCROLL_BATCH)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              ))
            : visibleUsers.map((user) => (
                <TableRow key={user.id} >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button onClick={() => onView(user)}><VisibilityIcon /></Button>
                    <Button onClick={() => onEdit(user)}><EditOutlinedIcon /></Button>
                    <Button color="error" onClick={() => onDelete(user.id!)}><DeleteOutlineOutlinedIcon /></Button>
                  </TableCell>
                </TableRow>
              ))
          }

         {loadingMore && (
  <TableRow>
    <TableCell colSpan={6} sx={{ textAlign: "center", py: 2 }}>
      <CircularProgress />
    </TableCell>
  </TableRow>
)}


          {!loading && visibleUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center", py: 3 }}>
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default UserTable;
