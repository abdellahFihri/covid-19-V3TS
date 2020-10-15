import React from "react";
import Container from "../hoc/container/container";
import style from "./infos.module.scss";

type Infos = { info1: number; info2: number };
const infos = ({ info1, info2 }: Infos) => {
  return (
    <Container>
      <div className={style.infos}>
        <div>
          {" "}
          Critical condition cases:{" "}
          <span>{info1 ? info1 : "Not registered yet"}</span>
        </div>
        <div>
          {" "}
          Total tested:
          <span>{info2 ? info2 : "Not registered yet"}</span>{" "}
        </div>
      </div>
    </Container>
  );
};
export default infos;
