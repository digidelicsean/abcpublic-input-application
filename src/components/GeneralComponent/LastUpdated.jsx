import { ConfigProvider, Input } from "antd";
import { Spacer } from "../";
import mainStyle from "./LastUpdated.module.css";
// Define a theme object for styling components
const theme = {
	components: {
		Input: {
			colorBgContainerDisabled: "white",
			colorTextDisabled: "black",
		},
	},
};

// Define a functional component called LastUpdated that takes several props
const LastUpdated = ({
	hour,
	min,
	sec,
	style,
	inputStyle,
	inputClassName,
	className,
	labelStyle,
	labelClassName,
}) => {
	// Convert hour, min, and sec to strings and pad them with leading zeros if necessary
	const hourStr = (hour || 0).toString().padStart(2, "0");
	const minStr = (min || 0).toString().padStart(2, "0");
	const secStr = (sec || 0).toString().padStart(2, "0");
	const timeStr = `${hourStr}:${minStr}:${secStr}`;

	// Render a div container with the specified className and style
	return (
		<div className={`${mainStyle.container} ${className}`} style={style}>
			{/* Render a span element with the specified labelClassName and labelStyle */}
			<span className={`${labelClassName}`} style={labelStyle}>
				更新日時
			</span>
			{/* Render a Spacer component */}
			<Spacer />
			{/* Render an Input component */}
			<ConfigProvider theme={theme}>
				<Input
					// Add the specified inputClassName to the className prop
					className={`${mainStyle.input} ${inputClassName}`}
					// Disable the input field
					disabled
					// Set the value of the input field to timeStr or a default value
					value={timeStr ?? "hh:mm:ss"}
					// Set the style of the input field
					style={inputStyle}
				/>
			</ConfigProvider>
		</div>
	);
};

export default LastUpdated;
