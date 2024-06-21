interface InvoiceSumRowProps {
    columnsNumber: number,
    netPrice: number,
    brutPrice: number
}

function InvoiceSumRow(props: InvoiceSumRowProps) {
    const emptyColumns = Array(props.columnsNumber - 3).fill(null);

    return (
        <tr>
            {emptyColumns.map((_, index) => (
                <td key={index}></td>
            ))}
            <td>Suma</td>
            <td>{props.netPrice}</td>
            <td>{props.brutPrice}</td>
        </tr>
    )
}

export default InvoiceSumRow;