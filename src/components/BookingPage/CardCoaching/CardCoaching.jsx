import {
  CalendarToday as CalendarIcon,
  Message as MessageIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function CardCoaching({
  id,
  name,
  title,
  specialization,
  reviews,
  rating,
  status,
  avatar,
  bio,
  achievements,
  experience,
  price,
  languages,
  nextAvailable,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeader
        avatar={
          <Box position="relative">
            <Avatar alt={name} src={avatar} sx={{ width: 64, height: 64 }} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 14,
                height: 14,
                bgcolor:
                  status === "online"
                    ? "green"
                    : status === "busy"
                    ? "orange"
                    : "gray",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          </Box>
        }
        title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="body2" color="primary">
              {specialization}
            </Typography>
          </>
        }
        action={
          <Box textAlign="right">
            <Box display="flex" alignItems="center" gap={0.5}>
              <StarIcon fontSize="small" htmlColor="#facc15" />
              <Typography variant="body2" fontWeight="medium">
                {rating}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({reviews})
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {status === "online"
                ? "Đang hoạt động"
                : status === "busy"
                ? "Đang bận"
                : "Ngoại tuyến"}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.primary" mb={2}>
          {bio}
        </Typography>

        <Stack direction="row" spacing={1} mb={2}>
          {achievements.slice(0, 2).map((achievement, idx) => (
            <Chip
              key={idx}
              label={achievement}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Kinh nghiệm:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {experience}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Giá:
            </Typography>
            <Typography variant="body2" fontWeight="medium" color="green">
              {price}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Ngôn ngữ:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {languages.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Có thể tư vấn:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {nextAvailable}
            </Typography>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size={isSmallScreen ? "medium" : "small"}
            disabled={status !== "online"}
            href={`/coaching/chat/${id}`}
            startIcon={<MessageIcon fontSize="small" />}
            fullWidth
          >
            Chat ngay
          </Button>
          <Button
            variant={isSmallScreen ? "contained" : "outlined"}
            size={isSmallScreen ? "medium" : "small"}
            href={`/coaching/book/${id}`}
            startIcon={<CalendarIcon fontSize="small" />}
            fullWidth
          >
            Đặt lịch
          </Button>
          <Button
            variant={isSmallScreen ? "contained" : "outlined"}
            size={isSmallScreen ? "medium" : "small"}
            href={`/coaching/profile/${id}`}
            fullWidth
          >
            Xem thêm
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CardCoaching;
