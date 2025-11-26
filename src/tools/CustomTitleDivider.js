import React from 'react';
import Divider from "@mui/material/Divider";

export default function CustomTitleDivider({ title, titleColor = "#000000", fontSize = '1rem' }) {
  return (
    <div>
      <Divider sx={{ marginTop: '3rem', marginBottom: '0.5rem' }} textAlign="center">
        <span style={{ color: titleColor, fontSize: fontSize }}>{title}</span>
      </Divider>
    </div>
  );
}