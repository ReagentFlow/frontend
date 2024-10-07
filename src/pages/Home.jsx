import React, { useState, useEffect } from "react";
import styles from "styles/Home.module.css";
import axios from "axios";
import API_URL from "constants/constants";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        formula: "",
        mass: "",
        density: "",
        location: "",
        precursor: false,
        qualification: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: "",
            formula: "",
            mass: "",
            density: "",
            location: "",
            precursor: false,
            qualification: "",
        });
        setError(null);
        setSuccessMessage(null);
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
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(`${API_URL}data/containers/`, {
                name: formData.name,
                formula: formData.formula,
                mass: parseFloat(formData.mass),
                density: parseFloat(formData.density),
                location: formData.location,
                precursor: formData.precursor,
                qualification: formData.qualification,
            });

            console.log("Контейнер создан:", response.data);
            setSuccessMessage("Контейнер успешно создан!");

            // Открытие штрих кода в новом окне
            const containerId = response.data.container_id;
            const downloadUrl = `${API_URL}data/generate-pdf/${containerId}/`;
            window.open(downloadUrl, '_blank');

            closeModal();
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError(`Ошибка: ${err.response.data.detail || err.response.statusText}`);
            } else if (err.request) {
                setError("Не удалось подключиться к серверу. Проверьте ваше интернет-соединение.");
            } else {
                setError("Произошла ошибка. Пожалуйста, попробуйте снова.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.homePage}>
            {/* <div className={styles.newContainerSection}>
                <h3>Функции</h3>
                <button className={styles.addButton} onClick={openModal}>
                    Добавить контейнер
                </button>
            </div> */}

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <h2>Новый контейнер</h2>
                        <form className={styles.modalForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
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
                            <div className={styles.inputGroup}>
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
                            <div className={styles.inputGroup}>
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
                            <div className={styles.inputGroup}>
                                <label htmlFor="density">Плотность, г/см3 *</label>
                                <input
                                    type="number"
                                    id="density"
                                    name="density"
                                    value={formData.density}
                                    onChange={handleChange}
                                    required
                                    step="any"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="location">Местоположение *</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    minLength="1"
                                    maxLength="100"
                                />
                            </div>
                            <div className={styles.inputGroupCheckbox}>
                                <label htmlFor="precursor">Прекурсор *</label>
                                <input
                                    type="checkbox"
                                    id="precursor"
                                    name="precursor"
                                    checked={formData.precursor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="qualification">Квалификация  *</label>
                                <input
                                    type="text"
                                    id="qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    minLength="1"
                                    maxLength="512"
                                />
                            </div>
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                    Отмена
                                </button>
                                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                    {isSubmitting ? "Создание..." : "Создать"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </div>
    );
}

export default Home;
