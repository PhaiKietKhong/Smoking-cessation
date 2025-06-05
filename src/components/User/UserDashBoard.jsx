import { Box, Container } from "@mui/material";
import React from "react";
import Header from "./Header/Hearder";
import QuickStat from "./QuickStat.jsx/QuickStat";
import TabList from "./TabList/TabList";
function UserDashBoard() {
  return (
    <Box>
      {/*Header */}
      <Header />

      <Box sx={{ px: 6 }}>
        <QuickStat />
        <TabList />
      </Box>
    </Box>
  );
}

export default UserDashBoard;
