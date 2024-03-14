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
			monthlyPrice: '+$1/mo',
			yearlyPrice: '+$10/yr',
		},
		{
			name: 'Larger storage',
			details: 'Extra 1TB of cloud save',
			monthlyPrice: '+$2/mo',
			yearlyPrice: '+$20/yr',
		},
		{
			name: 'Customizable profile',
			details: 'Custom theme on your profile',
			monthlyPrice: '+$2/mo',
			yearlyPrice: '+$20/yr',
		},
	];

	function handleSubmit() {
		console.log('clicked');
	}

	function handleGoBack() {
		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/selectplan/step/${parseInt(stepNumber) - 1}`);
	}

	function handleCheckboxSelect(checkboxName) {
		setCheckboxSelected(checkboxName);
		if (!checkboxSelectedList.includes(checkboxName)) {
			setCheckboxSelectedList([...checkboxSelectedList, checkboxName]);
		} else {
			const filteredSelectedList = checkboxSelectedList.filter(
				(item) => item !== checkboxName
			);
			setCheckboxSelectedList([...filteredSelectedList]);
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
									checkboxSelectedList.includes(name)
										? 'product product-active'
										: 'product '
								}`}
								onClick={() => handleCheckboxSelect(name)}
							>
								<div className="product-left">
									<div
										key={name}
										className={`${
											checkboxSelectedList.includes(name)
												? 'product-checkbox-active'
												: 'product-checkbox'
										}`}
									>
										{checkboxSelectedList.includes(name) && (
											<img src={Tick} alt="" />
										)}
									</div>
									<div className="product-left-inner">
										<h2 className="product-name text-denim">{name}</h2>
										<p className="product-details fz-14">{details}</p>
									</div>
								</div>
								<div className="product-price fz-14">
									{!toggle ? monthlyPrice : yearlyPrice}
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
