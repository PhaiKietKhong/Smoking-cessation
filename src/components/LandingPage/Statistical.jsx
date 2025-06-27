import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Container, Typography } from "@mui/material";
import { AnimatedProgress, BotToTop } from "../Animations/animations";
import TimelineIcon from "@mui/icons-material/Timeline";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";

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
          fontFamily: "Be Vietnam Pro",
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
            fontFamily: "Be Vietnam Pro",
          }}
        >
          {effect}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "primary.dark", fontFamily: "Be Vietnam Pro" }}>
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    fontWeight: 800,
                    color: "primary.light",
                    fontFamily: "Be Vietnam Pro",
                  }}
                >
                  13422+
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
                Người đã bỏ thuốc
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    fontWeight: 800,
                    color: "primary.light",
                    fontFamily: "Be Vietnam Pro",
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
                Tỉ lệ thành công
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SchoolIcon
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
                    fontWeight: 800,
                    color: "primary.light",
                    fontFamily: "Be Vietnam Pro",
                  }}
                >
                  30 ngày
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
                Thời gian trung bình để bỏ thuốc
              </Typography>
            </Box>
          </Box>
        </BotToTop>

        {/* Timeline progress */}
        <Box>
          <BotToTop>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: 800,
                  fontFamily: "Be Vietnam Pro",
                }}
              >
                Lộ trình hồi phục sức khỏe
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "primary.light",
                mt: 1,
                mb: 2,
                fontFamily: "Be Vietnam Pro",
              }}
            >
              Theo dõi cơ thể bạn hồi phục sau khi bỏ thuốc
            </Typography>
          </BotToTop>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Progress
              timneline={"20 phút"}
              target={5} // bắt đầu sớm, thay vì 10%
              duration={1000}
              effect={"Huyết áp và nhịp tim trở lại bình thường"}
            />
            <Progress
              timneline={"24 giờ"}
              target={15} // loại bỏ CO, nhưng vẫn còn chất độc khác
              duration={1000}
              effect={"Khí CO được loại bỏ khỏi cơ thể"}
            />
            <Progress
              timneline={"48 giờ"}
              target={25} // khứu giác, vị giác cải thiện một phần
              duration={1000}
              effect={"Vị giác và khứu giác được cải thiện"}
            />
            <Progress
              timneline={"2-3 tháng"}
              target={45} // chức năng phổi, tuần hoàn cải thiện đáng kể
              duration={1000}
              effect={"Tuần hoàn cải thiện, chức năng phổi tăng"}
            />
            <Progress
              timneline={"1 năm"}
              target={70} // tim mạch giảm rủi ro lớn
              duration={1000}
              effect={"Nguy cơ bệnh tim giảm một nửa"}
            />
            <Progress
              timneline={"10 năm"}
              target={100} // đạt phục hồi tối đa sau nhiều năm
              duration={1000}
              effect={
                "Nguy cơ ung thư phổi giảm một nửa so với người hút thuốc"
              }
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Statistical;
