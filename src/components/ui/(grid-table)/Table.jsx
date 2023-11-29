import React from 'react'

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
        <table>
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
        const { type, label, colSpan, color, textColor, textAlign, style, fontSize } = value;

        if (type != Table.Header.Type.Label) {
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={{ fontSize, color: textColor ?? "black", textAlign: textAlign ?? "left", backgroundColor: color ?? "gray", ...style }}>
                    {label}
                </th>
            );
        } else {
            headers.push(
                <th key={index} type={type} colSpan={colSpan} style={{ fontSize, color: textColor ?? "black", textAlign: textAlign ?? "center", backgroundColor: color, ...style }}>
                    {label}
                </th>
            )
        }

    })

    return headers;

}

Table.Header.Type = { Default: 'default', Label: 'label' };

Table.Row = function Row({ rowName, numColumns, width, labelStyle, inputStyle }) {
    return (
        <tr>
            <td style={labelStyle}>{rowName}</td>
            {Array(numColumns).fill().map((_, index) => (
                <td key={index}>
                    <input type="text" style={{ width: width, ...inputStyle}} />
                </td>
            ))}
        </tr>
    );
}

export default Table