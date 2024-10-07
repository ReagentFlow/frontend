import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from 'constants/constants';
import 'styles/Table.css';
import AddContainerModal from 'components/AddContainerModal';
import EditContainerModal from 'components/EditContainerModal';

function ContainersTable() {
    const [containers, setContainers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchContainersData();
    }, []);

    const fetchContainersData = async () => {
        try {
            const response = await axios.get(`${API_URL}data/containers/`);
            setContainers(response.data);
        } catch (error) {
            console.error('Error fetching containers data:', error);
        }
    };

    const precursorMap = {
        true: 'Да',
        false: 'Нет'
    };

    const openEditModal = (container) => {
        setSelectedContainer(container);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedContainer(null);
        setIsEditModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddSuccess = (newContainer) => {
        setContainers(prevContainers => [...prevContainers, newContainer]);
    };

    const handleEditSuccess = (updatedContainer) => {
        setContainers(prevContainers =>
            prevContainers.map((container) =>
                container.id === updatedContainer.id ? updatedContainer : container
            )
        );
    };

    const handleDelete = (deletedContainerId) => {
        setContainers(prevContainers =>
            prevContainers.filter((container) => container.id !== deletedContainerId)
        );
    };

    const filteredContainers = containers.filter(container =>
        container.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <div className="header-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <div className="add-button-container">
                    <button className="addButton" onClick={() => setIsAddModalOpen(true)}>
                        Добавить контейнер
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ID Контейнера</th>
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса, г</th>
                        <th>Объем, мл</th>
                        <th>Квалификация</th>
                        <th>Прекурсор</th>
                        <th>Местоположение</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContainers.map((container) => (
                        <tr key={container.id} onClick={() => openEditModal(container)} className="table-row">
                            <td>{container.id}</td>
                            <td>{container.container_id}</td>
                            <td>{container.name}</td>
                            <td>{container.formula}</td>
                            <td>{container.mass}</td>
                            <td>{container.density ? (container.mass / container.density).toFixed(3) : "-"}</td>
                            <td>{container.qualification}</td>
                            <td>{precursorMap[container.precursor]}</td>
                            <td>{container.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Модальное окно для добавления контейнера */}
            <AddContainerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
            />

            {/* Модальное окно для редактирования контейнера */}
            <EditContainerModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                container={selectedContainer}
                onUpdate={(updatedContainer, deletedContainerId) => {
                    if (updatedContainer) {
                        handleEditSuccess(updatedContainer);
                    }
                    if (deletedContainerId) {
                        handleDelete(deletedContainerId);
                    }
                }}
            />
        </div>
    );
}

export default ContainersTable;