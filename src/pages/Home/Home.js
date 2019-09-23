import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
import { GiLightBulb } from "react-icons/gi";
import { formatPrice } from "../../util/format";

import api from "../../services/api";

import * as CartActions from "../../store/modules/cart/actions";

import { ProductList } from "./home.style";

export default function Home() {
	const [products, setProducts] = useState([]);

	const amount = useSelector(state =>
		state.cart.reduce((sumAmount, product) => {
			sumAmount[product.id] = product.amount;

			return sumAmount;
		}, {})
	);

	const dispatch = useDispatch();

	useEffect(() => {
		async function loadProducts() {
			const response = await api.get("products");

			const data = response.data.map(product => ({
				...product,
				priceFormatted: formatPrice(product.price),
			}));

			setProducts(data);
		}

		loadProducts();
	}, []);

	function handleAddProduct(id) {
		dispatch(CartActions.addToCartRequest(id));
	}

	return (
		<ProductList>
			{products.map(product => (
				<li key={product.id}>
					<img src={product.image} alt={product.title} />
					<strong>{product.title}</strong>
					<span>{product.priceFormatted}</span>

					<button
						type="button"
						onClick={() => this.handleAddProduct(product.id)}
					>
						<div>
							<GiLightBulb size={16} color="#f6f1ec" />{" "}
							{amount[product.id] || 0}
						</div>

						<span>Add to your bag</span>
					</button>
				</li>
			))}
		</ProductList>
	);
}

// const mapStateToProps = state => ({
//   amount: state.cart.reduce((amount, product) => {
//     amount[product.id] = product.amount;
//
//     return amount;
//   }, {}),
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(CartActions, dispatch);
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);
