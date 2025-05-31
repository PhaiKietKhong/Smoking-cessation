import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Container, Typography } from "@mui/material";
import { AnimatedProgress, BotToTop } from "../Animations/animations";
import TimelineIcon from "@mui/icons-material/Timeline";
function Statistical() {
  function Progress({ timneline, target, duration, effect }) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mx: "auto",
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {timneline}
          </Typography>
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {target}%
          </Typography>
        </Box>
        <AnimatedProgress target={target} duration={duration} />
        <Typography
          sx={{
            color: "primary.light",
            typography: {
              xs: "body2",
              md: "body1",
            },
          }}
        >
          {effect}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
      }}
    >
      <Container maxWidth="lg">
        <BotToTop>
          <Box sx={{ display: "flex", justifyContent: "space-around", py: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GroupsIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                    color: "primary.light",
                  }}
                />
                <Typography
                  sx={{
                    typography: {
                      xs: "subtitle1",
                      md: "h4",
                    },
                    fontWeight: 800, // Changed from fontSize to fontWeight
                    color: "primary.light",
                  }}
                >
                  13422 +
                </Typography>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  typography: {
                    xs: "body2",
                    md: "body1",
                  },
                  color: "primary.light",
                }}
              >
                People Quit Smoking
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                    color: "primary.light",
                  }}
                />
                <Typography
                  sx={{
                    typography: {
                      xs: "subtitle1",
                      md: "h4",
                    },
                    fontSize: "bolder",
                    color: "primary.light",
                  }}
                >
                  94%
                </Typography>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",

                  typography: {
                    xs: "body2",
                    md: "body1",
                  },
                  color: "primary.light",
                }}
              >
                Success Rate
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SchoolIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                    color: "primary.light",
                  }}
                />
                <Typography
                  sx={{
                    textAlign: "center",

                    typography: {
                      xs: "subtitle1",
                      md: "h4",
                    },
                    fontSize: "bolder",
                    color: "primary.light",
                  }}
                >
                  30 Days
                </Typography>
              </Box>
              <Typography
                sx={{
                  typography: {
                    xs: "body2",
                    md: "body1",
                  },
                  color: "primary.light",
                }}
              >
                Average Time to Quit
              </Typography>
            </Box>
          </Box>
        </BotToTop>

        {/*progress */}
        <Box>
          {/*title */}
          <BotToTop>
            <Box>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "white", fontWeight: 800 }}
              >
                Your Health Recovery Timeline
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "primary.light",
                mt: 1,
                mb: 2,
              }}
            >
              Watch your body heal itself after quitting smoking
            </Typography>
          </BotToTop>

          {/*progress */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Progress
              timneline={"20 minutes"}
              target={10}
              duration={1000}
              effect={"Blood pressure and pulse rate return to normal"}
            />
            <Progress
              timneline={"24 Hours"}
              target={25}
              duration={1000}
              effect={"Carbon monoxide is eliminated from the body"}
            />
            <Progress
              timneline={"48 Hours"}
              target={40}
              duration={1000}
              effect={"Sense of taste and smell improve"}
            />
            <Progress
              timneline={"2-3 Months"}
              target={60}
              duration={1000}
              effect={"Circulation improves and lung function increases"}
            />
            <Progress
              timneline={"1 Year"}
              target={80}
              duration={1000}
              effect={"Risk of heart disease drops by half"}
            />
            <Progress
              timneline={"10 Years"}
              target={100}
              duration={1000}
              effect={"Lung cancer risk drops to half that of a smoker"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Statistical;
