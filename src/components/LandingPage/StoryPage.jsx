import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { BotToTop } from "../Animations/animations";
import Avatar from "@mui/material/Avatar";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";

function StoryPage() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage:
          "url('https://www.smallsteps.org.nz/images/curves/top-curve-dark-green-landing.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "primary.light",
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
                color: "primary.light",
                fontFamily: "Be Vietnam Pro",
              }}
            >
              Câu chuyện thành công
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "primary.light",
                mt: 1,
                mb: 4,
                fontFamily: "Be Vietnam Pro",
              }}
            >
              Lắng nghe chia sẻ từ những người đã bỏ thuốc thành công cùng
              chương trình của chúng tôi
            </Typography>
          </BotToTop>
        </Box>

        {/* Các câu chuyện */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="H"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      fontFamily: "Be Vietnam Pro",
                    }}
                  >
                    Trung Hoàng
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Be Vietnam Pro" }}
                  >
                    Đã bỏ thuốc 2 năm
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  mt: 2,
                  fontFamily: "Be Vietnam Pro",
                }}
              >
                "Sau 15 năm hút thuốc, tôi chưa từng nghĩ mình có thể bỏ được.
                Chương trình này đã giúp tôi làm điều đó nhờ cách tiếp cận cá
                nhân hóa và cộng đồng hỗ trợ tuyệt vời."
              </Typography>
            </Box>
          </BotToTop>

          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="V"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      fontFamily: "Be Vietnam Pro",
                    }}
                  >
                    Hoàng Việt
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Be Vietnam Pro" }}
                  >
                    Đã bỏ thuốc 1 năm
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  mt: 2,
                  fontFamily: "Be Vietnam Pro",
                }}
              >
                "Các công cụ theo dõi tiến trình và thông tin sức khỏe đã giúp
                tôi luôn có động lực. Giờ tôi có thể chạy 5km mà không mệt -
                điều tôi chưa từng nghĩ là có thể."
              </Typography>
            </Box>
          </BotToTop>

          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="P"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      fontFamily: "Be Vietnam Pro",
                    }}
                  >
                    Hoài Phương
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Be Vietnam Pro" }}
                  >
                    Đã bỏ thuốc 6 tháng
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  mt: 2,
                  fontFamily: "Be Vietnam Pro",
                }}
              >
                "Các kỹ thuật kiểm soát cơn thèm đã thay đổi cuộc chơi. Tôi đã
                tiết kiệm được hơn 2,8 triệu đồng và vị giác, khứu giác đã hoàn
                toàn hồi phục!"
              </Typography>
            </Box>
          </BotToTop>
        </Box>
      </Container>
    </Box>
  );
}

export default StoryPage;
