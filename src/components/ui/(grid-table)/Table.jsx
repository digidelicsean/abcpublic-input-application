import React from 'react'
import { Input } from "antd"
const Table = ({ children, headerStyle, bodyStyle}) => {
    // Create an empty object to store header cells
    const headerCellMap = {}
    // Create an empty array to store rows
    const rows = []

    // Iterate over the children of the Table component
    React.Children.map(children, (child) => {
        // If the child is a Table.Header component
        if (child.type === Table.Header) {
            // Get the headers from the Table.Header component
            const headers = child.type(child.props)

            // Iterate over the headers
            headers.forEach((header) => {
                // If the header type doesn't exist in the headerCellMap object, create an empty array for it
                if (!headerCellMap[header.props.type]) {
                    headerCellMap[header.props.type] = [];
                }
                // Push the header into the corresponding array in the headerCellMap object
                headerCellMap[header.props.type].push(header);
            })
        } else {
            // If the child is not a Table.Header component, push it into the rows array
            rows.push(child);
        }
    });

    // Render the table with the header cells and rows
    return (
        <table style={{
            borderCollapse: "separate"
        }}>
            <thead style={{...headerStyle}}>
                <tr>
                    <th></th>
                    {headerCellMap[Table.Header.Type.Default]}
                </tr>
                <tr>
                    <th></th>
                    {headerCellMap[Table.Header.Type.Label]}
                </tr>
            </thead>
            <tbody style={{...bodyStyle}}>
                {rows}
            </tbody>
        </table>
    );
}
Table.Header = function Header({ headerProps }) {

    const headers = [] // Array to store the header elements

    // If headerProps is null or undefined, return an empty fragment
    if (headerProps == null || headerProps == undefined) return <></>

    // Loop through each value in headerProps
    Object.values(headerProps).forEach((value, index) => {
        const { type, label, colSpan, color, textColor, textAlign, style, labelStyle, fontSize, gapSize } = value;

        // Create the header style object
        const headerStyle = {
            paddingRight: `${gapSize}px`,
            textAlign: textAlign ?? "left",
            ...style,
        };

        // Create the text container style object
        const textContainerStyle = {
            color: textColor ?? "black",
            fontSize,
            textAlign: textAlign ?? "left",
            backgroundColor: color,
            ...labelStyle
        };

        // Check the type of the header
        if (type != Table.Header.Type.Label) {
            // If the type is not "label", create a th element with the specified attributes
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={headerStyle}>
                    <div style={textContainerStyle}>{label}</div>
                </th>
            );
        } else {
            // If the type is "label", create a th element with the specified attributes and label
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={{...headerStyle, ...textContainerStyle}}>
                    {label}
                </th>
            )
        }

    })

    return headers; // Return the array of header elements

}

// Define the types of headers
Table.Header.Type = { Default: 'default', Label: 'label' };
Table.Row = function Row({ rowName, numColumns, width, rowStyle, labelStyle, inputStyle, gapIndices, gapSize, useText, cellValues, textAlign }) {
    // Create a table row with the provided rowStyle
    return (
        <tr style={{...rowStyle}}>
            {/* Create a table cell with the provided labelStyle and display the rowName value */}
            <td style={labelStyle}>{rowName}</td>
            
            {/* Create an array with numColumns length and map over it */}
            {Array(numColumns).fill().map((_, index) => {
                // Check if gapIndices includes the current index and create a gapStyle object with paddingRight if true, otherwise an empty object
                const gapStyle = gapIndices?.includes(index) ? { paddingRight: `${gapSize}px` } : {};
                
                // Check if width is an array and set columnWidth to the value at the current index, otherwise set it to the width value
                const columnWidth = Array.isArray(width) ? width[index] : width;

                // Create a table cell with the gapStyle, alignSelf, and height styles
                return (
                    <td key={index} style={{...gapStyle, alignSelf: "center", height: "30px"}}>
                        {/* Check if useText is true */}
                        {useText ? (
                            // Create a span element with the provided styles and display the value at the current index in cellValues, or an empty string if it's undefined
                            <span style={{ textAlign, display: "inline-block", width: columnWidth, ...inputStyle }}>{cellValues[index] ?? ""}</span>
                        ) : (
                            // Create an Input component with the provided styles and set the value to the value at the current index in cellValues, or an empty string if cellValues is undefined
                            <Input type="text" style={{ textAlign, width: columnWidth, ...inputStyle }} value={cellValues ? cellValues[index] : ""} />
                        )}
                    </td>
                );
            })}
        </tr>
    );
}
export default Table