import React, { useState, useEffect } from "react";
import styles from "styles/EditContainerModal.module.css"; // Создайте соответствующий CSS модуль
import axios from "axios";
import API_URL from "constants/constants";

const EditContainerModal = ({ isOpen, onClose, container, onUpdate }) => {
    const [formData, setFormData] = useState({
        container_id: "",
        name: "",
        formula: "",
        mass: "",
        volume: "",
        density: "",
        location: "",
        precursor: false,
        qualification: "",
    });
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        if (container) {
            setFormData({
                container_id: container.container_id || "",
                name: container.name || "",
                formula: container.formula || "",
                mass: container.mass || "",
                volume: container.density ? (container.mass / container.density).toFixed(3) : "",
                density: container.density || "",
                location: container.location || "",
                precursor: container.precursor || false,
                qualification: container.qualification || "",
            });
        }
    }, [container]);

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
            const response = await axios.put(`${API_URL}data/containers/${container.container_id}/`, {
                name: formData.name,
                formula: formData.formula,
                mass: parseFloat(formData.mass),
                density: formData.density !== "" ? parseFloat(formData.density) : null,
                location: formData.location,
                precursor: formData.precursor,
                qualification: formData.qualification,
            });

            // Обновление контейнера в родительском компоненте
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error("Ошибка при обновлении контейнера:", error);
            if (error.response && error.response.data) {
                const data = error.response.data;
                const errorMessages = Object.values(data).flat();
                setErrors(errorMessages);
            } else {
                setErrors(["Неизвестная ошибка. Пожалуйста, попробуйте позже."]);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadBarcode = async () => {
        if (!container) return;

        setIsDownloading(true);
        setDownloadError(null);

        try {
            const containerId = container.container_id;
            const downloadUrl = `${API_URL}data/generate-pdf/${containerId}/`;
            window.open(downloadUrl, "_blank");
        } catch (error) {
            console.error("Ошибка при загрузке штрихкода:", error);
            if (error.response && error.response.data) {
                setDownloadError("Не удалось загрузить штрихкод. Пожалуйста, попробуйте позже.");
            } else {
                setDownloadError("Произошла ошибка при загрузке штрихкода.");
            }
        } finally {
            setIsDownloading(false);
        }
    };

    const deleteContainer = async () => {
        if (!container) return;

        const confirmDelete = window.confirm(
            "Вы уверены, что хотите удалить этот контейнер? Это действие нельзя отменить."
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await axios.delete(`${API_URL}data/containers/${container.container_id}/`);

            // Удаление контейнера в родительском компоненте
            onUpdate(null, container.id);
            onClose();
        } catch (error) {
            console.error("Ошибка при удалении контейнера:", error);
            if (error.response && error.response.data) {
                setDeleteError("Не удалось удалить контейнер. Пожалуйста, попробуйте позже.");
            } else {
                setDeleteError("Произошла ошибка при удалении контейнера.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen || !container) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <h2>Редактирование контейнера</h2>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="container_id">ID Контейнера</label>
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
                        <div className={styles.formGroup}>
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

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="volume">Объем, мл</label>
                            <input
                                type="number"
                                id="volume"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className={styles.formGroup}>
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

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="qualification">Квалификация *</label>
                            <input
                                type="text"
                                id="qualification"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                required
                                minLength="1"
                                maxLength="512"
                            />
                        </div>
                        <div className={styles.formGroupCheckbox}>
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

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
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
                        <div className={styles.errorMessage}>
                            <ul>
                                {errors.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {downloadError && (
                        <div className={styles.errorMessage}>
                            <p>{downloadError}</p>
                        </div>
                    )}

                    {deleteError && (
                        <div className={styles.errorMessage}>
                            <p>{deleteError}</p>
                        </div>
                    )}

                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            className={styles.downloadButton}
                            onClick={downloadBarcode}
                            disabled={isDownloading}
                        >
                            {isDownloading ? "Загрузка..." : "Скачать штрихкод"}
                        </button>
                        <div className={styles.rightButtons}>
                            <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={deleteContainer}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Удаление..." : "Удалить"}
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={onClose}
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Сохранение..." : "Сохранить"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContainerModal;