import React, { useState, useEffect } from 'react';
import '../styles/ReagentsTable.css';

const sampleData = [
    { id: 1, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 1 шкаф 2' },
    { id: 2, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 4 шкаф 2' },
    { id: 3, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 9 шкаф 3' },
    { id: 4, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 3 шкаф 5' },
    { id: 5, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 2 шкаф 1' },
    { id: 6, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 1 шкаф 5' },
    { id: 7, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 4 шкаф 3' },
    { id: 8, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 4 шкаф 2' },
    { id: 9, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 5 шкаф 2' },
    { id: 10, name: 'хлористый кальций', mass: '10г', volume: '10мл', expiry: 'осталось 10 дней', location: 'лаборатория 3 шкаф 2' },
];

function ReagentsTable() {
    const [reagents, setReagents] = useState([]);

    useEffect(() => {
        setReagents(sampleData);
    }, []);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название реагента</th>
                        <th>Масса</th>
                        <th>Объем</th>
                        <th>Срок годности</th>
                        <th>Местоположение</th>
                    </tr>
                </thead>
                <tbody>
                    {reagents.map((reagent) => (
                        <tr key={reagent.id}>
                            <td>{reagent.id}</td>
                            <td>{reagent.name}</td>
                            <td>{reagent.mass}</td>
                            <td>{reagent.volume}</td>
                            <td>{reagent.expiry}</td>
                            <td>{reagent.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;
