// Import the necessary modules from react-router-dom
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// Import the necessary pages from the "../pages" directory
import { MainMenuPage, MatchSettingsPage, TeamPlayerSelectionPage, InfoScreenPage, DataStadiumPage, OtherGameInfoPage } from "../pages";

// Define a custom hook called "useRouter"
export const useRouter = () => {
    // Define a component called "RoutesComponent" which will render the routes
    const RoutesComponent = () => {
        return (
            // Use the HashRouter component from react-router-dom
            <Router>
                <Routes>
                    {/* Define a route for the home page */}
                    <Route exact path="/" element={<MainMenuPage />} />
                    {/* Define a route for any other page */}
                    <Route path="/:page" element={<MainMenuPage />} />
                    {/* Define a route for the "match-settings" page */}
                    <Route path="/pro/match-settings" element={<MatchSettingsPage />} />
                    {/* Define a route for the "player-profile" page */}
                    <Route path="/pro/player-profile" element={<TeamPlayerSelectionPage />} />
                    {/* Define a route for the "data-stadium" page */}
                    <Route path="/pro/data-stadium" element={<DataStadiumPage />} />
                    {/* Define a route for the "info-screen" page */}
                    <Route path="/pro/info-screen" element={<InfoScreenPage />} />
                    {/* Define a route for the "other-game-info" page */}
                    <Route path="/pro/other-game-info" element={<OtherGameInfoPage />} />
                </Routes>
            </Router>
        )
    }

    // Return the "RoutesComponent" from the custom hook
    return { RoutesComponent }
}