import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import { AccessTime, Flag, DirectionsRun } from "@mui/icons-material";
import dayjs from "dayjs";

const TimelineChart = ({ plans }) => {
  if (!plans || plans.length === 0) return null;

  const allMilestones = plans.flatMap((plan) => plan.milestones || []);

  const today = dayjs();
  const nextActiveMilestone = allMilestones
    .filter((m) => dayjs(m.targetDate).isAfter(today))
    .sort((a, b) => dayjs(a.targetDate).diff(dayjs(b.targetDate)))[0];

  return (
    <Timeline position="alternate">
      {plans.map((plan) =>
        plan.milestones?.map((milestone, idx) => {
          const isActive =
            nextActiveMilestone &&
            milestone.milestoneId === nextActiveMilestone.milestoneId;

          return (
            <TimelineItem
              key={milestone.milestoneId || idx}
              sx={{ minHeight: 200 }}
            >
              <TimelineOppositeContent color="text.secondary">
                <AccessTime fontSize="small" color="info" />
                <Typography sx={{ ml: 1 }} variant="caption">
                  {dayjs(milestone.targetDate).format("DD/MM/YYYY")}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot
                  variant={isActive ? "filled" : "outlined"}
                  color={isActive ? "primary" : "grey"}
                />
                {idx < plan.milestones.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ py: 2, transform: "translateY(-85px)" }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive
                      ? "primary.light"
                      : "secondary.main",
                    borderColor: isActive ? "primary.dark" : "grey",
                    px: 2,
                    py: 1.5,
                    boxShadow: 2,
                  }}
                >
                  <CardContent
                    sx={{ padding: "8px 0 !important", textAlign: "center" }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                    >
                      {milestone.title}
                    </Typography>

                    {milestone.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {milestone.description}
                      </Typography>
                    )}

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Flag fontSize="small" sx={{ color: "warning.main" }} />
                      <Typography variant="body2">
                        Mục tiêu:{" "}
                        <strong>{milestone.targetCigarettes} điếu/ngày</strong>
                      </Typography>
                    </Stack>

                    {milestone.actions && milestone.actions.length > 0 && (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 1 }}
                        >
                          <DirectionsRun
                            fontSize="small"
                            sx={{ color: "success.main" }}
                          />
                          <Typography variant="body2" fontWeight="bold">
                            Hành động:
                          </Typography>
                        </Stack>
                        <Box
                          sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                        >
                          {milestone.actions.map((action, index) => (
                            <Chip
                              key={index}
                              label={action}
                              size="small"
                              color="default"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })
      )}
    </Timeline>
  );
};

export default TimelineChart;
