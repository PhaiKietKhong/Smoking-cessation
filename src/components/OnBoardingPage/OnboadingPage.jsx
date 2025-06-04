import {
  Box,
  Button,
  Container,
  InputAdornment,
  LinearProgress,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import dayjs from "dayjs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";

function OnboadingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quitDate, setQuitDate] = useState(null);
  const [cigaretteCount, setCigaretteCount] = useState("");
  const [cigarettesInAPack, setCigarettesInAPack] = useState("");
  const [priceOfThePack, setPriceOfThePack] = useState("");

  function formatNumber(number) {
    number = Math.round(parseFloat(number));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleNext = () => {
    if (currentStep == 5) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const canProcess = () => {
    switch (currentStep) {
      case 1:
        return quitDate !== null;
      case 2:
        return cigaretteCount !== "" && Number.parseInt(cigaretteCount) > 0;

      case 3:
        return (
          cigarettesInAPack !== "" && Number.parseInt(cigarettesInAPack) > 0
        );
      case 4:
        return priceOfThePack !== "" && Number.parseInt(priceOfThePack) > 0;
      case 5:
        return true;
    }
  };

  const handlePrevious = () => {
    if (currentStep == 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  function Progress() {
    let value;
    switch (currentStep) {
      case 1:
        value = 20;
        break;
      case 2:
        value = 40;
        break;
      case 3:
        value = 60;
        break;
      case 4:
        value = 80;
        break;
      case 5:
        value = 100;
        break;
    }
    return (
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 20,
          borderRadius: 5,
          bgcolor: "rgba(0,0,0,0.1)",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#primary.light",
          },
          transition: "ease",
        }}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              When did you Quit Smoking?
            </Typography>

            <Typography variant="body2">
              Select the date you plan to quit smoking
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    value={quitDate}
                    onChange={(newValue) => {
                      setQuitDate(newValue);
                    }}
                    label="Pick Date"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.23)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.light",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "primary.light",
                      },
                      "& .MuiInputBase-input": {
                        color: "primary.light",
                      },
                      "& .MuiIconButton-root": {
                        color: "primary.light",
                      },
                      "& .MuiPickersDay-root": {
                        color: "primary.main",
                        "&.Mui-selected": {
                          backgroundColor: "primary.main",
                          color: "primary.light",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              How many cigarettes did you smoke per day?
            </Typography>

            <Typography variant="body2">
              Enter the average number of cigarettes you smoke per day
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <TextField
                id="outlined-basic"
                label="number of cigarettes"
                variant="standard"
                type="number"
                value={cigaretteCount}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(Number(e.target.value), 0),
                    100
                  );
                  setCigaretteCount(value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "primary.light", // Text color
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "primary.light", // Default underline color
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "primary.light", // Hover underline color
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "primary.light", // Focused underline color
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.light", // Label color
                    "&.Mui-focused": {
                      color: "primary.light", // Focused label color
                    },
                  },
                }}
              />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              How many cigarettes are in a pack?
            </Typography>

            <Typography variant="body2">
              Enter the number of cigarettes in a pack you usually buy
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <TextField
                id="outlined-basic"
                label="cigarettes in a pack"
                variant="standard"
                type="number"
                value={cigarettesInAPack}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(Number(e.target.value), 0),
                    100
                  );
                  setCigarettesInAPack(value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "primary.light", // Text color
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "primary.light", // Default underline color
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "primary.light", // Hover underline color
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "primary.light", // Focused underline color
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.light", // Label color
                    "&.Mui-focused": {
                      color: "primary.light", // Focused label color
                    },
                  },
                }}
              />
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              What's price of the pack?
            </Typography>

            <Typography variant="body2">
              Enter the price of a pack of medicine (VND)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <TextField
                label="Price of a pack"
                id="outlined-start-adornment"
                sx={{
                  width: "25ch",
                  "& input[type=number]::-webkit-outer-spin-button": {
                    display: "none",
                  },
                  "& input[type=number]::-webkit-inner-spin-button": {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiInputBase-input": {
                    color: "primary.light",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "primary.light",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "primary.light",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "primary.light",
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.light",
                    "&.Mui-focused": {
                      color: "primary.light",
                    },
                  },
                  "& .MuiInputAdornment-root": {
                    color: "primary.light", // Added color for the adornment
                    "& .MuiTypography-root": {
                      color: "primary.light", // Added color for the text inside adornment
                    },
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        sx={{ color: "primary.light" }}
                        position="end"
                      >
                        VND
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                type="number"
                value={priceOfThePack}
                onChange={(e) => {
                  const value = Math.min(
                    Math.max(Number(e.target.value), 0),
                    10000000
                  );
                  setPriceOfThePack(value);
                }}
              />
            </Box>
          </Box>
        );
      case 5:
        return (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Summarize your information
              </Typography>

              <Typography variant="body2">
                Here's how much money you'll save by quitting smoking
              </Typography>
            </Box>
            {/* */}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  width: "50%",
                  border: "1px solid rgba(128, 128, 128, 0.3)",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "start", fontWeight: 600 }}
                  >
                    Quit Date
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 800,
                      textAlign: "start",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    {quitDate.format("YYYY/MM/DD HH:mm")}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  border: "1px solid rgba(128, 128, 128, 0.3)",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "start", fontWeight: 600 }}
                  >
                    Cigarettes/day
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 800, textAlign: "start" }}
                  >
                    {cigaretteCount}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                border: "1px solid rgba(128, 128, 128, 0.3)",
                p: 3,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Box sx={{ textAlign: "start" }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Money Saved
                </Typography>

                <Typography variant="body2">When You Quit Smoking</Typography>
              </Box>
              {/* day week*/}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box sx={{ width: "50%" }}>
                  <Typography sx={{ textAlign: "start" }} variant="body2">
                    Everyday
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "start",
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {formatNumber(
                      cigaretteCount * (priceOfThePack / cigarettesInAPack)
                    )}
                    &nbsp;₫
                  </Typography>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Typography sx={{ textAlign: "start" }} variant="body2">
                    Every week
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "start",
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {formatNumber(
                      cigaretteCount * (priceOfThePack / cigarettesInAPack) * 7
                    )}
                    &nbsp;₫
                  </Typography>
                </Box>
              </Box>
              {/* month Year*/}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box sx={{ width: "50%" }}>
                  <Typography sx={{ textAlign: "start" }} variant="body2">
                    Every Month
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "start",
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {formatNumber(
                      cigaretteCount * (priceOfThePack / cigarettesInAPack) * 30
                    )}
                    &nbsp;₫
                  </Typography>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Typography sx={{ textAlign: "start" }} variant="body2">
                    Every year
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "start",
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {formatNumber(
                      cigaretteCount *
                        (priceOfThePack / cigarettesInAPack) *
                        365
                    )}
                    &nbsp;₫
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
    }
  };
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "60%",
            color: "primary.light",
            bgcolor: "primary.dark",
            borderRadius: 2,
            padding: 4,
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Survey about you
              </Typography>
              <Typography variant="body1">{currentStep}/5</Typography>
            </Box>
            <Progress target={25} duration={1000} />
            <Box>{renderStep()}</Box>
          </Box>

          <Box>
            <hr />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                startIcon={<ArrowBackIosNewIcon />}
                variant="outlined"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1rem", // Adjust icon size
                  },
                  px: 3,
                  py: 1,
                }}
                onClick={handlePrevious}
              >
                Back
              </Button>
              <Button
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "1rem", // Adjust icon size
                  },
                  px: 3,
                  py: 1,
                }}
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                onClick={handleNext}
                disabled={!canProcess()}
              >
                {currentStep < 5 ? "Next" : "Finish"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default OnboadingPage;
