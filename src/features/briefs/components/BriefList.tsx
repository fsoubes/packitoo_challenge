import React, { useState } from "react";
import {
  useGetBriefsQuery,
  // selectBriefByProductId,
} from "../../../shared/api/api";
// import { createSelector } from "@reduxjs/toolkit";
import { useGetProductsQuery } from "../../products/productsSlice";
import BriefItem from "./BriefItem";
import BriefDetail from "./BriefDetail";
import { Routes, Route, useLocation } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";

interface BriefListProps {}

const BriefList: React.FC<BriefListProps> = ({}) => {
  const { pathname } = useLocation();

  const { data: briefs = [], isFetching } = useGetBriefsQuery();
  const { data: product = [] } = useGetProductsQuery();

  const [selectedId, setSelectedId] = useState("");

  // With https://codesandbox.io/s/github/reduxjs/redux-essentials-example-app/tree/checkpoint-6-rtkqConversion/?from-embed=&file=/src/features/users/UserPage.js:121-171
  // Filtering Posts with selector and userIds
  // RTK Query not a normalized cache / Document cache

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedId(event.target.value as string);
  };

  const briefList = briefs.map(
    ({ title, comment, productId, id }, index: number) =>
      parseInt(selectedId) === productId - 1 || selectedId === "" ? (
        <BriefItem
          key={index}
          id={id}
          title={title}
          comment={comment}
          productname={product[productId - 1].name}
        />
      ) : null
  );

  return isFetching ? (
    <Spinner />
  ) : (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Briefs</h2>
          <button
            onClick={() => setSelectedId("")}
            style={{
              maxHeight: "20px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "red",
            }}
          >
            Clear
          </button>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedId}
                label="selectedId"
                onChange={handleChange}
              >
                {product &&
                  product.map((item, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
          <ul>{briefList}</ul>
        </div>
      </div>
      <Routes>
        <Route path="briefs/:id" element={<BriefDetail />} />
      </Routes>
      {pathname === "/" && (
        <div style={{ marginTop: "3rem" }}>
          <h2>Select a brief for more detail</h2>
        </div>
      )}
    </div>
  );
};
export default BriefList;
