import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddOnsPage from './pages/AddOnsPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import SelectPlanPage from './pages/SelectPlanPage';
import SummaryPage from './pages/SummaryPage';
import Layout from './components/Layout';
import StepperProvider from './Context/StepperContext';

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
						path="/selectplan/step/2"
						element={
							<Layout>
								<SelectPlanPage />
							</Layout>
						}
					/>
					<Route
						path="/add-ons/step/3"
						element={
							<Layout>
								<AddOnsPage />
							</Layout>
						}
					/>
					<Route
						path="/summary/step/4"
						element={
							<Layout>
								<SummaryPage />
							</Layout>
						}
					/>
				</Routes>
			</Router>
		</StepperProvider>
	);
}

export default App;
