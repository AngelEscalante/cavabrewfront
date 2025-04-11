import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useMemo } from 'react';
import { Pencil, Trash, TypeOutline, X } from "lucide-react";
import styled from 'styled-components';
import {Button} from 'react-bootstrap';


const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Buscar"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<Button variant="outline-primary" size="sm" onClick={onClear}>
			<X/>
		</Button>
	</>
);
const editar=({id})=>{console.log('editando')}
const eliminar=({id})=>{console.log('eliminando')}

const DataTableList = ({columns,data,empresa}) => {
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    console.log(data);
    console.log(columns);
	const filteredItems = data.filter(
		item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle])
    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
            pagination 
            paginationComponentOptions={paginationComponentOptions}
        />
    );
};

export default DataTableList;
