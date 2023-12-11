    import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { MainMenuPage, MatchSettingsPage, TeamPlayerSelectionPage, TeamSelectPage, InfoScreenPage, DataStadiumPage, OtherGameInfoPage } from "../pages";

export const useRouter = () => {
    const RoutesComponent = () => {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainMenuPage />} />
                    <Route path="/match-settings" element={<MatchSettingsPage />} />
                    <Route path="/player-profile" element={<TeamPlayerSelectionPage />} />
                    <Route path="/data-stadium" element={<DataStadiumPage />} />
                    <Route path="/info-screen" element={<InfoScreenPage />} />
                    <Route path="/other-game-info" element={<OtherGameInfoPage />} />
                </Routes>
            </Router>
        )
    }

    return { RoutesComponent }
}