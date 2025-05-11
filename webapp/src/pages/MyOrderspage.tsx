import Container from "@mui/material/Container";
import { useAuth } from "../context/Auth/AuthContext";
import { use, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MyOrdersPage = () => {
  const { fetchMyOrders, myOrders } = useAuth();

  useEffect(() => {
    fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>

      {myOrders.map(({ address, items, total }) => (
        <Box
          sx={{ border: 1, borderColor: "gray", borderRadius: 2, padding: 1 }}
        >
          <Typography>Address: {address}</Typography>
          <Typography>Items: {items.length}</Typography>
          <Typography>Total: {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
