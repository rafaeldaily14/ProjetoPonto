import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import React, { useState } from 'react';


const axios = require('axios');

export default function TabelaMembros(props) {

    const [membroSelecionado, setMembroSelecionado] = useState(0)
    const [membroSelecionaItem, setMembroSelecionaItem] = useState({})


    const columns = [{
        dataField: 'membroid',
        text: 'ID'
    },
    {
        dataField: 'nome',
        text: 'Nome',
        filter: textFilter(
            {
                onFilter: filterVal => console.log(`Filter Value: ${filterVal}`)
            }
        )
    },
    {
        dataField: 'cargo',
        text: 'Cargo',
    },
    {
        dataField: 'diasemana',
        text: 'Dia da Semana',
    },
    {
        dataField: 'entrada',
        text: 'Entrada',
    },
    {
        dataField: 'saida',
        text: 'Saida',
    }

    ];

    const carregaCampos = (membroid, nome, cargo,
        diaSemana,entrada,saida) => {
        props.carregaCampos(membroid, nome, cargo,
            diaSemana, entrada,saida)
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                console.log(row.membroid);
                console.log(e);
                carregaCampos(row.membroid, row.nome, row.cargo,
                    row.diaSemana,row.entrada,row.saida)
            }
            else {
                carregaCampos(0, "", "", "","","")
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            console.log(rows);
        }
    };

    function afterFilter(newResult, newFilters) {
        console.log(newResult);
        console.log(newFilters);
    }


    return (
        <div>
            <div>
                <BootstrapTable
                    keyField='membroid'
                    data={props.membros}
                    columns={columns}
                    selectRow={selectRow}
                    filter={filterFactory({ afterFilter })}
                    filterPosition="top"
                    noDataIndication="Sem membros cadastrados"
                />
            </div>
            <div>
                <table>
                    <tr>
                    </tr>
                </table>
            </div>
        </div>
    )
}