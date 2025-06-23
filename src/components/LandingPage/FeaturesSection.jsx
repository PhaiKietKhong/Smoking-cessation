import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { BotToTop, FadeIn } from "../Animations/animations";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
function FeaturesSection() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        backgroundImage:
          "url('https://www.smallsteps.org.nz/_next/image?url=%2Fimages%2Fss-tool-footer.png&w=1920&q=75')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "primary.dark",
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <BotToTop>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontFamily: "Be Vietnam Pro",
                color: "primary.light",
              }}
            >
              Chương trình hoạt động như thế nào?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "primary.light",
                mt: 1,
                mb: 2,
              }}
            >
              Phương pháp dựa trên khoa học của chúng tôi giúp bạn cai thuốc
              vĩnh viễn thông qua một hành trình cá nhân hóa
            </Typography>
          </BotToTop>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
            mt: 4,
          }}
        >
          <Grid item size={{ xs: 12, md: 4 }}>
            <BotToTop>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "primary.light",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.light",
                    bgcolor: "primary.dark",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "Be Vietnam Pro",
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  Kế hoạch cá nhân hóa
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", flexGrow: 1 }}
                >
                  Chúng tôi tạo một kế hoạch cai thuốc riêng dựa trên thói quen,
                  tác nhân và mục tiêu của bạn.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <BotToTop delay={0.3}>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "primary.light",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <GroupsOutlinedIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.light",
                    bgcolor: "primary.dark",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "Be Vietnam Pro",
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  Cộng đồng hỗ trợ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", flexGrow: 1 }}
                >
                  Kết nối với người khác thông qua cộng đồng và các huấn luyện
                  viên chuyên môn của chúng tôi.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <BotToTop delay={0.6}>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "primary.light",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WorkspacePremiumOutlinedIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.light",
                    bgcolor: "primary.dark",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "Be Vietnam Pro",
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  Theo dõi tiến trình
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", flexGrow: 1 }}
                >
                  Theo dõi tiến trình của bạn, ăn mừng các cột mốc và thấy được
                  lợi ích sức khỏe.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
