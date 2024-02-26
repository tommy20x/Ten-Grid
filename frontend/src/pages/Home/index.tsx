import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./style.css";

export default function Home(props: any) {
  const seats: Array<number> = [];
  for (let i = 0; i < 54; i++) {
    seats.push(i);
  }

  return (
    <div className="home">
      {/* <Typography variant="h5">Seat</Typography>
      <Button color="primary" variant="contained">
        Buy
      </Button> */}

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {seats.map((value) => (
              <Grid key={value} item>
                <Paper sx={{ height: 100, width: 100 }} className="gridItem" >
                  <LockOutlinedIcon />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
