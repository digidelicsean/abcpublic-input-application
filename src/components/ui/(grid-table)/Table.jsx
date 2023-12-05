import React from 'react'
import { Input } from "antd"

const Table = ({ children, headerStyle, bodyStyle}) => {
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

    const headers = []


    if (headerProps == null || headerProps == undefined) return <></>

    Object.values(headerProps).forEach((value, index) => {
        const { type, label, colSpan, color, textColor, textAlign, style, labelStyle, fontSize, gapSize } = value;

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
            ...labelStyle
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

Table.Row = function Row({ rowName, numColumns, width, rowStyle, labelStyle, inputStyle, gapIndices, gapSize, useText, cellValues }) {
    return (
        <tr style={{...rowStyle}}>
            <td style={labelStyle}>{rowName}</td>
            {Array(numColumns).fill().map((_, index) => {
                const gapStyle = gapIndices?.includes(index) ? { paddingRight: `${gapSize}px` } : {};
                const columnWidth = Array.isArray(width) ? width[index] : width;
                return (
                    <td key={index} style={{...gapStyle, alignSelf: "center", height: "30px"}}>
                        {useText ? (
                            <span style={{ padding: `0px ${columnWidth/2}px 0px ${columnWidth/2}px`, width: columnWidth, ...inputStyle }}>{cellValues[index] ?? ""}</span>
                        ) : (
                            <Input type="text" style={{ width: columnWidth, ...inputStyle }} value={cellValues ? cellValues[index] : ""} />
                        )}
                    </td>
                );
            })}
        </tr>
    );
}

export default Table