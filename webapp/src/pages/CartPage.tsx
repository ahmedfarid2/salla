import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";

const CartPage = () => {
  const {cartItems, totalAmount} = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};

export default CartPage;
