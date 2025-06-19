import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { useNavigate } from "react-router-dom";

function Community() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const SvgComponent = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={20}
      height={20}
      viewBox="0 0 511.987 511.987"
      {...props}
    >
      <path
        d="M128.001 74.662c0 5.891-4.773 10.672-10.664 10.672s-10.672-4.781-10.672-10.672c0-5.89 4.781-10.663 10.672-10.663s10.664 4.773 10.664 10.663z"
        style={{
          fill: "#5d9cec",
        }}
      />
      <path
        d="M64.003 53.28c0 5.891-4.773 10.664-10.664 10.664S42.668 59.171 42.668 53.28s4.781-10.672 10.671-10.672 10.664 4.781 10.664 10.672z"
        style={{
          fill: "#4fc2e9",
        }}
      />
      <path
        d="M128.001 10.664c0 5.891-4.773 10.672-10.664 10.672s-10.672-4.781-10.672-10.672S111.446 0 117.337 0c5.891 0 10.664 4.773 10.664 10.664z"
        style={{
          fill: "#fc6e51",
        }}
      />
      <path
        d="M426.65 351.882c0 5.891-4.766 10.671-10.656 10.671s-10.656-4.78-10.656-10.671 4.766-10.672 10.656-10.672 10.656 4.781 10.656 10.672z"
        style={{
          fill: "#4fc2e9",
        }}
      />
      <path
        d="M255.998 415.928c0 5.905-4.773 10.671-10.664 10.671s-10.672-4.766-10.672-10.671c0-5.875 4.781-10.656 10.672-10.656 5.89-.001 10.664 4.781 10.664 10.656z"
        style={{
          fill: "#ec87c0",
        }}
      />
      <path
        d="M170.664 394.646c0 5.906-4.773 10.688-10.664 10.688-5.89 0-10.664-4.781-10.664-10.688 0-5.875 4.773-10.656 10.664-10.656s10.664 4.781 10.664 10.656z"
        style={{
          fill: "#fc6e51",
        }}
      />
      <path
        d="M42.668 309.336c0 5.875-4.773 10.656-10.664 10.656-5.89 0-10.664-4.781-10.664-10.656 0-5.906 4.773-10.688 10.664-10.688 5.89 0 10.664 4.782 10.664 10.688z"
        style={{
          fill: "#5d9cec",
        }}
      />
      <path
        d="M298.651 31.945c0 5.89-4.766 10.663-10.656 10.663-5.889 0-10.654-4.773-10.654-10.663 0-5.891 4.766-10.664 10.654-10.664 5.892 0 10.656 4.774 10.656 10.664z"
        style={{
          fill: "#4fc2e9",
        }}
      />
      <path
        d="M341.34 95.998c0 5.891-4.781 10.664-10.688 10.664-5.875 0-10.656-4.773-10.656-10.664s4.781-10.664 10.656-10.664c5.905 0 10.688 4.773 10.688 10.664z"
        style={{
          fill: "#fc6e51",
        }}
      />
      <path
        d="M426.65 181.332c0 5.89-4.766 10.663-10.656 10.663s-10.656-4.773-10.656-10.663c0-5.891 4.766-10.672 10.656-10.672s10.656 4.781 10.656 10.672z"
        style={{
          fill: "#5d9cec",
        }}
      />
      <path
        d="M469.336 117.333c0 5.891-4.781 10.664-10.688 10.664-5.875 0-10.656-4.773-10.656-10.664s4.781-10.671 10.656-10.671c5.907 0 10.688 4.78 10.688 10.671zM85.338 223.83c0 5.891-4.781 10.664-10.671 10.664s-10.664-4.773-10.664-10.664c0-5.89 4.773-10.671 10.664-10.671s10.671 4.781 10.671 10.671z"
        style={{
          fill: "#ec87c0",
        }}
      />
      <path
        d="m226.96 326.305-65.436 45.185 6.906-79.216-79.178-7.437 56.218-56.257-55.858-56.6 79.216-6.953-6.414-79.263 65.155 45.592 46.038-64.842 20.608 76.811 76.935-20.078-33.577 72.076 71.858 34.085-72.06 33.625 33.122 72.303-76.811-20.563-21.091 76.67z"
        style={{
          fill: "#ac92eb",
        }}
      />
      <path
        d="M74.667 128.013H64.003v-10.555c0-5.891-4.773-10.671-10.664-10.671s-10.671 4.78-10.671 10.671v10.555H32.004c-5.89 0-10.664 4.773-10.664 10.664s4.773 10.663 10.664 10.663h10.664v10.672c0 5.891 4.781 10.664 10.671 10.664s10.664-4.773 10.664-10.664V149.34h10.664c5.891 0 10.671-4.772 10.671-10.663s-4.781-10.664-10.671-10.664z"
        style={{
          fill: "#a0d468",
        }}
      />
      <path
        d="M373.337 405.209H362.65v-10.562c0-5.875-4.766-10.656-10.654-10.656-5.891 0-10.656 4.781-10.656 10.656v10.562h-10.688c-5.875 0-10.656 4.781-10.656 10.672 0 5.89 4.781 10.671 10.656 10.671h10.688v10.655c0 5.906 4.766 10.672 10.656 10.672 5.889 0 10.654-4.766 10.654-10.672v-10.655h10.688c5.875 0 10.656-4.781 10.656-10.671-.001-5.891-4.782-10.672-10.657-10.672z"
        style={{
          fill: "#ed5564",
        }}
      />
      <path
        d="M479.991 255.993h-10.656v-10.554c0-5.891-4.781-10.672-10.688-10.672-5.875 0-10.656 4.781-10.656 10.672v10.554h-10.656c-5.906 0-10.686 4.774-10.686 10.664 0 5.898 4.779 10.68 10.686 10.68h10.656v10.656c0 5.89 4.781 10.655 10.656 10.655 5.906 0 10.688-4.766 10.688-10.655v-10.656h10.656c5.891 0 10.656-4.781 10.656-10.68 0-5.89-4.764-10.664-10.656-10.664z"
        style={{
          fill: "#a0d468",
        }}
      />
      <path
        d="M437.336 42.554H426.65V32c0-5.891-4.766-10.664-10.656-10.664S405.337 26.109 405.337 32v10.554H394.65c-5.875 0-10.656 4.773-10.656 10.664 0 5.898 4.781 10.672 10.656 10.672h10.688v10.663c0 5.891 4.766 10.664 10.656 10.664s10.656-4.773 10.656-10.664V63.889h10.686c5.875 0 10.656-4.773 10.656-10.672-.001-5.89-4.781-10.663-10.656-10.663z"
        style={{
          fill: "#ed5564",
        }}
      />
      <path
        d="M223.999 21.219h-10.664V10.664C213.335 4.773 208.554 0 202.664 0S192 4.773 192 10.664v10.555h-10.664c-5.891 0-10.671 4.781-10.671 10.672 0 5.89 4.781 10.663 10.671 10.663H192v10.664c0 5.898 4.773 10.672 10.664 10.672s10.671-4.773 10.671-10.672V42.554h10.664c5.89 0 10.664-4.773 10.664-10.663-.001-5.891-4.774-10.672-10.664-10.672z"
        style={{
          fill: "#48cfad",
        }}
      />
      <path
        d="M239.842 214.847c-34.116 20.476-65.709 48.194-93.912 82.396-22.429 27.219-42.772 58.562-60.467 93.186C55.37 449.302 43.472 496.77 42.98 498.77h.008c-.195.812-.32 1.672-.32 2.562 0 5.875 4.781 10.655 10.671 10.655 5.008 0 9.195-3.469 10.344-8.108h.008c.117-.453 11.789-47.046 40.764-103.731 17-33.266 36.491-63.311 57.936-89.342 26.648-32.312 56.397-58.443 88.427-77.662l-10.976-18.297z"
        style={{
          fill: "#f6bb42",
        }}
      />
      <path
        d="M277.341 223.994c0 17.672-14.336 31.999-32.007 31.999s-32-14.327-32-31.999c0-17.671 14.328-31.999 32-31.999s32.007 14.328 32.007 31.999z"
        style={{
          fill: "#ffce54",
        }}
      />
    </svg>
  );
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(USER_API_ROUTES.GET_POSTS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {}
    };
    getPost();
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              py: 3,
              px: 3,
              color: "secondary.dark",
              height: "100%", // Make box fill grid height
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "black", mb: 1 }}
            >
              Chia sẻ thành tích của bạn
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Truyền cảm hứng cho cộng đồng bằng câu chuyện của bạn
            </Typography>
            <Box
              sx={{
                bgcolor: "primary.light",
                p: 2,
                borderRadius: 2,
                border: "1px solid green",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <SvgComponent />
                <Typography sx={{ color: "primary.main", fontStyle: "italic" }}>
                  Thành tích mới
                </Typography>
              </Box>
              <Typography sx={{ color: "primary.main" }}>
                I just completed 50 days smoke-free and saved 200.000 VND!
              </Typography>
            </Box>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              endIcon={<ReplyIcon sx={{ transform: "rotate(180deg)" }} />}
            >
              Chia sẻ thành tích của bạn
            </Button>
          </Box>
        </Grid>
        {/*right side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              py: 3,
              px: 3,
              color: "secondary.dark",
              height: "100%", // Make box fill grid height
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "black", mb: 1 }}
            >
              Hoạt động cộng đồng
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Chia sẻ gần đây từ các thành viên khác
            </Typography>

            {posts ? (
              posts.slice(0, 2).map((post) => (
                <>
                  <Box
                    sx={{
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontWeight: 400 }}
                      >
                        {post.authorName}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{post.content}</Typography>
                  </Box>
                </>
              ))
            ) : (
              <></>
            )}

            <Button onClick={() => navigate("/community")} variant="outlined">
              See more
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Community;
