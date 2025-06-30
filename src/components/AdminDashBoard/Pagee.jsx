import { BarChart3, Users, UserCheck, TrendingUp } from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: "1px solid #e5e7eb",
                    px: 3,
                    height: 64,
                    mb: 2,
                    background: "#fff",
                }}
            >
                <BarChart3 size={28} color="#374151" />
                <Typography
                    variant="h5"
                    sx={{
                        color: "#374151",
                        fontWeight: 500,
                        fontSize: "2rem",
                        letterSpacing: 0,
                    }}
                >
                    Dashboard Overview
                </Typography>
            </Box>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardHeader
                                title="Total Users"
                                avatar={<Users />}
                                titleTypographyProps={{ variant: "h6" }}
                            />
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold">
                                    2,847
                                </Typography>
                                <Typography color="text.secondary">
                                    +12% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardHeader
                                title="Active Coaches"
                                avatar={<UserCheck />}
                                titleTypographyProps={{ variant: "h6" }}
                            />
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold">
                                    156
                                </Typography>
                                <Typography color="text.secondary">
                                    +8% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardHeader
                                title="Sessions"
                                avatar={<BarChart3 />}
                                titleTypographyProps={{ variant: "h6" }}
                            />
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold">
                                    12,234
                                </Typography>
                                <Typography color="text.secondary">
                                    +19% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardHeader
                                title="Growth Rate"
                                avatar={<TrendingUp />}
                                titleTypographyProps={{ variant: "h6" }}
                            />
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold">
                                    24.5%
                                </Typography>
                                <Typography color="text.secondary">
                                    +2.1% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                    <Card className="h-full">
                        <CardHeader>
                            <Typography variant="h6" component="div">
                                Recent Activity
                            </Typography>
                            <p className="text-sm text-muted-foreground">
                                Latest user registrations and coach activities
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            New user registered: John Doe
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            2 minutes ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            Coach Sarah completed session
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            5 minutes ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            New coach application: Mike Wilson
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            10 minutes ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Box>
    );
}
