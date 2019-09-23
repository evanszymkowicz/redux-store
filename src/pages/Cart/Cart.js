import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import {
	MdRemoveCircleOutline,
	MdAddCircleOutline,
	MdDelete,
} from "react-icons/md";

import history from "../../services/history";
import { formatPrice } from "../../util/format";

import * as CartActions from "../../store/modules/cart/actions";

import { Container, ProductTable, Total } from "./cart.style";

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
	function increment(product) {
		updateAmountRequest(product.id, product.amount + 1);
	}

	function decrement(product) {
		updateAmountRequest(product.id, product.amount - 1);
	}

	return (
		<Container>
			<ProductTable>
				<thead>
					<tr>
						<th />
						<th>Products</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{cart.map(product => (
						<tr>
							<td>
								<img src={product.image} alt={product.title} />
							</td>
							<td>
								<strong>{product.title}</strong>
								<span>{product.priceFormatted}</span>
							</td>
							<td>
								<div>
									<button type="button" onClick={() => decrement(product)}>
										<MdRemoveCircleOutline size={20} color="#4c423f" />
									</button>
									<input type="number" readOnly value={product.amount} />
									<button type="button" onClick={() => increment(product)}>
										<MdAddCircleOutline size={20} color="#4c423f" />
									</button>
								</div>
							</td>
							<td>
								<strong>{product.subtotal}</strong>
							</td>
							<td>
								<button
									type="button"
									onClick={() => removeFromCart(product.id)}
								>
									<MdDelete size={20} color="#4c423f" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</ProductTable>

			<footer>
				<button
					type="button"
					onClick={() => {
						history.push("/");
					}}
				>
          Continue Shopping?
				</button>
				<button type="button">Checkout</button>
				<Total>
					<span>Total</span>
					<strong>{total}</strong>
				</Total>
			</footer>
		</Container>
	);
}

const mapStateToProps = state => ({
	cart: state.cart.map(product => ({
		...product,
		subtotal: formatPrice(product.price * product.amount),
	})),
	total: formatPrice(
		state.cart.reduce((total, product) => {
			return total + product.price * product.amount;
		}, 0)
	),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart);
