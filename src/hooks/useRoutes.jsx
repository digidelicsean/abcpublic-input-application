    import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { MainMenuPage, MatchSettingsPage, TeamSelectPage, InfoScreenPage, DataStadiumPage } from "../pages";

export const useRouter = () => {
    const RoutesComponent = () => {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainMenuPage />} />
                    <Route path="/match-settings" element={<MatchSettingsPage />} />
                    <Route path="/player-profile" element={<TeamSelectPage />} />
                    <Route path="/data-stadium" element={<DataStadiumPage />} />
                    <Route path="/info-screen" element={<InfoScreenPage />} />
                </Routes>
            </Router>
        )
    }

    return { RoutesComponent }
}