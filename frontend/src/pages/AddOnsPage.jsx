import React, { useEffect, useState } from 'react';
import './AddOns.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import Tick from '../assets/images/tick.svg';
// import {toggle} from '../redux/plan/planSlice'

function AddOnsPage() {
	const [checkboxSelectedList, setCheckboxSelectedList] = useState(
		JSON.parse(localStorage.getItem('addons')) || []
	);
	const [checkboxSelected, setCheckboxSelected] = useState('');
	const toggle = useSelector((state) => state.plan.toggle);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { stepNumber } = useParams();

	const addOnProducts = [
		{
			name: 'Online service',
			details: 'Access to multiplayer games',
			monthlyPrice: '1',
			yearlyPrice: '10',
		},
		{
			name: 'Larger storage',
			details: 'Extra 1TB of cloud save',
			monthlyPrice: '2',
			yearlyPrice: '20',
		},
		{
			name: 'Customizable profile',
			details: 'Custom theme on your profile',
			monthlyPrice: '2',
			yearlyPrice: '20',
		},
	];

	function handleSubmit() {
		dispatch(setActiveStep(parseInt(stepNumber) + 1));
		navigate(`/summary/step/${parseInt(stepNumber) + 1}`);
	}

	function handleGoBack() {
		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/selectplan/step/${parseInt(stepNumber) - 1}`);
	}

	function handleCheckboxSelect(checkboxName, monthlyPrice, yearlyPrice) {
		console.log(`price is MONTHLY ${monthlyPrice}`);
		console.log(`price is YEARLY ${yearlyPrice}`);
		console.log(`checkbox  ${checkboxName}`);

		if (!checkboxSelectedList.some((item) => item.name === checkboxName)) {
			setCheckboxSelectedList([
				...checkboxSelectedList,
				{
					name: checkboxName,
					monthlyPrice,
					yearlyPrice,
				},
			]);
		} else {
			setCheckboxSelectedList(
				checkboxSelectedList.filter((item) => {
					return item.name !== checkboxName;
				})
			);
		}
	}

	useEffect(() => {
		localStorage.setItem('addons', JSON.stringify(checkboxSelectedList));
	}, [checkboxSelectedList]);

	console.log(checkboxSelectedList);

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Pick add-ons</h1>
				<p className="fz-14">Add-ons help enhance your gaming experience.</p>
				<div className="addons-container">
					{addOnProducts.map((product) => {
						const { name, details, monthlyPrice, yearlyPrice } = product;
						return (
							<div
								key={name}
								className={`${
									checkboxSelectedList.some((item) => item.name === name)
										? 'product product-active'
										: 'product '
								}`}
								onClick={() =>
									handleCheckboxSelect(name, monthlyPrice, yearlyPrice)
								}
							>
								<div className="product-left">
									<div
										key={name}
										className={`${
											checkboxSelectedList.some((item) => item.name === name)
												? 'product-checkbox-active'
												: 'product-checkbox'
										}`}
									>
										{checkboxSelectedList.some(
											(item) => item.name === name
										) && <img src={Tick} alt="" />}
									</div>
									<div className="product-left-inner">
										<h2 className="product-name text-denim">{name}</h2>
										<p className="product-details fz-14">{details}</p>
									</div>
								</div>
								<div className="product-price fz-14">
									{!toggle ? `+$${monthlyPrice}/mo` : `+$${yearlyPrice}/yr`}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="page-buttons">
				<button className="go-back-button" onClick={handleGoBack}>
					Go Back
				</button>
				<button type="submit" onClick={handleSubmit}>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default AddOnsPage;
