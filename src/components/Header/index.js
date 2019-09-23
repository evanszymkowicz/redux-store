import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { GiLightBulb } from "react-icons/gi";

import { Container, Cart } from "./index.style";

import logo from "../../assets/logo.svg";

export default function Header() {
	const cartSize = useSelector(state => state.cart.length);
	return (
		<Container>
			<Link to="/">
				<img src={logo} alt="Light it Up"/>
			</Link>

			<Cart to="/cart">
				<div>
					<strong>Your bag of bulbs</strong>
					<span>{cartSize} items in your cart</span>
				</div>
				<GiLightBulb size={36} color="#F6F1EC"/>
			</Cart>
		</Container>);
}

//
// export default connect(state => ({cartSize: state.cart.length}))(Header);
