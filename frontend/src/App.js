import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddOnsPage from './pages/AddOnsPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import SelectPlanPage from './pages/SelectPlanPage';
import SummaryPage from './pages/SummaryPage';
import Layout from './components/Layout';
import StepperProvider from './Context/StepperContext';
import ThankYouPage from './pages/ThankYouPage';

function App() {
	return (
		<StepperProvider>
			<Router>
				<Routes>
					<Route
						path="/yourinfo/step/:stepNumber"
						element={
							<Layout>
								<PersonalInfoPage />
							</Layout>
						}
					/>
					<Route
						path="/selectplan/step/:stepNumber"
						element={
							<Layout>
								<SelectPlanPage />
							</Layout>
						}
					/>
					<Route
						path="/add-ons/step/:stepNumber"
						element={
							<Layout>
								<AddOnsPage />
							</Layout>
						}
					/>
					<Route
						path="/summary/step/:stepNumber"
						element={
							<Layout>
								<SummaryPage />
							</Layout>
						}
					/>
					<Route
						path="/thankyou"
						element={
							<Layout>
								<ThankYouPage />
							</Layout>
						}
					/>
				</Routes>
			</Router>
		</StepperProvider>
	);
}

export default App;
