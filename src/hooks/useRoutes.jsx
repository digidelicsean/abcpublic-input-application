    import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { MainMenuPage, MatchSettingsPage, TeamPlayerSelectionPage, TeamSelectPage, InfoScreenPage, DataStadiumPage, OtherGameInfoPage } from "../pages";

export const useRouter = () => {
    const RoutesComponent = () => {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainMenuPage />} />
                    <Route path="/:page" element={<MainMenuPage />} />
                    <Route path="/pro/match-settings" element={<MatchSettingsPage />} />
                    <Route path="/pro/player-profile" element={<TeamPlayerSelectionPage />} />
                    <Route path="/pro/data-stadium" element={<DataStadiumPage />} />
                    <Route path="/pro/info-screen" element={<InfoScreenPage />} />
                    <Route path="/pro/other-game-info" element={<OtherGameInfoPage />} />
                </Routes>
            </Router>
        )
    }

    return { RoutesComponent }
}