import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Progress from "./Progress/Progress";
import AchievementList from "./AchievementList/AchievementList";
import Health from "./Health/Health";
import Community from "./Community/Community";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabList({ achievements }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            width: "100%",
            "& .MuiTabs-flexContainer": {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              width: "100%",
            },
            "& .MuiTab-root": {
              minWidth: 0,
              width: "100%",
              padding: 2,
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                color: "primary.main",
                borderRadius: 1,
              },
            },
          }}
        >
          <Tab label="Tiến trình" {...a11yProps(0)} />
          <Tab label="Thành tích" {...a11yProps(1)} />
          <Tab label="Sức khoẻ" {...a11yProps(2)} />
          <Tab label="Cộng đồng" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Progress />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AchievementList achievements={achievements} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Health />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Community />
      </CustomTabPanel>
    </Box>
  );
}
