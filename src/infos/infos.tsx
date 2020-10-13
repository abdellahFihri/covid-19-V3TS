import React from "react";
import Container from "../hoc/container/container";
import style from "./infos.module.scss";

type Infos = { info1: number; info2: number; info3: number; info4?: number };
const infos = ({ info1, info2, info3 }: Infos) => {
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
          Cases per 1m population:
          <span>{info2 ? info2 : "Not registered yet"}</span>{" "}
        </div>
        <div>
          {" "}
          Deaths after apdates:{" "}
          <span>{info3 ? info3 : "Not registered yet"}</span>{" "}
        </div>
      </div>
    </Container>
  );
};
export default infos;
