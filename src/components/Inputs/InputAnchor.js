import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import icon_anchor from "../../img/outdoor_furniture/filter_icons/bx-ancor.svg";
import React from "react";

export default function InputAnchor(props) {
  return (
    <TextField
      style={{ width: "100%", marginBottom: 20, background: "white" }}
      fullWidth
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      variant="outlined"
      onChange={props.onChange}
      InputProps={{
        style: { fontSize: 14 },
        startAdornment: (
          <InputAdornment position="start">
            <img src={icon_anchor} alt="" />
          </InputAdornment>
        ),
      }}
    />
  );
}
