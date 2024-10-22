import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import "./NumberStats.scss";
export default function NumberStats({ homeData, totalMinutesByHabitant, }) {
    return (_jsx("div", { className: "number-stats-all", children: _jsx("div", { className: "number-stats", children: homeData.habitants.map((habitant, index) => (_jsxs("div", { className: "number-stats__icon-and-name", children: [_jsxs("div", { className: "number-stats__pair", children: [_jsx("div", { className: "number-stats__icon", children: _jsx(InitialIconByHabitant, { habitant: habitant }) }), _jsx("p", { className: "number-stats__name", children: habitant })] }), _jsx("div", { className: "number-stats__numbers", children: _jsxs("div", { className: "number-stats__number", children: ["Total time: ", Math.floor(totalMinutesByHabitant[habitant] / 60), "h", " ", totalMinutesByHabitant[habitant] % 60, "mins"] }) })] }, index))) }) }));
}
