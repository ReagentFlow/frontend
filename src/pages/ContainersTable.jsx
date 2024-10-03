import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from 'constants/constants';
import 'styles/Table.css';
import 'styles/Modal.css';

function ContainersTable() {
    const [containers, setContainers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [formData, setFormData] = useState({
        container_id: "",
        name: "",
        formula: "",
        mass: "",
        volume: "",
        density: "",
        location: "",
        precursor: false,
        cas: "",
        qualification: "",
    });
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

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

    const openModal = (container) => {
        setSelectedContainer(container);
        setFormData({
            container_id: container.container_id,
            name: container.name,
            formula: container.formula,
            mass: container.mass,
            volume: container.volume,
            density: container.density || "",
            location: container.location,
            precursor: container.precursor,
            cas: container.cas || "",
            qualification: container.qualification,
        });
        setErrors([]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContainer(null);
        setFormData({
            container_id: "",
            name: "",
            formula: "",
            mass: "",
            volume: "",
            density: "",
            location: "",
            precursor: false,
            cas: "",
            qualification: "",
        });
        setErrors([]);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors([]);

        try {
            const response = await axios.put(`${API_URL}data/containers/${selectedContainer.container_id}/`, {
                container_id: parseInt(formData.container_id, 10),
                name: formData.name,
                formula: formData.formula,
                mass: parseFloat(formData.mass),
                volume: parseFloat(formData.volume),
                density: formData.density !== "" ? parseFloat(formData.density) : null,
                location: formData.location,
                precursor: formData.precursor,
                cas: formData.cas,
                qualification: parseInt(formData.qualification, 10),
            });

            // Обновление списка контейнеров
            setContainers((prevContainers) =>
                prevContainers.map((container) =>
                    container.id === selectedContainer.id ? response.data : container
                )
            );

            closeModal();
        } catch (error) {
            console.error('Error updating container:', error);
            if (error.response && error.response.data) {
                const data = error.response.data;
                const errorMessages = Object.values(data).flat();
                setErrors(errorMessages);
            } else {
                setErrors(['Неизвестная ошибка. Пожалуйста, попробуйте позже.']);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadBarcode = async () => {
        if (!selectedContainer) return;

        setIsDownloading(true);
        setDownloadError(null);

        try {
            const containerId = selectedContainer.container_id;
            const downloadUrl = `${API_URL}data/generate-pdf/${containerId}/`;
            window.open(downloadUrl, '_blank');
        } catch (error) {
            console.error('Error downloading barcode:', error);
            if (error.response && error.response.data) {
                setDownloadError('Не удалось загрузить штрихкод. Пожалуйста, попробуйте позже.');
            } else {
                setDownloadError('Произошла ошибка при загрузке штрихкода.');
            }
        } finally {
            setIsDownloading(false);
        }
    };

    const deleteContainer = async () => {
        if (!selectedContainer) return;

        const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот контейнер? Это действие нельзя отменить.');

        if (!confirmDelete) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await axios.delete(`${API_URL}data/containers/${selectedContainer.container_id}/`);

            // Удаление контейнера из списка
            setContainers((prevContainers) =>
                prevContainers.filter((container) => container.id !== selectedContainer.id)
            );

            closeModal();
        } catch (error) {
            console.error('Ошибка при удалении контейнера:', error);
            if (error.response && error.response.data) {
                setDeleteError('Не удалось удалить контейнер. Пожалуйста, попробуйте позже.');
            } else {
                setDeleteError('Произошла ошибка при удалении контейнера.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ID Контейнера</th>
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса, г</th>
                        <th>Объем, мл</th>
                        <th>Квалификация, %</th>
                        <th>Прекурсор</th>
                        <th>Местоположение</th>
                    </tr>
                </thead>
                <tbody>
                    {containers.map((container) => (
                        <tr key={container.id} onClick={() => openModal(container)} className="table-row">
                            <td>{container.id}</td>
                            <td>{container.container_id}</td>
                            <td>{container.name}</td>
                            <td>{container.formula}</td>
                            <td>{container.mass}</td>
                            <td>{container.volume}</td>
                            <td>{container.qualification}</td>
                            <td>{precursorMap[container.precursor]}</td>
                            <td>{container.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedContainer && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <h2>Редактирование контейнера</h2>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="container_id">ID Контейнера *</label>
                                    <input
                                        type="text"
                                        id="container_id"
                                        name="container_id"
                                        value={formData.container_id}
                                        onChange={handleChange}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Наименование *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        minLength="1"
                                        maxLength="100"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="formula">Формула *</label>
                                    <input
                                        type="text"
                                        id="formula"
                                        name="formula"
                                        value={formData.formula}
                                        onChange={handleChange}
                                        required
                                        minLength="1"
                                        maxLength="100"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mass">Масса, г *</label>
                                    <input
                                        type="number"
                                        id="mass"
                                        name="mass"
                                        value={formData.mass}
                                        onChange={handleChange}
                                        required
                                        step="any"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="volume">Объем, мл *</label>
                                    <input
                                        type="number"
                                        id="volume"
                                        name="volume"
                                        value={formData.volume}
                                        onChange={handleChange}
                                        required
                                        step="any"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="density">Плотность, г/см³</label>
                                    <input
                                        type="number"
                                        id="density"
                                        name="density"
                                        value={formData.density}
                                        onChange={handleChange}
                                        step="any"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="qualification">Квалификация, % *</label>
                                    <input
                                        type="number"
                                        id="qualification"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="precursor">Прекурсор *</label>
                                    <input
                                        type="checkbox"
                                        id="precursor"
                                        name="precursor"
                                        checked={formData.precursor}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cas">CAS</label>
                                    <input
                                        type="text"
                                        id="cas"
                                        name="cas"
                                        value={formData.cas}
                                        onChange={handleChange}
                                        minLength="1"
                                        maxLength="100"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Местоположение *</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        minLength="1"
                                        maxLength="100"
                                    />
                                </div>
                            </div>

                            {errors.length > 0 && (
                                <div className="error-message">
                                    <ul>
                                        {errors.map((err, index) => (
                                            <li key={index}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {downloadError && (
                                <div className="error-message">
                                    <p>{downloadError}</p>
                                </div>
                            )}

                            {deleteError && (
                                <div className="error-message">
                                    <p>{deleteError}</p>
                                </div>
                            )}

                            <div className="button-group">
                                <button
                                    type="button"
                                    className="download-button"
                                    onClick={downloadBarcode}
                                    disabled={isDownloading}
                                >
                                    {isDownloading ? "Загрузка..." : "Скачать штрихкод"}
                                </button>
                                <div className="right-buttons">
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={deleteContainer}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Удаление..." : "Удалить"}
                                    </button>
                                    <button type="button" className="cancel-button" onClick={closeModal}>
                                        Отмена
                                    </button>
                                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                                        {isSubmitting ? "Сохранение..." : "Сохранить"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContainersTable;