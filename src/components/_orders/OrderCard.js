import { Icon } from "@iconify/react";
import androidFilled from "@iconify/icons-ant-design/android-filled";
// material
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography, Button, Box } from "@material-ui/core";
import Popup from "./popup";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function OrderCard({ itemName, quantity, id, community, getItems }) {
  return (
    <RootStyle>
      <Box>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          {itemName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Qty: {quantity}
        </Typography>
      </Box>
      <Box mt={2}>
        <Popup community={community} id={id} itemName={itemName} getItems={getItems}/>
      </Box>
    </RootStyle>
  );
}
