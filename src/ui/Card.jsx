import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Call from "../assets/call.svg";
import Location from "../assets/location.svg";
import {  Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background: #fff;
  min-height: 50px;
  height: 200px;
  margin-bottom: 24px;
  border: 1px solid #f2f4f9;
  border-radius: 10px;
  & > img {
    width: 130px;
    height: 130px;
    border-radius: 15px;
    /* background: #fff; */
    position: inherit;
    padding: 2px;
    box-shadow: 0 5px 25px #0003;
  }
`;
const CardLeft = styled.span`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 300px;
  & > h3 {
    color: #00bdf2;
    font-size: 24px;
    display: block;
    font-weight: bold;
  }
  & > h5 {
    color: #072847;
    font-size: 15px;
  }
`;
const CardRight = styled.span`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 150px;
  & > h3 {
    color: #00bdf2;
    font-size: 24px;
    /* display: block; */
    font-weight: bold;
  }
`;
const CardFlex = styled.small`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  & img {
    width: 30px;
    height: 30px;
    background-color: white;
    box-shadow: 0 0px 0px #fff;
  }
  & p {
    font-size: 17px;
  }
`;
function Card({ data }) {
  const role = useSelector((state) => state.userToken.role);
  const { first_name,id, image, last_name, phone_number, region, complaint } =
    data;
  return (
    <Link to={`${role == "diagnos" ? `/patients/${id}` : `${id}`}`}>
      <CardMain>
        <img
          src="https://clinic-srm.uz.custom.uz/media/default.svg"
          alt={last_name}
        />
        <CardLeft>
          <h3>{first_name}</h3>
          <h5>
            {first_name} {last_name}
          </h5>
          <CardFlex>
            <img src={Call} alt="" />
            <p>{phone_number}</p>
          </CardFlex>
          <CardFlex>
            <img src={Location} alt="" />
            <p>{region}</p>
          </CardFlex>
        </CardLeft>
        <CardRight>
          <h3>Kasallik tasnifi</h3>
          <p>
            {complaint == null ? (
              <p style={{ color: "black" }}>
                Hozircha kasallik tasnifi kiritlmadi
              </p>
            ) : (
              <p>{complaint?.slice(0, 20)}</p>
            )}
          </p>
        </CardRight>
      </CardMain>
    </Link>
  );
}

export default Card;
