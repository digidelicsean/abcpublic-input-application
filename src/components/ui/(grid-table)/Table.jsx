import React from 'react'
import { Input } from "antd"

const Table = ({ children }) => {
    const headerCellMap = {}
    const rows = []

    React.Children.map(children, (child) => {
        if (child.type === Table.Header) {
            const headers = child.type(child.props)

            headers.forEach((header) => {
                if (!headerCellMap[header.props.type]) {
                    headerCellMap[header.props.type] = [];
                }
                headerCellMap[header.props.type].push(header);
            })
        } else {
            rows.push(child);
        }
    });

    console.log(headerCellMap)

    return (
        <table style={{
            borderCollapse: "separate"
        }}>
            <thead>
                <tr>
                    <th></th>
                    {headerCellMap[Table.Header.Type.Default]}
                </tr>
                <tr>
                    <th></th>
                    {headerCellMap[Table.Header.Type.Label]}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

Table.Header = function Header({ headerProps }) {

    const headers = []


    if (headerProps == null || headerProps == undefined) return <></>

    Object.values(headerProps).forEach((value, index) => {
        const { type, label, colSpan, color, textColor, textAlign, style, fontSize, gapSize } = value;

        const headerStyle = {
            paddingRight: `${gapSize}px`,
            textAlign: textAlign ?? "left",
            ...style,
        };
        const textContainerStyle = {
            // padding: "3px",
            color: textColor ?? "black",
            fontSize,
            textAlign: textAlign ?? "left",
            backgroundColor: color,
        };

        if (type != Table.Header.Type.Label) {
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={headerStyle}>
                    <div style={textContainerStyle}>{label}</div>
                </th>
            );
        } else {
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={{...headerStyle, ...textContainerStyle}}>
                    {label}
                    {/* <div style={textContainerStyle}>{label}</div> */}
                </th>
            )
        }

    })

    return headers;

}

Table.Header.Type = { Default: 'default', Label: 'label' };

Table.Row = function Row({ rowName, numColumns, width, labelStyle, inputStyle, gapIndices, gapSize }) {
    return (
        <tr>
            <td style={labelStyle}>{rowName}</td>
            {Array(numColumns).fill().map((_, index) => {
                const gapStyle = gapIndices?.includes(index) ? { paddingRight: `${gapSize}px` } : {};
                return (
                    <td key={index} style={{...gapStyle, alignSelf: "center"}}>
                        <Input type="text" style={{ width: width, ...inputStyle }} />
                    </td>
                );
            })}
        </tr>
    );
}

export default Table