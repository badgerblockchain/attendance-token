import React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const CustomCard = ({ title, number }) => {
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 275, mb: "1.5rem" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} variant="h2" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ mb: "5px" }} color="text.primary">
            {number}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomCard;
