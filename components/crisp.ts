"use client"
import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount() {
    Crisp.configure("7743d365-5c15-4527-9987-5beac0d96179");
  }

  render() {
    return null;
  }
}
export default CrispChat;
